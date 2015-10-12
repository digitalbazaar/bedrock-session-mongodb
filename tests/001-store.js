/*
 * Copyright (c) 2015 Digital Bazaar, Inc. All rights reserved.
 */

'use strict';

var async = require('async');
var bedrock = require('bedrock');
var config = bedrock.config;
var request = require('request');
var database = require('bedrock-mongodb');
request = request.defaults({json: true});

var testService = config.server.baseUri;

process.env.NODE_TLS_REJECT_UNAUTHORIZED = 0;

describe('session-store', function() {

  it('should record a new session corresponding to a cookie', function(done) {
    request(
      {
        url: testService,
        method: 'GET'
      },
      function(err, res, body) {
        should.not.exist(err);
        should.exist(body);
        body.should.be.a('object');
        should.exist(body.testData);
        body.testData.should.equal('bb03c2ba-fc43-48cb-aa6b-b22db70638b0');
        var sidReg = /bedrock\.sid=s:(.*?)\./;
        var sid =
          decodeURIComponent(res.headers['set-cookie']).match(sidReg)[1];
        async.waterfall([
          function(callback) {
            database.openCollections(['session'], callback);
          },
          function(callback) {
            database.collections.session.find({_id: sid}).count(callback);
          },
          function(count, callback) {
            count.should.equal(1);
            var cursor = database.collections.session.find({_id: sid});
            cursor.each(function(err, doc) {
              if(doc !== null) {
                doc.should.be.an('object');
                should.exist(doc._id);
                doc._id.should.be.a('string');
                doc._id.should.equal(sid);
                should.exist(doc.session);
                doc.session.should.be.a('string');
                var session = JSON.parse(doc.session);
                should.exist(session.cookie);
                session.cookie.should.be.an('object');
                should.equal(session.cookie.originalMaxAge, null);
                should.equal(session.cookie.expires, null);
                should.exist(session.cookie.secure);
                should.exist(session.cookie.httpOnly);
                should.exist(session.cookie.path);
                should.exist(doc.expires);
              } else {
                callback();
              }
            });
          }
        ], function(err) {
          should.not.exist(err);
          done();
        });
      }
    );
  });
});
