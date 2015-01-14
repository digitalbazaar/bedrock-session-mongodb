/*
 * Bedrock session mongodb module.
 *
 * This module provides session persistence via mongodb.
 *
 * Copyright (c) 2012-2015 Digital Bazaar, Inc. All rights reserved.
 */
var bedrock = require('bedrock');

bedrock.events.on('bedrock-express.configure.session', init);

function init(app, callback) {
  var MongoStore = require('connect-mongo')(app.express);
  var config = bedrock.config;
  var store = new MongoStore({
    db: config.database.name,
    collection: config.database.session.collection,
    host: config.database.host,
    port: config.database.port,
    username: config.database.username,
    password: config.database.password,
    auto_reconnect: config.database.connectOptions.auto_reconnect,
    clear_interval: config.database.session.clearInterval,
    defaultExpirationTime: config.database.session.defaultExpirationTime
  }, function() {
    bedrock.config.server.session.store = store;
    callback();
  });
}
