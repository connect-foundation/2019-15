module.exports = `
  type Friend{
    id:ID!
    pFriendId:Int!
    sFriendId:Int!
    createdAt:String
    updatedAt:String
  }
  
  extend type Query{
    friends(pFriendId:Int):[User]
  } 
`;
