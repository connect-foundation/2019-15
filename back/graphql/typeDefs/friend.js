module.exports = `
  type Friend{
    id:Int!
    pFriend:User!
    sFriend:User!
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
    user:User!
    result:Boolean!
  }
  
  extend type Query{
    addFriendForTest:[Friend]
  } 

  extend type Mutation{
    friends:[User]
    deleteFriend(nickname:String):FriendResult
    findFriendRequests:[User]
    deleteFriendRequest(nickname:String):[BeforeFriend]
    acceptFriendRequest(nickname:String):FriendResult
    sendFriendRequest(nickname:String):FriendResult
  }
`;
