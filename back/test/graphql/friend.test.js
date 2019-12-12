const request = require('supertest');

const graphqlPath = require('../../config/graphqlPath');
const { app } = require('../../app');
const signJWT = require('../../util/jwt/signJWT');

const getFriendsQuery = (resolverName, { order, first, after }) => {
  let query = `{
     ${resolverName}(`;
  query = first ? `${query} first:${first}` : query;
  query = after ? `${query} after:"${after}"` : query;
  return `${query}){
        pageInfo{
          endCursor
          hasNextPage
        }
        edges{
          node{
            id
            sFriend{
              id
              nickname
            }
          }
          cursor
        }
      }
  }`;
};

let token;
beforeAll(async (done) => {
  token = await signJWT({ user: { id: 1111, displayName: '최형준' } });
  done();
});
describe('friend resolvers test', () => {
  it(`get friends' nicknames using given user's id by joining friends/users tables`, async (done) => {
    const res = await request
      .agent(app)
      .set('Cookie', [`jwt=${token}`])
      .post(graphqlPath)
      .send({
        query: getFriendsQuery('friends', { first: 10 }),
      })
      .expect(200);
    const friendsExpected = [
      {
        nickname: expect.any(String),
      },
    ];

    const desiredNode = {
      node: {
        id: expect.any(Number),
        sFriend: {
          id: expect.any(Number),
          nickname: expect.any(String),
        },
      },
      cursor: expect.any(String),
    };
    res.body.data.friends.edges.forEach((edge) => {
      expect(edge).toMatchObject(desiredNode);
    });

    done();
  });
});
