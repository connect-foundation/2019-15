module.exports = `
  enum Order{
    ASC
    DESC
  }
  
  type RankingConnection{
    totalCount:Int
    edges:[UserEdge]
    pageInfo:PageInfo
  }
  
  extend type Query{
    ranking(order:Order, first:Int!, after:String):RankingConnection
  }
`;
