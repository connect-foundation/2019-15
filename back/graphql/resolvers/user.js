module.exports = {
  Query: {
    users: (obj, args, { users }) => {
      return users.findAll();
    },
  },
};
