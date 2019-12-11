module.exports = `
  type Friend{
    id:Int!
    pFriendId:Int!
    sFriendId:Int!
    createdAt:String
    updatedAt:String
  }

  type BeforeFriend{
    id:Int!
    pFriendId:Int!
    sFriendId:Int!
    friendStateid:Int!
  }
  
  type FriendResult{
    result:Boolean!
    nickname: String
  }
  
  extend type Query{
    addFriendForTest:[Friend]
    friends:[User]
  } 

  extend type Mutation{
    deleteFriend(nickname:String):FriendResult
    findFriendRequests:[User]
    deleteFriendRequest(nickname:String):[BeforeFriend]
    acceptFriendRequest(nickname:String):FriendResult
    sendFriendRequest(nickname:String):FriendResult
  }
`;
