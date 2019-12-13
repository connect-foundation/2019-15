import { gql } from 'apollo-boost';

export const GET_INVITATIONS = gql`
  query getInvitations($first: Int = 10, $after: String) {
    invitations(first: $first, after: $after) {
      pageInfo {
        endCursor
        hasNextPage
      }
      edges {
        node {
          id
          roomId
          Friend {
            pFriend {
              id
              nickname
            }
            sFriend {
              id
              nickname
            }
          }
        }
        cursor
      }
    }
  }
`;

export const DELETE_INVITATION = gql`
  mutation deleteInvitation($id: Int!) {
    deleteInvitation(id: $id) {
      result
    }
  }
`;

export const INVITE = gql`
  mutation invite($id: Int!, $roomId: String!) {
    invite(id: $id, roomId: $roomId)
  }
`;
