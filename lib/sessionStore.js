/*
 * Bedrock Session via MongoDB Module.
 *
 * This module provides session persistence via mongodb.
 *
 * Copyright (c) 2012-2015 Digital Bazaar, Inc. All rights reserved.
 */
var bedrock = require('bedrock');
require('bedrock-mongodb');
require('bedrock-express');

// load config defaults
require('./config');

bedrock.events.on('bedrock-express.configure.session', init);

function init(app, callback) {
  var MongoStore = require('connect-mongo')(app.express);
  var config = bedrock.config;
  var store = new MongoStore({
    db: config.mongodb.name,
    collection: config['session-mongodb'].collection,
    host: config.mongodb.host,
    port: config.mongodb.port,
    username: config.mongodb.username,
    password: config.mongodb.password,
    auto_reconnect: config.mongodb.connectOptions.auto_reconnect,
    clear_interval: config['session-mongodb'].clearInterval,
    defaultExpirationTime: config['session-mongodb'].defaultExpirationTime
  }, function() {
    bedrock.config.express.session.store = store;
    callback();
  });
}
