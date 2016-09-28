/*
 * Bedrock Session via MongoDB Module.
 *
 * This module provides session persistence via mongodb.
 *
 * Copyright (c) 2012-2016 Digital Bazaar, Inc. All rights reserved.
 */
var bedrock = require('bedrock');
var connectMongo = require('connect-mongo');
var brExpress = require('bedrock-express');
var database = require('bedrock-mongodb');

// load config defaults
require('./config');

var dbPromise = new Promise(function(resolve) {
  bedrock.events.on('bedrock-mongodb.ready', function() {
    resolve(database.client);
  });
});

var ready;

bedrock.events.on('bedrock-express.configure.session', function(app) {
  var MongoStore;
  if(brExpress.middleware && brExpress.middleware['express-session']) {
    // bedrock-express 0.2.x
    MongoStore = connectMongo(brExpress.middleware['express-session']);
  } else {
    // bedrock-express 0.1.x
    MongoStore = connectMongo(app.express);
  }
  var store = new MongoStore({
    dbPromise: dbPromise,
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
    var err = new Error('connect-mongo failed to connect to the database.');
    if(typeof ready === 'function') {
      ready(err);
    }
    ready = err;
  }
});

bedrock.events.on('bedrock-express.ready', function(app, callback) {
  // if store is already ready, return
  if(ready === true) {
    return callback();
  }
  if(ready instanceof Error) {
    return callback(ready);
  }
  // store callback for when store is ready
  ready = callback;
});
