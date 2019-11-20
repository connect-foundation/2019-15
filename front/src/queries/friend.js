import gql from 'graphql-tag';

const friendQuery = {
  findFriendsById: gql`
    mutation friends($id: Int) {
      friends(pFriendId: $id) {
        nickname
      }
    }
  `,
  deleteFriend: gql`
    mutation deleteFriend($id: Int, $nickname: String) {
      deleteFriend(id: $id, nickname: $nickname) {
        id
      }
    }
  `,
  findFriendRequests: gql`
    mutation findFriendRequest($id: Int) {
      findFriendRequests(sFriendId: $id) {
        nickname
      }
    }
  `,
};

export default friendQuery;
