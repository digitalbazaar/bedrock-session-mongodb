var bedrock = require('bedrock');

// modules
require('bedrock-server');
require('bedrock-express');
require('../lib/sessionStore');

bedrock.events.on('bedrock-express.configure.routes', function(app) {
  app.get('/', function(req, res) {
    res.json({testData: 'bb03c2ba-fc43-48cb-aa6b-b22db70638b0'});
  });
});

bedrock.start();
