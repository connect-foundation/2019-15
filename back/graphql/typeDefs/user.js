module.exports = `
  type User{
    id:Int!
    userId:String
    nickname:String
    score:Int
    avatar:Int
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
  
  type AvatarResult{
    avatar:Int,
    result:Boolean
  }

  extend type Query{
    users:[User]
    checkNicknameAvailable(nickname:String!):NicknameResult
  }
  
  extend type Mutation{
    changeNickname(nickname:String!):NicknameResult
    changeAvatar(nickname:String!, avatar:Int!):AvatarResult
  }
`;
