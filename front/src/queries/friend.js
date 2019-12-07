import gql from 'graphql-tag';

export const findFriends = gql`
  mutation friends {
    friends {
      id
      nickname
    }
  }
`;

export const deleteFriend = gql`
  mutation deleteFriend($nickname: String) {
    deleteFriend(nickname: $nickname) {
      user {
        id
        nickname
      }
      result
    }
  }
`;

export const findFriendRequests = gql`
  mutation findFriendRequest {
    findFriendRequests {
      nickname
    }
  }
`;

export const deleteFriendRequest = gql`
  mutation deleteFriendRequest($nickname: String) {
    deleteFriendRequest(nickname: $nickname) {
      id
    }
  }
`;

export const acceptFriendRequest = gql`
  mutation acceptFriendRequest($nickname: String) {
    acceptFriendRequest(nickname: $nickname) {
      user {
        id
        nickname
      }
      result
    }
  }
`;

export const sendFriendRequest = gql`
  mutation sendFriendRequest($nickname: String) {
    sendFriendRequest(nickname: $nickname) {
      user {
        id
        nickname
      }
      result
    }
  }
`;
