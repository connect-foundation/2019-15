import { gql } from 'apollo-boost';

const GET_RANDOM_WORDS = gql`
  query getRandomWords($categoryId: Int) {
    getRandomWords(categoryId: $categoryId) {
      id
      word
    }
  }
`;

export default GET_RANDOM_WORDS;
