module.exports = `
  type Friend{
    id:Int!
    pFriend:User
    sFriend:User
    createdAt:String
    updatedAt:String
  }

  type BeforeFriend{
    id:Int!
    pFriendId:Int!
    sFriendId:Int!
    friendStateid:Int!
  }
  
  type FriendEdge{
    node:Friend
    cursor:String
  }
  
  type FriendConnection{
    edges:[FriendEdge]
    pageInfo:PageInfo
  }
  
  type FriendResult{
    result:Boolean!
    nickname: String
  }
  
  extend type Query{
    friends(first:Int!,after:String):FriendConnection
    addFriendForTest:[Friend]
  } 

  extend type Mutation{
    deleteFriend(nickname:String):FriendResult
    findFriendRequests:[User]
    deleteFriendRequest(nickname:String):[BeforeFriend]
    acceptFriendRequest(nickname:String):FriendResult
    sendFriendRequest(nickname:String):FriendResult
  }
`;
