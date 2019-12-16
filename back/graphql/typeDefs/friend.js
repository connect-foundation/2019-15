module.exports = `
  type Friend{
    id:ID!
    pFriend:User
    sFriend:User
    createdAt:String
    updatedAt:String
  }
  
  type FriendEdge{
    node:Friend
    cursor:String
  }
  
  type FriendConnection{
    edges:[FriendEdge]
    pageInfo:PageInfo
  }
  
  extend type Query{
    friends(first:Int!,after:String):FriendConnection
  } 

  extend type Mutation{
    deleteFriend(id:Int!):User
  }
`;
