import { gql } from 'apollo-boost';

const getRandomWords = gql`
  query getRandomWords {
    getRandomWords {
      id
      word
    }
  }
`;

export default getRandomWords;
