class User {
  constructor(nickname, roomOwner = false, id) {
    this.nickname = nickname;
    this.roomOwner = roomOwner;
    this.id = id;
  }
}

export default User;
