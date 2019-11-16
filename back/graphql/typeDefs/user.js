module.exports = `
  type User{
    id:ID!
    userId:String!
    nickname:String!
    score:Int!
    createdAt:String
    updatedAt:String
  }
  
  extend type Query{
    users:[User]
  }
`;
