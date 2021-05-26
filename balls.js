

const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');

const width = canvas.width = window.innerWidth;
const height = canvas.height = window.innerHeight;


// function to generate random number

function random(min, max) {
    const num = Math.floor(Math.random() * (max - min + 1)) + min;
    return num;
}

function Shape(x, y, velX, velY, exists) {
    this.x = x;
    this.y = y;
    this.velX = velX;
    this.velY = velY;
    this.exists = exists;
}

function Ball(x, y, velX, velY, color, size) {
    this.x = x;
    this.y = y;
    this.velX = velX;
    this.velY = velY;
    this.color = color;
    this.size = size;
}

Ball.prototype.draw = function() {
    ctx.beginPath();
    ctx.fillStyle = this.color;
    ctx.arc(this.x, this.y, this.size,0, 2 * Math.PI);
    ctx.fill();
}

Ball.prototype.update = function() {
    if ((this.x + this.size) >= width) {
        this.velX = -(this.velX);
    }
    if ((this.x - this.size) <= 0) {
        this.velX = -(this.velX);
    }
    if ((this.y + this.size) >= height) {
        this.velY = -(this.velY);
    }
    if ((this.y - this.size) <= 0) {
        this.velY = -(this.velY);
    }

    this.x += this.velX;
    this.y += this.velY;
}

Ball.prototype.collisionDetect = function() {
    for (let j = 0; j < ballsArr.length; j++) {
        if (!(this === ballsArr[j])) {
            const dx = this.x - ballsArr[j].x;
            const dy = this.y - ballsArr[j].y;
            const distance = Math.sqrt((dx * dx) + (dy * dy));

            if (distance < this.size + ballsArr[j].size) {
                ballsArr[j].color = this.color = 'rgb(' + random(0, 255) + ',' + random(0, 255) + ',' + random(0, 255) +')';
            }
        }
    }
}

let ballsArr = [];

while (ballsArr.length < 25) {
    let size = random(10, 20);
    // ball position always drawn at least one ball width
    // away from the edge of the canvas, to avoid drawing errors
    let ball = new Ball (
        random(0 + size, width - size),
        random(0 + size, height - size),
        random(-7, 7),
        random(-7, 7),
        'rgb(' + random(0, 255) + ',' + random(0, 255) + ',' + random(0, 255) + ')',
        size
    );

    ballsArr.push(ball);
}

function loop() {
    //ctx.fillStyle = 'rgba(0, 0, 0, 0)';
    ctx.fillStyle = 'grey';
    ctx.fillRect(0, 0, width, height);

    for (let i = 0; i < ballsArr.length; i++) {
        ballsArr[i].draw();
        ballsArr[i].update();
        ballsArr[i].collisionDetect();
    }

    requestAnimationFrame(loop);
}

loop();