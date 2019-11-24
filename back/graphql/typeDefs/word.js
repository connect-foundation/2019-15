module.exports = `
  type Word{
    id:Int!
    word:String
    category:String
    userId:Int
    createdAt:String
    updatedAt:String
  }

  extend type Query{
    getRandomWords:[Word]
  }
`;
