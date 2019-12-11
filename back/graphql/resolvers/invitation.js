const Sequelize = require('sequelize');

const { Op } = Sequelize;
const { getPageResult, getEdgesFromNodes } = require('../../util/graphql/cursor');

const invitationResolvers = {
  Query: {
    invitations: async (obj, { first, after }, { Invitations, Friends, Users, req }) => {
      const afterClause = after
        ? {
            where: {
              id: {
                [Op.gt]: after,
              },
            },
          }
        : {};
      const nodes = await Invitations.findAll({
        ...afterClause,
        include: [
          {
            model: Friends,
            include: [
              {
                model: Users,
                as: 'pFriend',
              },
              {
                model: Users,
                as: 'sFriend',
              },
            ],
            where: {
              sFriendId: req.user.id,
            },
          },
        ],
        order: [['id']],
        limit: first,
      });

      const edges = getEdgesFromNodes(nodes, (node) => node.id);
      return getPageResult(edges, first);
    },
  },
  Mutation: {
    deleteInvitation: (obj, { id }, { Invitations }) => {
      const result = Invitations.destroy({
        where: {
          id: id,
        },
      });
      return {
        id,
        result: !!result,
      };
    },
  },
};

module.exports = invitationResolvers;
