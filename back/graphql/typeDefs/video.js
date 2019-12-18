module.exports = `
  type DrawingHistory{
    id: Int!
    userId: Int
    word: String
    createdAt: String
  }

  type CanvasData{
    id:Int!
    questionId: Int
    data: String
  }

  extend type Query{
    getLatestWordsByUser:[DrawingHistory]
    getCanvasDatasByQuestionId(questionId:Int!):[CanvasData]
  } 
`;
