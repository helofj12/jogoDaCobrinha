document.addEventListener("DOMContentLoaded", function () {
    const board = document.getElementById("game-board");
    const snakeHead = document.getElementById("snake-head");
    const food = document.getElementById("food");
    const tailContainer = document.getElementById("tail-container");
    const scoreDisplay = document.getElementById("score");

    let snakeX = 0;
    let snakeY = 0;
    let snakeDirection = "right";
    let foodX;
    let foodY;
    let tail = [];
    let tailLength = 0;
    let score = 0;

    function randomPosition() {
        return Math.floor(Math.random() * 15) * 20;
    }

    function placeFood() {
        foodX = randomPosition();
        foodY = randomPosition();
        food.style.left = foodX + "px";
        food.style.top = foodY + "px";
    }

    function moveSnake() {
        let prevX = snakeX;
        let prevY = snakeY;

        switch (snakeDirection) {
            case "up":
                snakeY -= 20;
                break;
            case "down":
                snakeY += 20;
                break;
            case "left":
                snakeX -= 20;
                break;
            case "right":
                snakeX += 20;
                break;
        }

        snakeHead.style.left = snakeX + "px";
        snakeHead.style.top = snakeY + "px";

        updateTail(prevX, prevY);
    }

    function updateTail(prevX, prevY) {
        if (tailLength > 0) {
            for (let i = tail.length - 1; i > 0; i--) {
                tail[i].style.left = tail[i - 1].style.left;
                tail[i].style.top = tail[i - 1].style.top;
            }

            tail[0].style.left = prevX + "px";
            tail[0].style.top = prevY + "px";
        }
    }

    function checkCollision() {
        if (
            snakeX < 0 ||
            snakeY < 0 ||
            snakeX >= 300 ||
            snakeY >= 300 ||
            checkTailCollision()
        ) {
            resetGame();
        }

        if (snakeX === foodX && snakeY === foodY) {
            placeFood();
            addTail();
            increaseScore();
        }
    }

    function checkTailCollision() {
        for (let i = 0; i < tail.length; i++) {
            if (snakeX === parseInt(tail[i].style.left) && snakeY === parseInt(tail[i].style.top)) {
                return true;
            }
        }
        return false;
    }

    function addTail() {
        const newTail = document.createElement("div");
        newTail.classList.add("snake", "tail");
        tailContainer.appendChild(newTail);
        tail.push(newTail);
        tailLength++;
    }

    function increaseScore() {
        score++;
        scoreDisplay.textContent = "Score: " + score;
    }

    function resetGame() {
        snakeX = 0;
        snakeY = 0;
        snakeDirection = "right";
        score = 0;
        scoreDisplay.textContent = "Score: " + score;

        // Remove tail elements from DOM
        for (let i = 0; i < tail.length; i++) {
            tailContainer.removeChild(tail[i]);
        }

        tail = [];
        tailLength = 0;

        placeFood();
    }

    function gameLoop() {
        moveSnake();
        checkCollision();
    }

    document.addEventListener("keydown", function (e) {
        switch (e.key) {
            case "ArrowUp":
                if (snakeDirection !== "down") {
                    snakeDirection = "up";
                }
                break;
            case "ArrowDown":
                if (snakeDirection !== "up") {
                    snakeDirection = "down";
                }
                break;
            case "ArrowLeft":
                if (snakeDirection !== "right") {
                    snakeDirection = "left";
                }
                break;
            case "ArrowRight":
                if (snakeDirection !== "left") {
                    snakeDirection = "right";
                }
                break;
        }
    });

    placeFood();
    setInterval(gameLoop, 200);
});
    