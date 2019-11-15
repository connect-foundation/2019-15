module.exports = `
  enum Order{
    ASC
    DESC
  }
  extend type Query{
    ranking(order:Order, limit:Int, offset:Int):[User]
  }
`;
