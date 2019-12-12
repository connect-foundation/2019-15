import gql from 'graphql-tag';

export const GET_FRIENDS = gql`
  query getFriends($first: Int = 10, $after: String) {
    friends(first: $first, after: $after) {
      pageInfo {
        endCursor
        hasNextPage
      }
      edges {
        node {
          id
          sFriend {
            id
            nickname
          }
        }
        cursor
      }
    }
  }
`;

export const DELETE_FRIEND = gql`
  mutation deleteFriend($nickname: String) {
    deleteFriend(nickname: $nickname) {
      nickname
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
