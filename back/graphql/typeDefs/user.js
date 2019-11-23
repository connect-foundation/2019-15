module.exports = `
  type User{
    id:Int!
    userId:String!
    nickname:String!
    score:Int!
    createdAt:String
    updatedAt:String
  }
  
  type UserEdge{
    node:User
    cursor:String
  }
  
  type Word{
    id:Int!
    word:String
    categoryId:Int
    userId:Int
    createdAt:String
    updatedAt:String
  }
  
  extend type Query{
    users:[User]
    getWordByNickname(nickname:String):Word
    checkNicknameAvailable(nickname:String!):Boolean
  }
  
  extend type Mutation{
    changeNickname(nickname:String!):String
    updateUserNicknameById(id:String, nickname:String):[Int]
    createWord(userId:String, nickname:String):Word
    updateWordUserIdById(id:String, nickname:String):Word
  }
`;
