var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var canvas = document.querySelector('canvas'), ctx = canvas.getContext('2d'), width = canvas.width = window.innerWidth, height = canvas.height = window.innerHeight, balls = [], random = function (min, max) { return Math.floor(Math.random() * (max - min)) + min; };
var Ball = (function () {
    function Ball(config) {
        this.config = config;
        //
    }
    Ball.prototype.draw = function () {
        ctx.beginPath();
        ctx.fillStyle = this.config.color;
        ctx.arc(this.config.x, this.config.y, this.config.size, 0, 2 * Math.PI);
        ctx.fill();
    };
    Ball.prototype.update = function () {
        if ((this.config.x + this.config.size) >= width) {
            this.config.velX = -(this.config.velX);
        }
        if ((this.config.x - this.config.size) <= 0) {
            this.config.velX = -(this.config.velX);
        }
        if ((this.config.y + this.config.size) >= height) {
            this.config.velY = -(this.config.velY);
        }
        if ((this.config.y - this.config.size) <= 0) {
            this.config.velY = -(this.config.velY);
        }
        this.config.x += this.config.velX;
        this.config.y += this.config.velY;
    };
    Ball.prototype.collisionDetect = function () {
        for (var j = 0; j < balls.length; j++) {
            if (!(this === balls[j])) {
                var dx = this.config.x - balls[j].config.x, dy = this.config.y - balls[j].config.y, distance = Math.sqrt(dx * dx + dy * dy);
                if (distance < this.config.size + balls[j].config.size) {
                    balls[j].config.color = this.config.color = "rgb(" + random(0, 255) + ", " + random(0, 255) + ", " + random(0, 255) + ")";
                }
            }
        }
    };
    return Ball;
}());
var BallChild = (function (_super) {
    __extends(BallChild, _super);
    function BallChild(configChild, z) {
        var _this = _super.call(this, configChild) || this;
        _this.z = z;
        _this.z = z;
        console.log(_this.config.color, _this.z);
        return _this;
    }
    BallChild.prototype.child = function () {
        _super.prototype.draw.call(this);
        console.log("child");
    };
    return BallChild;
}(Ball));
var loop = function () {
    ctx.fillStyle = 'rgba(0, 0, 0, 0.25)';
    ctx.fillRect(0, 0, width, height);
    while (balls.length < 25) {
        var ball = new Ball({
            x: random(0, width),
            y: random(0, height),
            velX: random(-7, 7),
            velY: random(-7, 7),
            color: "rgb(" + random(0, 255) + ", " + random(0, 255) + ", " + random(0, 255) + ")",
            size: random(10, 20)
        });
        balls.push(ball);
    }
    for (var i = 0; i < balls.length; i++) {
        balls[i].draw();
        balls[i].update();
        balls[i].collisionDetect();
    }
    requestAnimationFrame(loop);
};
loop();
var ballChilds = new BallChild({
    x: random(0, width),
    y: random(0, height),
    velX: random(-7, 7),
    velY: random(-7, 7),
    color: "rgb(" + random(0, 255) + ", " + random(0, 255) + ", " + random(0, 255) + ")",
    size: random(10, 20)
}, random(0, 255));
ballChilds.child();
