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
  mutation deleteFriendRequest($id: Int!, $nickname: String!) {
    deleteFriendRequest(id: $id, nickname: $nickname) {
      id
      nickname
    }
  }
`;

export const ACCEPT_FRIEND_REQUEST = gql`
  mutation acceptFriendRequest($id: Int!, $nickname: String!) {
    acceptFriendRequest(id: $id, nickname: $nickname) {
      id
      nickname
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
