import gql from 'graphql-tag';

export const findFriendsById = gql`
    mutation friends($id: Int) {
      friends(pFriendId: $id) {
        nickname
      }
    }
  `;

export const deleteFriend = gql`
    mutation deleteFriend($id: Int, $nickname: String) {
      deleteFriend(id: $id, nickname: $nickname) {
        id
      }
    }
  `;

export const findFriendRequests = gql`
    mutation findFriendRequest($id: Int) {
      findFriendRequests(sFriendId: $id) {
        nickname
      }
    }
  `;

export const deleteFriendRequest = gql`
    mutation deleteFriendRequest($id: Int, $nickname: String) {
      deleteFriendRequest(id: $id, nickname: $nickname) {
        id
      }
    }
  `;

export const acceptFriendRequest = gql`
    mutation acceptFriendRequest($id: Int, $nickname: String) {
      acceptFriendRequest(id: $id, nickname: $nickname) {
        nickname
      }
    }
  `;

export const sendFriendRequest = gql`
    mutation sendFriendRequest($id: Int, $nickname: String) {
      sendFriendRequest(id: $id, nickname: $nickname) {
				id
      }
    }
  `;