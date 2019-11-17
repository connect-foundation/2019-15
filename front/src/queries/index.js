export default {
  findFriendsById(id) {
    return `{
            friends(pFriendId:${id}){
                nickname
            }
        }`;
  },
  deleteFriend(id, nickname) {
    return `{
      deleteFriend(id:${id}, nickname:"${nickname}"){
        id
      }
    }`;
  },
};
