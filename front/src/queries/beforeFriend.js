import gql from 'graphql-tag';

export const GET_FRIEND_REQUESTS = gql`
  query getFriendRequests($first: Int = 10, $after: String) {
    beforeFriends(first: $first, after: $after) {
      pageInfo {
        endCursor
        hasNextPage
      }
      edges {
        node {
          id
          pFriend {
            id
            nickname
          }
        }
      }
    }
  }
`;

export const DELETE_FRIEND_REQUEST = gql`
  mutation deleteFriendRequest($id: Int!) {
    deleteFriendRequest(id: $id) {
      id
    }
  }
`;

export const ACCEPT_FRIEND_REQUEST = gql`
  mutation acceptFriendRequest($id: Int!) {
    acceptFriendRequest(id: $id) {
      id
    }
  }
`;

export const SEND_FRIEND_REQUEST = gql`
  mutation sendFriendRequest($nickname: String!) {
    sendFriendRequest(nickname: $nickname) {
      id
      nickname
    }
  }
`;
