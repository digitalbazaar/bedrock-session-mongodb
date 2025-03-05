/*!
 * Copyright (c) 2012-2025 Digital Bazaar, Inc. All rights reserved.
 */
import {config, util} from '@bedrock/core';
import '@bedrock/express';

const cc = util.config.main.computer();

config['session-mongodb'] = {
  collection: 'session'
};

// create computed `ttl` property based on express config...

// default to 30 minute TTL expressed in seconds
const THIRTY_MINUTES = 60 * 30;

// timeout is in seconds (time for session to live on the server)
cc('session-mongodb.ttl', () => {
  if(config.express?.session) {
    // express session ttl is in milliseconds, convert to seconds
    const {ttl = THIRTY_MINUTES * 1000} = config.express.session;
    // round down to ensure session doesn't live beyond configured value
    return Math.floor(ttl / 1000);
  }
  return THIRTY_MINUTES;
});
