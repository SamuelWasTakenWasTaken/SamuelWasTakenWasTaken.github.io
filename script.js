const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

const gridSize = 20;
const tileCount = 20;
const tileSize = canvas.width / tileCount;

let snake = [{ x: 10, y: 10 }];
let apple = { x: 15, y: 15 };
let xVelocity = 0;
let yVelocity = 0;
let score = 0;
let lastUpdateTime = 0;
const frameRate = 5; // Aantal updates per seconde (lagere waarde maakt de slang trager)

function draw() {
    // Clear the canvas
    ctx.fillStyle = "#f4f4f4";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Draw the snake
    ctx.fillStyle = "#333";
    snake.forEach(segment => {
        ctx.fillRect(segment.x * tileSize, segment.y * tileSize, tileSize, tileSize);
    });

    // Draw the apple
    ctx.fillStyle = "red";
    ctx.fillRect(apple.x * tileSize, apple.y * tileSize, tileSize, tileSize);

    // Draw the score
    ctx.fillStyle = "#333";
    ctx.font = "20px Arial";
    ctx.fillText("Score: " + score, 10, 30);
}

function update(time) {
    const deltaTime = time - lastUpdateTime;
    if (deltaTime > 1000 / frameRate) {
        lastUpdateTime = time;

        const head = { x: snake[0].x + xVelocity, y: snake[0].y + yVelocity };

        // Check if snake eats apple
        if (head.x === apple.x && head.y === apple.y) {
            score++;
            apple.x = Math.floor(Math.random() * tileCount);
            apple.y = Math.floor(Math.random() * tileCount);
        } else {
            snake.pop();
        }

        snake.unshift(head);

        // Check if snake collides with walls
        if (head.x < 0 || head.x >= tileCount || head.y < 0 || head.y >= tileCount) {
            // Restart the game (reset snake and score)
            snake = [{ x: 10, y: 10 }];
            score = 0;
        }
    }
}

document.addEventListener("keydown", e => {
    if (e.key === "ArrowUp" && yVelocity !== 1) {
        xVelocity = 0;
        yVelocity = -1;
    }
    if (e.key === "ArrowDown" && yVelocity !== -1) {
        xVelocity = 0;
        yVelocity = 1;
    }
    if (e.key === "ArrowLeft" && xVelocity !== 1) {
        xVelocity = -1;
        yVelocity = 0;
    }
    if (e.key === "ArrowRight" && xVelocity !== -1) {
        xVelocity = 1;
        yVelocity = 0;
    }
});

function gameLoop(time) {
    update(time);
    draw();
    requestAnimationFrame(gameLoop);
}

requestAnimationFrame(gameLoop);
