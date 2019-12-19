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

  type Result{
    questionId: Int
    dataLength: Int
  }

  extend type Query {
    getLatestWordsByUser:[DrawingHistory]
    getCanvasDatasByQuestionId(questionId:Int!):[CanvasData]
  } 

  extend type Mutation{
    saveCanvasData(data:String!, questionWord:String!):Result
  }
`;
