const user = require('./user');
const ranking = require('./ranking');
const friend = require('./friend');

const root = `
    type Query
`;

module.exports = [root, user, ranking, friend];
