module.exports = `
  type Category{
    id:Int!
    category:String
    createdAt:String
    updatedAt:String
  }

  extend type Query{
    getCategories:[Category]
  }
`;
