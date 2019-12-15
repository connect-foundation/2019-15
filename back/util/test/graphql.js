const request = require('supertest');
const { app } = require('../../app');

const sendGqRequest = (token, path, query) => {
  return request
    .agent(app)
    .set('Cookie', [`jwt=${token}`])
    .post(path)
    .send({
      query,
    });
};

module.exports = sendGqRequest;
