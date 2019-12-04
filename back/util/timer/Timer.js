const { defaultTime } = require('../../config/timerConfig');

function Timer(roomId, roomName, io) {
  this.roomId = roomId;
  this.roomName = roomName;
  this.io = io;
  this.time = defaultTime;
  this.intervalId = 0;
  this.timeOutCallback = undefined;
}

Timer.prototype.countDown = function() {
  this.time = this.time - 1;
  if (this.time <= 0) {
    this.stop();
    // do something...
    this.timeOutCallback();
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

Timer.prototype.setTimeOutCallback = function(callback) {
  this.timeOutCallback = callback;
};

Timer.prototype.getRemainTime = function() {
  return this.time;
};

Timer.prototype.getDefaultTime = function() {
  return defaultTime;
};

module.exports = Timer;
