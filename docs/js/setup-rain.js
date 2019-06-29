'use strict';

(function () {
  var screen = document.querySelector('.screen');
  var canvas = document.querySelector('.canvas');
  var cloud = document.querySelector('.cloud');
  var ScreenSize = function (width, height) {
    this.width = width;
    this.height = height;
  };
  var WINDOW_RESIZE_TIMEOUT = 100;
  var windowResizeHandler = window.debounce(function () {
    ScreenSize.call(canvas, screen.offsetWidth, screen.offsetHeight);
    window.setupRain();
    if (cloud.offsetLeft + cloud.offsetWidth / 2 > canvas.width) {
      cloud.style.left = canvas.width - cloud.offsetWidth / 2 + 'px';
    }
    if (cloud.offsetTop + cloud.offsetHeight / 2 > canvas.height) {
      cloud.style.top = canvas.height - cloud.offsetHeight / 2 + 'px';
    }
  }, WINDOW_RESIZE_TIMEOUT);

  window.addEventListener('resize', windowResizeHandler);

  var cleanUpFrame = function (ctx) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  };

  var renderFrame = function (ctx, raindrops) {
    cleanUpFrame(ctx);

    raindrops.forEach(function (drop) {
      drop.render(ctx);
      drop.update();
    });

    requestAnimationFrame(renderFrame.bind(null, ctx, raindrops));
  };

  var Raindrop = function () {
    this._reset();
  };

  Raindrop.prototype.render = function (ctx) {
    ctx.strokeStyle = '#dae5f5';
    ctx.beginPath();
    ctx.moveTo(this.x, this.y);
    ctx.lineTo(this.x - this.size, this.y + this.size);
    ctx.closePath();
    ctx.stroke();
  };

  Raindrop.prototype.update = function () {
    this.x += this.velocity;
    this.y += this.hvelocity;

    if (this.isOffscreen()) {
      this._reset();
    }
  };

  Raindrop.prototype.isOffscreen = function () {
    return this.y > canvas.height + this.size ||
    this.x > canvas.width * 1.2 + this.size ||
    this.x < -this.size;
  };

  Raindrop.prototype._reset = function () {
    this.size = getRandomValue(1, 5);

    this.x = getRandomValue(cloud.offsetLeft, cloud.offsetLeft + cloud.offsetWidth * 0.9);

    this.y = getRandomValue(cloud.offsetTop + cloud.offsetHeight * 0.7, cloud.offsetTop + cloud.offsetHeight);

    this.velocity = 2.5 * (this.size - 6);
    this.hvelocity = 2.5 * (this.size * 1.5);
  };

  var getRandomValue = function (left, right) {
    return Math.floor(3 * (left + Math.random() * (right - left))) / 3;
  };

  window.setupRain = function () {
    var DROPS = 200;
    ScreenSize.call(canvas, screen.offsetWidth, screen.offsetHeight);
    var ctx = canvas.getContext('2d');

    var raindrops = new Array(DROPS).fill('').map(function () {
      return new Raindrop();
    });

    renderFrame(ctx, raindrops)

  };
  window.setupRain();

})();
