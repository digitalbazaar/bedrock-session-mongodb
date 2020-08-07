/*
 * Bedrock Session via MongoDB Module Configuration
 *
 * Copyright (c) 2012-2020 Digital Bazaar, Inc. All rights reserved.
 */
'use strict';

const {config, util} = require('bedrock');
const cc = util.config.main.computer();
config['session-mongodb'] = {
  collection: 'session',
};

// MongoStore ttl defaults to thirtyMinutes expressed in seconds.
const thirtyMinutes = 60 * 30;

// timeout is in seconds (time for session to live on the server)
cc('session-mongodb.ttl', () => {
  if(config.express && config.express.session) {
    // express session ttl is in milliseconds
    const {ttl = thirtyMinutes * 1000} = config.express.session;
    // round down to ensure session doesn't live beyond configured value
    return Math.floor(ttl / 1000);
  }
  return thirtyMinutes;
});
