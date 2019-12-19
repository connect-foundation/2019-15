module.exports = `
  enum Order{
    ASC
    DESC
  }
  
  type RankingConnection{
    edges:[UserEdge]
    pageInfo:PageInfo
  }
  
  type UserRank{
    userId:Int
    nickname:String
    rank:Int
  }
  
  extend type Query{
    rankingAll(order:Order, first:Int!, after:String):RankingConnection
    rankingFriends(order:Order, first:Int!, after:String):RankingConnection
    getRankById:UserRank
  }
`;
