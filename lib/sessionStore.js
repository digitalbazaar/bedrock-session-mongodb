/*
 * Bedrock Session via MongoDB Module.
 *
 * This module provides session persistence via mongodb.
 *
 * Copyright (c) 2012-2015 Digital Bazaar, Inc. All rights reserved.
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

bedrock.events.on('bedrock-express.configure.session', init);

function init(app, callback) {
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
    callback();
  });
  function disconnected() {
    callback(new Error('connect-mongo failed to connect to the database.'));
  }
}
