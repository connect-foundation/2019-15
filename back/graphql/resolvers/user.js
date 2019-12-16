const jwt = require('jsonwebtoken');
const Sequelize = require('sequelize');
const getCookieOptions = require('../../util/cookie/getCookieOption');

const { Op } = Sequelize;

const userResolvers = {
  Query: {
    users: (obj, args, { Users }) => {
      return Users.findAll();
    },
    checkNicknameAvailable: async (obj, { nickname }, { Users }) => {
      const user = await Users.findOne({
        where: {
          nickname,
        },
      });
      return {
        nickname,
        result: !user,
      };
    },
  },
  Mutation: {
    changeNickname: async (obj, { nickname }, { Users, Words, req, res, sequelize }) => {
      const user = await Users.findOne({
        where: {
          nickname,
        },
      });
      if (user) return { nickname, result: false };

      let transaction;
      try {
        transaction = await sequelize.transaction();
        await Words.update(
          {
            userId: req.user.id,
          },
          {
            where: {
              word: nickname,
            },
            transaction,
          },
        );
        const [changedRows] = await Users.update(
          { nickname },
          {
            where: {
              id: req.user.id,
            },
            transaction,
          },
        );
        if (!changedRows) {
          transaction.rollback();
          throw new Error('닉네임 변경에 실패하였습니다.');
        }

        res.cookie(
          'jwt',
          jwt.sign(
            {
              ...req.user,
              nickname,
            },
            process.env.JWT_SECRET,
          ),
          getCookieOptions(),
        );
        await transaction.commit();
        return { nickname, result: true };
      } catch (e) {
        if (transaction) await transaction.rollback();
        throw e;
      }
    },
    changeAvatar: async (obj, { nickname, avatar }, { Users, req, res }) => {
      const [changedRows] = await Users.update(
        { avatar },
        {
          where: {
            nickname: nickname,
          },
        },
      );
      if (!changedRows) return { avatar, result: false };

      res.cookie(
        'jwt',
        jwt.sign(
          {
            ...req.user,
            avatar,
          },
          process.env.JWT_SECRET,
        ),
        getCookieOptions(),
      );

      return { avatar, result: true };
    },
  },
};

module.exports = userResolvers;
