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
    findFriendRequests(sFriendId:Int):[User]
  } 

  extend type Mutation{
    friends(pFriendId:Int):[User],
    deleteFriend(id:Int, nickname:String):[Friend],
  }
`;
