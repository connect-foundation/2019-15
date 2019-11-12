module.exports = `
  type User{
    id:ID!
    user_id:String!
    nickname:String!
    createdAt:String
    updatedAt:String
  }
  
  extend type Query{
    users:[User]
  }
`;
