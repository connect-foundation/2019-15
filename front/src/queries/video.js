import { gql } from 'apollo-boost';

export const GET_LATEST_WORDS_BY_USER = gql`
  query getLatestWordsByUser {
    getLatestWordsByUser {
      id
      word
      createdAt
    }
  }
`;
