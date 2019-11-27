import { gql } from 'apollo-boost';

export const checkNicknameAvailableQuery = gql`
  query checkNicknameAvailable($nickname: String!) {
    checkNicknameAvailable(nickname: $nickname) {
      nickname
      result
    }
  }
`;

export const changeNicknameMutation = gql`
  mutation changeNickname($nickname: String!) {
    changeNickname(nickname: $nickname) {
      nickname
      result
    }
  }
`;
