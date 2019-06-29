'use strict';

(function () {
  var cloud = document.querySelector('.cloud');
  var screen = document.querySelector('.screen');

  var CoordsHandler = function (event) {
    if ((event.clientX) && (event.clientY)) {
      this.X = event.clientX;
      this.Y = event.clientY;
    } else if (event.targetTouches) {
      this.X = event.targetTouches[0].clientX;
      this.Y = event.targetTouches[0].clientY;
    }
  };

  var onMouseDown = function (evt) {
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

    var ClientStartCoords = new CoordsHandler(evt); // Задаем координаты пользовательского события в зависимости от устройства.

    var cloudCoords = new StartCoords(ClientStartCoords.X, ClientStartCoords.Y);

    var onMouseMove = function (moveEvt) {
      moveEvt.preventDefault();

      var ClientMoveCoords = new CoordsHandler(moveEvt);

      cloudCoords.setCoords(ClientMoveCoords.X, ClientMoveCoords.Y);

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

      PositionStyle.call(cloud, cloudCoords.shiftX, cloudCoords.shiftY, 0, 0, screen.offsetWidth, screen.offsetHeight);
    };

    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();

      cloud.removeEventListener('mousemove', onMouseMove);
      cloud.removeEventListener('touchmove', onMouseMove);
      cloud.removeEventListener('mouseup', onMouseUp);
      cloud.removeEventListener('touchend', onMouseUp);
    };

    var onMouseLeave = function () {
      cloud.removeEventListener('mousemove', onMouseMove);
      cloud.removeEventListener('mouseup', onMouseUp);
      cloud.removeEventListener('touchmove', onMouseMove);
      cloud.removeEventListener('touchend', onMouseUp);
    };

    cloud.addEventListener('mousemove', onMouseMove);
    cloud.addEventListener('touchmove', onMouseMove);
    cloud.addEventListener('mouseup', onMouseUp);
    cloud.addEventListener('touchend', onMouseUp);
    cloud.addEventListener('mouseleave', onMouseLeave);
    cloud.addEventListener('touchleave', onMouseLeave);
  };

  cloud.addEventListener('mousedown', onMouseDown);
  cloud.addEventListener('touchstart', onMouseDown);
})();
