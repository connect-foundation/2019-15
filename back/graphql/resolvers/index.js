const userResolvers = require('./user');
const rankingResolvers = require('./ranking');
const friendResolvers = require('./friend');
const wordResolvers = require('./word');
const invitationResolvers = require('./invitation');
const beforeFriendResolvers = require('./beforeFriend');
const videoResolvers = require('./video');

module.exports = [
  userResolvers,
  rankingResolvers,
  friendResolvers,
  wordResolvers,
  invitationResolvers,
  beforeFriendResolvers,
  videoResolvers,
];
