const express = require('express');
const graphqlHTTP = require('express-graphql');
const models = require('../db/models');
const schema = require('../graphql/schema');

const router = express.Router();

router.use('/',
  graphqlHTTP({
    schema,
    graphiql: true,
    context: models,
  }));

module.exports = router;
