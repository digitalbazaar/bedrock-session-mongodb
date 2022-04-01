/*!
 * Copyright (c) 2020-2022 Digital Bazaar, Inc. All rights reserved.
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
    should.exist(store.state);
    store.state.should.be.a('string');
    store.state.should.equal('connected');
    should.exist(store.db);
    should.exist(store.client);
  });
}); // end session-mongodb API
