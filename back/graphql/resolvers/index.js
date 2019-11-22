const userResolvers = require('./user');
const rankingResolvers = require('./ranking');
const friendResolvers = require('./friend');

module.exports = [userResolvers, rankingResolvers, friendResolvers];
