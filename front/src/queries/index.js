export default {
  findFriendsById(id) {
    return `{
            friends(pFriendId:${id}){
                nickname
            }
        }`;
  },
};
