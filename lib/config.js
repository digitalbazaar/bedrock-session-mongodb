/*!
 * Copyright (c) 2012-2022 Digital Bazaar, Inc. All rights reserved.
 */
import {config} from 'bedrock';

config['session-mongodb'] = {
  collection: 'session',
  // timeout is in seconds (time for session to live on the server)
  ttl: 60 * 30
};
