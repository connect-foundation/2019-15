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
  mutation deleteFriend($id: Int!) {
    deleteFriend(id: $id) {
      id
      nickname
    }
  }
`;
