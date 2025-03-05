/*!
 * Copyright (c) 2020-2025 Digital Bazaar, Inc. All rights reserved.
 */
import {config} from '@bedrock/core';

describe('session-mongodb API', function() {
  let store;
  before(function() {
    store = config.express.session.store;
  });
  it('should create a session store', async function() {
    should.exist(store);
    store.should.be.an('object');
    should.exist(store.clientP);
    should.exist(store.collectionP);
  });
}); // end session-mongodb API
