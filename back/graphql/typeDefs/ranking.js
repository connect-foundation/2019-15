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
    rankingAll(order:Order, first:Int!, after:String):RankingConnection
  }
`;
