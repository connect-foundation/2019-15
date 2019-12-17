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

export const GET_CANVAS_DATA_BY_QUESTION_ID = gql`
  query getCanvasDatasByQuestionId($questionId: Int!) {
    getCanvasDatasByQuestionId(questionId: $questionId) {
      id
      data
    }
  }
`;
