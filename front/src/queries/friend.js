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
  mutation deleteFriend($id: Int!, $nickname: String!) {
    deleteFriend(id: $id, nickname: $nickname) {
      id
      nickname
    }
  }
`;
