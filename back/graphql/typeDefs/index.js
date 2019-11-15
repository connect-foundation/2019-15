const user = require('./user');
const ranking = require('./ranking');

const root = `
    type Query
`;

module.exports = [root, user, ranking];
