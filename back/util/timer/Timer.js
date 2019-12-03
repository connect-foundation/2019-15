const { defaultTime } = require('../../config/timerConfig');
const { RoomManager } = require('../../socket/Room');

function Timer(roomId, roomName, io) {
  this.roomId = roomId;
  this.roomName = roomName;
  this.io = io;
  this.time = defaultTime;
  this.intervalId = 0;
}

Timer.prototype.countDown = function() {
  this.time = this.time - 1;
  if (this.time <= 0) {
    this.stop();
    // do something...
    // 문제를 종료한다
    // 다음 출제자의 id와 nickname을 얻는다
    // 순환참조를 막기 위해 룸매니저를 통해 룸객체를 얻음
    const room = RoomManager.getRoomByRoomId(this.roomName, this.roomId);
    room.currentExaminer -= 1;
    // this.room.currentExaminer가 -1이라면 한 라운드가 종료된 것
    const nextExaminer = room.players[room.currentExaminer];
    // 클라에게 해당 문제를 끝내라는 시그널을 전송한다
    this.io.in(this.roomId).emit('endQuestion', {
      nickname: nextExaminer.nickname,
    });
  }
};

Timer.prototype.start = function() {
  this.intervalId = setInterval(this.countDown.bind(this), 1000);
};

Timer.prototype.stop = function() {
  if (this.intervalId) clearInterval(this.intervalId);
  this.reset();
};

Timer.prototype.reset = function() {
  this.intervalId = 0;
  this.time = defaultTime;
};

module.exports = Timer;
