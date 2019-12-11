import gql from 'graphql-tag';

export const FIND_FRIENDS = gql`
  mutation friends {
    friends {
      id
      nickname
    }
  }
`;

export const DELETE_FRIEND = gql`
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

export const FIND_FRIEND_REQUESTS = gql`
  mutation findFriendRequest {
    findFriendRequests {
      nickname
    }
  }
`;

export const DELETE_FRIEND_REQUEST = gql`
  mutation deleteFriendRequest($nickname: String) {
    deleteFriendRequest(nickname: $nickname) {
      id
    }
  }
`;

export const ACCEPT_FRIEND_REQUEST = gql`
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

export const SEND_FRIEND_REQUEST = gql`
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
