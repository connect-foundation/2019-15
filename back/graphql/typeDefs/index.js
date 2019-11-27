const user = require('./user');
const ranking = require('./ranking');
const friend = require('./friend');
const pageInfo = require('./pageInfo');
const word = require('./word');

const root = `
    type Query,
    type Mutation
`;

module.exports = [root, pageInfo, user, ranking, friend, word];
