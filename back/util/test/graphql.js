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

const getGqStrFromAttrs = (attrs) => {
  return attrs.reduce((acc, attr) => {
    if (typeof attr !== 'object') {
      return `${acc} ${attr}`;
    }
    if (!Object.keys(attr).length) return acc;
    const fk = Object.keys(attr)[0];
    const content = getGqStrFromAttrs(attr[fk]);
    return `${acc}\n${fk}{\n${content}\n}`;
  }, '');
};

const getGqCursorQuery = (queryType, resolverName, params = {}, attrs = []) => {
  const query = Object.entries(params).reduce(
    (acc, [key, val]) => {
      if (typeof val === 'string' && val.toLowerCase() === val) return `${acc} ${key}:"${val}"`;
      return `${acc} ${key}:${val}`;
    },
    `${queryType}{
     ${resolverName}(`,
  );
  return `${query}){
        pageInfo{
          endCursor
          hasNextPage
        }
        edges{
          node{
            ${getGqStrFromAttrs(attrs)}
          }
          cursor
        }
      }
  }`;
};

module.exports = {
  sendGqRequest,
  getGqCursorQuery,
  getGqStrFromAttrs,
};
