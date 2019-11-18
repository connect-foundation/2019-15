const user = require('./user');
const ranking = require('./ranking');
const pageInfo = require('./pageInfo');

const root = `
    type Query
`;

module.exports = [root, pageInfo, user, ranking];
