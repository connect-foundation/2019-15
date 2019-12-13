import { gql } from 'apollo-boost';

const GET_RANDOM_WORDS = gql`
  query getRandomWords {
    getRandomWords {
      id
      word
    }
  }
`;

export default GET_RANDOM_WORDS;
