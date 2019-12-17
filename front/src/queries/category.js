import { gql } from 'apollo-boost';

const GET_CATEGORIES = gql`
  query getCategories {
    getCategories {
      category
    }
  }
`;

export default GET_CATEGORIES;
