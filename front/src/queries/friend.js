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
};

export default friendQuery;
