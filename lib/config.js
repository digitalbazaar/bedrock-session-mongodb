/*
 * Bedrock Session via MongoDB Module Configuration
 *
 * Copyright (c) 2012-2015 Digital Bazaar, Inc. All rights reserved.
 */
var config = require('bedrock').config;

config['session-mongodb'] = {
  collection: 'session',
  // time in seconds to run db update to clear expired sessions
  clearInterval: 60 * 60,
  // 30 minute timeout on the server
  defaultExpirationTime: 1000 * 60 * 30
};
