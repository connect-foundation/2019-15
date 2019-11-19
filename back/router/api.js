const express = require('express');
const graphqlHTTP = require('express-graphql');
const graphqlAuth = require('../middleware/graphqlAuth');
const models = require('../db/models');
const schema = require('../graphql/schema');

const router = express.Router();

router.use(
  '/',
  graphqlAuth,
  graphqlHTTP((req, res) => ({
    schema,
    graphiql: true,
    context: { user: req.user, ...models },
  })),
);

module.exports = router;
