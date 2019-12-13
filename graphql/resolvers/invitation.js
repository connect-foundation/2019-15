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
    invite: async (obj, { id, roomId }, { Invitations, Friends, req }) => {
      const Friend = await Friends.findOne({
        where: {
          [Op.and]: [{ pFriendId: req.user.id }, { sFriendId: id }],
        },
      });

      if (!Friend) throw new Error(`${req.user.id} and ${id} is not friend`);
      const {
        dataValues: { id: friendsId },
      } = Friend;

      const Invitation = await Invitations.create({
        friendsId,
        roomId,
      });

      if (!Invitation) throw new Error('create error');
      return Invitation.dataValues.id;
    },
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
