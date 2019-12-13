module.exports = `
  type Invitation{
    id:Int!
    friendsId:Int!
    roomId:String!
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
    invite(id:Int!,roomId:String!):Int
    deleteInvitation(id:Int!):InvitationResult
  }
`;
