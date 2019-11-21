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
  deleteFriendRequest: gql`
    mutation deleteFriendRequest($id: Int, $nickname: String) {
      deleteFriendRequest(id: $id, nickname: $nickname) {
        id
      }
    }
  `,
  acceptFriendRequest: gql`
    mutation acceptFriendRequest($id: Int, $nickname: String) {
      acceptFriendRequest(id: $id, nickname: $nickname) {
        nickname
      }
    }
  `,
  sendFriendRequest: gql`
    mutation sendFriendRequest($id: Int, $nickname: String) {
      sendFriendRequest(id: $id, nickname: $nickname) {
				id
      }
    }
  `
};

export default friendQuery;
