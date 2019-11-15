module.exports = `
  type User{
    id:ID!
    user_id:String!
    nickname:String!
    score:Int!
    createdAt:String
    updatedAt:String
  }
  
  extend type Query{
    users:[User]
  }
`;
