const { time } = require('../../config/timerConfig');

function Timer() {
  this.time = time;
  this.intervalId = 0;
}

Timer.prototype.countDown = function() {
  this.time = this.time - 1;
  if (this.time <= 0) {
    this.stop();
    // do something...
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
  this.time = time;
};
