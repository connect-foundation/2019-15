module.exports = {
  Query: {
    users: (obj, args, { User }) => {
      return User.findAll();
    },
  },
};
