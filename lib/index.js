/*!
 * Copyright (c) 2012-2025 Digital Bazaar, Inc. All rights reserved.
 */
import * as bedrock from '@bedrock/core';
import * as database from '@bedrock/mongodb';
import MongoStore from 'connect-mongo';
import '@bedrock/express';

// load config defaults
import './config.js';

/* Note: The events related to database initialization and express app
configuration can occur in any order because they are unrelated to one
another. However, the `connect-mongo` module API does not allow for a clean
separation of database and collection initialization code from express session
store configuration.

It does provide a mechanism to pass a promise that will resolve to a properly
initialized database client, but that's where it draws its abstraction boundary, not at
which does not include properly initializing the necessary session collection
and indexes.

It is important to ensure both of these activities occur before allowing HTTP
clients to access the express app. Therefore, we create a mongodb client
promise *and* a ready promise (for when everything is actually ready) and
prevent exposure of the express app until the ready promise settles.

Notably, we cannot await any promise exposed by the connect-mongo APIs because
they can cause deadlock since the abstraction boundary doesn't cleanly
separate express session store configuration from asynchronous database
and collection initialization.
*/
const clientPromise = new Promise(resolve => {
  bedrock.events.on('bedrock-mongodb.ready', function() {
    resolve(database.client);
  });
});

let readyCtrl;
const readyPromise = new Promise((resolve, reject) => {
  readyCtrl = {resolve, reject};
});

bedrock.events.on('bedrock-express.configure.session', function() {
  const store = MongoStore.create({
    clientPromise,
    collectionName: bedrock.config['session-mongodb'].collection,
    ttl: bedrock.config['session-mongodb'].ttl
  });
  bedrock.config.express.session.store = store;

  Promise.resolve(store.collectionP)
    .then(readyCtrl.resolve)
    .catch(cause => {
      const err = new Error(
        'connect-mongo failed to connect to the database: ' + cause.message);
      err.cause = cause;
      readyCtrl.reject(err);
    });
});

bedrock.events.on('bedrock-server.https.listen', async () => {
  await readyPromise;
});
