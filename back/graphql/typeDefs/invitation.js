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
  
  type InvitationResult{
    id:Int!
    result:Boolean!
  }
  
  extend type Query{
    invitations(first:Int!,after:String):InvitationConnection
  }
  
  extend type Mutation{
    deleteInvitation(id:Int!):InvitationResult
  }
`;
