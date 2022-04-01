# bedrock-session-mongodb

A [bedrock][] module that enables [express][] session storage via [MongoDB][].

## Requirements

- npm v6+

## Quick Examples

```
npm install @bedrock/session-mongodb
```

Simply require the `bedrock-session-mongodb` module along with the
[bedrock-express][] module and then any [express][] session information will
be persisted via [MongoDB][].

```js
import * as bedrock from '@bedrock/core';

// modules
import '@bedrock/server';
import '@bedrock/express';
import '@bedrock/session-mongodb';

bedrock.events.on('bedrock-express.configure.routes', function(app) {
  app.get('/', function(req, res) {
    res.send('Hello World!');
  });
});

bedrock.start();
```

## Configuration

For documentation on configuration, see [config.js](./lib/config.js).


[bedrock]: https://github.com/digitalbazaar/bedrock
[bedrock-express]: https://github.com/digitalbazaar/bedrock-express
[express]: https://github.com/strongloop/express
[MongoDB]: https://www.mongodb.org/
