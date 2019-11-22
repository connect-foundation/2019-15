import { gql } from 'apollo-boost';

export const getRankingAll = gql`
  query getRankingAll($order: Order = DESC, $first: Int = 5, $after: String) {
    rankingAll(order: $order, first: $first, after: $after) {
      pageInfo {
        endCursor
        hasNextPage
      }
      edges {
        node {
          score
          nickname
        }
        cursor
      }
    }
  }
`;

export const getRankingFriends = gql`
  query getRankingFriends(
    $order: Order = DESC
    $first: Int = 5
    $after: String
  ) {
    rankingFriends(order: $order, first: $first, after: $after) {
      pageInfo {
        endCursor
        hasNextPage
      }
      edges {
        node {
          score
          nickname
        }
        cursor
      }
    }
  }
`;
