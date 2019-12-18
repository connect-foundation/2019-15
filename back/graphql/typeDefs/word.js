module.exports = `
  type Word{
    id:Int!
    word:String
    categoryId:Int
    userId:Int
    createdAt:String
    updatedAt:String
  }

  extend type Query{
    getRandomWords(categoryId:Int):[Word]
  }
`;
