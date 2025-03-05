/*!
 * Copyright (c) 2012-2025 Digital Bazaar, Inc. All rights reserved.
 */
import * as bedrock from '@bedrock/core';
import * as database from '@bedrock/mongodb';
import MongoStore from 'connect-mongo';
import '@bedrock/express';

// load config defaults
import './config.js';

const clientPromise = new Promise(function(resolve) {
  bedrock.events.on('bedrock-mongodb.ready', function() {
    resolve(database.client);
  });
});

let ready;

bedrock.events.on('bedrock-express.configure.session', function() {
  const store = MongoStore.create({
    clientPromise,
    collectionName: bedrock.config['session-mongodb'].collection,
    ttl: bedrock.config['session-mongodb'].ttl
  });
  bedrock.config.express.session.store = store;

  Promise.resolve(store.collectionP)
    .then(() => {
      if(typeof ready === 'function') {
        ready();
      }
      ready = true;
    })
    .catch(cause => {
      const err = new Error(
        'connect-mongo failed to connect to the database: ' + cause.message);
      err.cause = cause;
      if(typeof ready === 'function') {
        ready(err);
      }
      ready = err;
    });
});

bedrock.events.on('bedrock-server.https.listen', async () => {
  // if store is already ready, return
  if(ready === true) {
    return;
  }
  if(ready instanceof Error) {
    throw ready;
  }
  // set `ready` to a callback function for when store is ready, delay
  // listening until it is active
  return new Promise((resolve, reject) => {
    ready = err => err ? reject(err) : resolve();
  });
});
