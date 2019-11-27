module.exports = `
  type Friend{
    id:ID!
    pFriendId:Int!
    sFriendId:Int!
    createdAt:String
    updatedAt:String
  }

  type BeforeFriend{
    id:ID!
    pFriendId:Int!
    sFriendId:Int!
    friendStateid:Int!
  }
  
  extend type Query{
    addFriendForTest:[Friend]
  } 

  extend type Mutation{
    friends(pFriendId:Int):[User]
    deleteFriend(id:Int, nickname:String):[Friend]
    findFriendRequests(sFriendId:Int):[User]
    deleteFriendRequest(id:Int, nickname:String):[BeforeFriend]
    acceptFriendRequest(id:Int, nickname:String):User
    sendFriendRequest(id:Int, nickname:String):BeforeFriend
  }
`;
