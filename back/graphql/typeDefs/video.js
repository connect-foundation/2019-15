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

  type LatestWordEdge{
    node:DrawingHistory
    cursor:String
  }

  type LatestWordConnection{
    edges:[LatestWordEdge]
    pageInfo:PageInfo
  }

  extend type Query {
    getLatestWordsByUser(first:Int!, after:String):LatestWordConnection
    getCanvasDatasByQuestionId(questionId:Int!):[CanvasData]
  } 

  extend type Mutation{
    saveCanvasData(data:String!, questionWord:String!):Result
  }
`;
