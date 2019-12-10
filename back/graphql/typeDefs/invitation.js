module.exports = `
  type Invitation{
    id:Int!
    friendsId:Int!
    url:String!
    Friend:Friend!
    createdAt:String
    updatedAt:String
  }
  
  type InvitationEdge{
    node:Invitation
    cursor:String
  }
  
  type InvitationConnection{
    edges:[InvitationEdge]
    pageInfo:PageInfo
  }
  
  extend type Query{
    invitations(first:Int!,after:ID):InvitationConnection
  }
`;
