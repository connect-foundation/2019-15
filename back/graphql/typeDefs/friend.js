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
  
  extend type Query{
    addFriendForTest:[Friend]
  } 

  extend type Mutation{
    friends:[User]
    deleteFriend(nickname:String):[Friend]
    findFriendRequests:[User]
    deleteFriendRequest(nickname:String):[BeforeFriend]
    acceptFriendRequest(nickname:String):User
    sendFriendRequest(nickname:String):BeforeFriend
  }
`;
