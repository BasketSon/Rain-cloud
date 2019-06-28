'use strict';

(function () {
  var cloud = document.querySelector('.cloud');
  var screen = document.querySelector('.screen');

  cloud.addEventListener('mousedown', function (evt) {
    evt.preventDefault();

    var StartCoords = function (x, y) {
      this.x = x;
      this.y = y;
    };

    StartCoords.prototype.setCoords = function (x, y) {
      this.shiftX = x - this.x;
      this.shiftY = y - this.y;
      this.x = x;
      this.y = y;
    };

    var cloudCoords = new StartCoords(evt.clientX, evt.clientY);

    var onMouseMove = function (moveEvt) {
      moveEvt.preventDefault();

      cloudCoords.setCoords(moveEvt.clientX, moveEvt.clientY);

      var PositionStyle = function (x, y, minX, minY, maxX, maxY) {
        this.style.left = (this.offsetLeft + x) + 'px';
        this.style.top = (this.offsetTop + y) + 'px';

        this._minX = minX;
        this._minY = minY;
        this._maxX = maxX;
        this._maxY = maxY;
        if (this.offsetLeft + this.offsetWidth / 2 > this._maxX) {
          this.style.left = this._maxX - this.offsetWidth / 2 + 'px';
        }
        if (this.offsetLeft + this.offsetWidth / 2 < this._minX) {
          this.style.left = this._minX - this.offsetWidth / 2 + 'px';
        }
        if (this.offsetTop + this.offsetHeight / 2 > this._maxY) {
          this.style.top = this._maxY - this.offsetHeight / 2 + 'px';
        }
        if (this.offsetTop + this.offsetHeight / 2 < this._minY) {
          this.style.top = this._minY - this.offsetHeight / 2 + 'px';
        }
      };

      PositionStyle.prototype.setX = function () {
      };

      PositionStyle.prototype.setY = function () {
      };

      PositionStyle.call(cloud, cloudCoords.shiftX, cloudCoords.shiftY, 0, 0, screen.offsetWidth, screen.offsetHeight);

      // cloud.style.left = (cloud.offsetLeft + cloudCoords.shiftX) + 'px';
      // cloud.style.top = (cloud.offsetTop + cloudCoords.shiftY) + 'px';

    };

    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();

      cloud.removeEventListener('mousemove', onMouseMove);
      cloud.removeEventListener('mouseup', onMouseUp);
    };

    var onMouseLeave = function () {
      cloud.removeEventListener('mousemove', onMouseMove);
      cloud.removeEventListener('mouseup', onMouseUp);
    };

    cloud.addEventListener('mousemove', onMouseMove);
    cloud.addEventListener('mouseup', onMouseUp);
    cloud.addEventListener('mouseleave', onMouseLeave)
  });
})();
