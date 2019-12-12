import { gql } from 'apollo-boost';

export const GET_RANKING_ALL = gql`
  query getRankingAll($order: Order = DESC, $first: Int = 10, $after: String) {
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

export const GET_RANKING_FRIENDS = gql`
  query getRankingFriends(
    $order: Order = DESC
    $first: Int = 10
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
