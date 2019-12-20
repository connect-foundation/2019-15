const { defaultExpireTime } = require('../../config/timerConfig');

function Timer(roomId, roomType, io) {
  this.roomId = roomId;
  this.roomType = roomType;
  this.io = io;
  this.endTime = 0;
  this.intervalId = 0;
  this.timeOutCallback = null;
  this.expireTime = defaultExpireTime;
}

Timer.prototype.countDown = function() {
  if (Date.now() >= this.endTime) {
    this.stop();
    // do something...
    this.timeOutCallback();
  }
};

Timer.prototype.start = function() {
  this.endTime = Date.now() + this.expireTime;
  this.intervalId = setInterval(this.countDown.bind(this), 1000);
};

Timer.prototype.stop = function() {
  if (this.intervalId) clearInterval(this.intervalId);
  this.reset();
};

Timer.prototype.reset = function() {
  this.intervalId = 0;
  this.endTime = 0;
};

Timer.prototype.setTimeOutCallback = function(callback) {
  this.timeOutCallback = callback;
};

Timer.prototype.getRemainTime = function() {
  return this.endTime - Date.now();
};

Timer.prototype.getDefaultExpireTime = function() {
  return this.expireTime;
};

module.exports = Timer;
