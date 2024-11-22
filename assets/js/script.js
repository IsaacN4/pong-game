'use strict';

const { body } = document;

const canvas = document.createElement('canvas');
const context = canvas.getContext('2d');
const width = 500;
const height = 700;

const paddleWidth = 50;
const paddleHeight = 20;
let paddleComputerX = 225;
let paddlePlayerX = 225;
const paddleDiff = 25;

let ballX = width / 2;
let ballY = height / 2;
const ballRadius = 5;

let playerScore = 0;
let computerScore = 0;

let speedY = -2;
let speedX = -2;
const computerSpeed = 3;

let playerMoved = false;
let paddleContact = false;

function renderCanvas() {
    context.fillStyle = "white";
    context.fillRect(0, 0, width, height);

    context.fillStyle = "black";
    context.fillRect(paddleComputerX, 10, paddleWidth, paddleHeight);

    context.fillRect(paddlePlayerX, height - 30, paddleWidth, paddleHeight);

    context.beginPath();
    context.arc(ballX, ballY, ballRadius, 2 * Math.PI, false);
    context.fillStyle = "black";
    context.fill();

    context.beginPath();
    context.setLineDash([4]);
    context.moveTo(0, height / 2);
    context.lineTo(width, height / 2);
    context.strokeStyle = "grey";
    context.stroke();

    context.font = "32px Courier New";
    context.fillText(playerScore, width / 2 - 40, height - 50);
    context.fillText(computerScore, width / 2 - 40, 50);
}

function ballMove() {
    ballY += -speedY;
    if (playerMoved && paddleContact) {
        ballX += speedX;
    }
}

function ballReset() {
    ballX = width / 2;
    ballY = height / 2;
    speedY = -3;
    speedX = (Math.random() > 0.5 ? 1 : -1) * (Math.random() * 3 + 2);
}

function ballBoundaries() {
    if (ballX < 0 && speedX < 0) {
        speedX = -speedX;
    }
    if (ballX > width && speedX > 0) {
        speedX = -speedX;
    }

    if (ballY > height - paddleDiff) {
        if (ballX > paddlePlayerX && ballX < paddlePlayerX + paddleWidth) {
            paddleContact = true;
            if (playerMoved) {
                speedY -= 1;
                speedY = Math.max(-10, speedY);
            }
            speedY = -speedY;
            const trajectoryX = ballX - (paddlePlayerX + paddleWidth / 2);
            speedX = trajectoryX * 0.3;
        } else if (ballY > height) {
            ballReset();
            computerScore++;
        }
    }

    if (ballY < paddleDiff) {
        if (ballX > paddleComputerX && ballX < paddleComputerX + paddleWidth) {
            if (playerMoved) {
                speedY += 1;
                speedY = Math.min(10, speedY);
            }
            speedY = -speedY;
        } else if (ballY < 0) {
            ballReset();
            playerScore++;
        }
    }
}

function computerPaddle() {
    if (playerMoved) {
        if (paddleComputerX + paddleWidth / 2 < ballX) {
            paddleComputerX += computerSpeed;
        } else {
            paddleComputerX -= computerSpeed;
        }
    }
}

function animate() {
    ballBoundaries();
    renderCanvas();
    ballMove();
    computerPaddle();

    window.requestAnimationFrame(animate);
}

function createCanvas() {
    canvas.height = height;
    canvas.width = width;
    body.appendChild(canvas);
    renderCanvas();
}

function startGame() {
    createCanvas();
    animate();

    playerScore = 0;
    computerScore = 0;

    canvas.addEventListener("mousemove", (e) => {
        playerMoved = true;
        paddlePlayerX = e.clientX - canvas.offsetLeft - paddleWidth / 2;

        if (paddlePlayerX < 0) paddlePlayerX = 0;
        if (paddlePlayerX > width - paddleWidth) paddlePlayerX = width - paddleWidth;
    });

}

startGame();
