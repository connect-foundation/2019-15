module.exports = `
  type Friend{
    id:ID!
    pFriendId:Int!
    sFriendId:Int!
    createdAt:String
    updatedAt:String
  }
  
  extend type Query{
    addFriendForTest:[Friend]
  } 

  extend type Mutation{
    friends(pFriendId:Int):[User],
    deleteFriend(id:Int, nickname:String):[Friend]
  }
`;
