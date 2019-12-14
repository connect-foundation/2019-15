module.exports = `
  type User{
    id:Int!
    nickname:String
    userId:String
    score:Int
    createdAt:String
    updatedAt:String
  }
  
  type UserEdge{
    node:User
    cursor:String
  }
  
  type NicknameResult{
    nickname:String,
    result:Boolean
  }
  
  extend type Query{
    users:[User]
    getWordByNickname(nickname:String):Word
    checkNicknameAvailable(nickname:String!):NicknameResult
  }
  
  extend type Mutation{
    changeNickname(nickname:String!):NicknameResult
    updateUserNicknameById(id:String, nickname:String):[Int]
    createWord(userId:String, nickname:String):Word
    updateWordUserIdById(id:String, nickname:String):Word
  }
`;
