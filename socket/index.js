const publicRoom = require('./Room');
const User = require('./user');


// 사용자가 게임방(3명, 6명...) 에 입장했을 때 실행하는 로직입니다.
function personEnterRoom(nickname, socket, capacity, io) {
  // 수용인원이 꽉 차지 않은 방을 하나 찾아서(없으면 만들어서) 가져옵니다.
  const room = publicRoom.getEnableRoom(capacity);
  
  // 유저 목록에 사용자 닉네임(고유)과 소켓을 저장합니다.
  // 게임이므로 소켓을 저장하고 사용자를 특정할수 있어야 된다고 생각했습니다.(socket id)
  room.people.push(User(nickname, socket));

  
  // 입장요청을 보낸 사용자를 방에 join 시킵니다
  socket.join(room.roomId);
  
  // 사용자에게 입장에 성공했다는 메세지를 보냅니다
  socket.emit(`connect_${capacity}`, {
    roomId: room.roomId,
    roomType: capacity,
  });

  // 사용자 닉네임과 소켓아이디(생각해보니 굳이 필요없는것같다...)를 방 유저리스트에서 필터합니다.
  const userlist = room.people.map((v) => {
    return { nickname: v.nickname, socketId: v.socket.id };
  });
  
 // 방에 있는 사용자들에게 게임중인 유저목록을 보냅니다.
  io.in(room.roomId).emit('userlist', { userlist: JSON.stringify(userlist) });

  // 유저가 입장했는데 방에 사용자가 두명이면 게임시작 메세지를 보냅니다.
  // 순서는 방 입장순서이므로 첫번째사람을 데이터에 넣어 보냅니다.
  if (room.people.length === 2) {
    io.to(room.roomId).emit('gamestart', { painter: room.people[0].socket.id });
  }
}
function initSocketIO(io) {
  io.on('connection', (socket) => {
    publicRoom.roomList.forEach((roomName) => {
      socket.on(`enter_${roomName}`, ({ nickname }) => {
        personEnterRoom(nickname, socket, roomName, io);
      });
    });
