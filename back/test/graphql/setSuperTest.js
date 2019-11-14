const request = require('supertest');
const app = require('../../app');

const req = request(app);
const graphqlPath = '/api';

module.exports = {
  req,
  graphqlPath,
};
