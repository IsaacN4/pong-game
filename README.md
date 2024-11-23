# Pong Game Tutorial

Learn how to create a simple Pong game using HTML5 Canvas and JavaScript. This step-by-step guide walks you through the key components, from rendering the game elements to implementing the gameplay logic.

---

## Overview

This project uses:
- **HTML** to structure the page.
- **JavaScript** to handle the game logic and interactivity.
- **Canvas API** to draw the game elements.

---

## Step 1: Setting Up the Project

Create a new folder for your project and add the following files:

- **`index.html`**: The main HTML file.
- **`script.js`**: JavaScript file containing the game logic.

### `index.html`

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Pong Game</title>
</head>
<body>
    <script src="script.js"></script>
</body>
</html>
```

---

## Step 2: Writing the JavaScript code
Create a file named `script.js` and follow these steps.

---

## 2.1: Create and setup the canvas

Use JavaScript to dynamically create the canvas where the game will be drawn:

```javascript
const { body } = document;

const canvas = document.createElement('canvas');
const context = canvas.getContext('2d');
const width = 500;
const height = 700;
```

---

## 2.2 Define game variables

Define variables for paddles, ball, scores, and speeds:

```javascript
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
```
---

## 2.3 Render game elements

Use the Canvas API to draw the paddles, ball, and scores:

```javascript
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
```

---

## 2.4 Handle ball movement and collisions

Add logic to move the ball and detect collisions with walls and paddles:

```javascript
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
```

---

## 2.5 Add computer paddle AI

Make the computer paddle follow the ball:

```javascript
function computerPaddle() {
    if (playerMoved) {
        if (paddleComputerX + paddleWidth / 2 < ballX) {
            paddleComputerX += computerSpeed;
        } else {
            paddleComputerX -= computerSpeed;
        }
    }
}
```

---

## 2.6 Handle player paddle movement

Use mouse movement to control the player's paddle:

```javascript
function computerPaddle() {
    if (playerMoved) {
        if (paddleComputerX + paddleWidth / 2 < ballX) {
            paddleComputerX += computerSpeed;
        } else {
            paddleComputerX -= computerSpeed;
        }
    }
}
```

---

## 2.7 Game loop

Use `requestAnimationFrame` to create a smooth game loop:

```javascript
function animate() {
    ballBoundaries();
    renderCanvas();
    ballMove();
    computerPaddle();

    window.requestAnimationFrame(animate);
}
```

---

## 2.8 Start the game

Initialize the game by calling the necessary functions:

```javascript
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
```

---

## Step 3: Run the game
1. Save your `index.html` and `script.js` files in the same folder.
2. Open index.html in any modern web browser.
3. Play the game by moving your paddle with the mouse!
