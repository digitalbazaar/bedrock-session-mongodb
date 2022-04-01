/*!
 * Copyright (c) 2012-2022 Digital Bazaar, Inc. All rights reserved.
 */
import * as bedrock from '@bedrock/core';
import * as brExpress from '@bedrock/express';
import * as database from '@bedrock/mongodb';
import connectMongo from 'connect-mongo';

// load config defaults
import './config.js';

const clientPromise = new Promise(function(resolve) {
  bedrock.events.on('bedrock-mongodb.ready', function() {
    resolve(database.client);
  });
});

let ready;

bedrock.events.on('bedrock-express.configure.session', function(app) {
  let MongoStore;
  if(brExpress.middleware && brExpress.middleware['express-session']) {
    // bedrock-express 0.2.x
    MongoStore = connectMongo(brExpress.middleware['express-session']);
  } else {
    // bedrock-express 0.1.x
    MongoStore = connectMongo(app.express);
  }
  const store = new MongoStore({
    clientPromise,
    collection: bedrock.config['session-mongodb'].collection,
    ttl: bedrock.config['session-mongodb'].ttl
  });
  bedrock.config.express.session.store = store;
  store.once('disconnected', disconnected);
  store.once('connected', function() {
    store.removeListener('disconnected', disconnected);
    if(typeof ready === 'function') {
      ready();
    }
    ready = true;
  });
  function disconnected() {
    const err = new Error('connect-mongo failed to connect to the database.');
    if(typeof ready === 'function') {
      ready(err);
    }
    ready = err;
  }
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
