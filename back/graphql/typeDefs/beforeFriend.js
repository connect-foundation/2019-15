module.exports = `
  type BeforeFriend{
    id:ID!
    pFriend:User
    sFriend:User
    friendStateId:Int!
  }
  
  type BeforeFriendEdge{
    node:BeforeFriend
    cursor:String
  }
  
  type BeforeFriendConnection{
    edges:[BeforeFriendEdge]
    pageInfo:PageInfo
  }
  
  extend type Query{
    beforeFriends(first:Int!,after:String):BeforeFriendConnection
  } 

  extend type Mutation{
    deleteFriendRequest(id:Int!):User
    acceptFriendRequest(id:Int!):User
    sendFriendRequest(nickname:String!):User
  }
`;
