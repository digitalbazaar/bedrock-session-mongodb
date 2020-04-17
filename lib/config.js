/*
 * Bedrock Session via MongoDB Module Configuration
 *
 * Copyright (c) 2012-2020 Digital Bazaar, Inc. All rights reserved.
 */
'use strict';

const {config} = require('bedrock');

config['session-mongodb'] = {
  collection: 'session',
  // timeout is in seconds (time for session to live on the server)
  ttl: 60 * 30
};
