import { gql } from 'apollo-boost';

export const CHECK_NICKNAME_AVAILABLE = gql`
  query checkNicknameAvailable($nickname: String!) {
    checkNicknameAvailable(nickname: $nickname) {
      nickname
      result
    }
  }
`;

export const CHANGE_NICKNAME = gql`
  mutation changeNickname($nickname: String!) {
    changeNickname(nickname: $nickname) {
      nickname
      result
    }
  }
`;

export const CHANGE_AVATAR = gql`
  mutation changeAvatar($nickname: String!, $avatar: Int!) {
    changeAvatar(nickname: $nickname, avatar: $avatar) {
      avatar
      result
    }
  }
`;
