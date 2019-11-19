module.exports = {
  Query: {
    users: (obj, args, { Users }) => {
      return Users.findAll();
    },
  },
};
