/*
 * Bedrock Session via MongoDB Module Configuration
 *
 * Copyright (c) 2012-2015 Digital Bazaar, Inc. All rights reserved.
 */
var config = require('bedrock').config;

config['session-mongodb'] = {
  collection: 'session',
  // timeout is in seconds (time for session to live on the server)
  ttl: 60 * 30
};
