module.exports = `
  enum Order{
    ASC
    DESC
  }
  
  type RankingConnection{
    edges:[UserEdge]
    pageInfo:PageInfo
  }
  
  extend type Query{
    rankingAll(order:Order, first:Int!, after:String):RankingConnection
    rankingFriends(order:Order, first:Int!, after:String):RankingConnection
    getRankingById(id:Int!):Int
  }
`;
