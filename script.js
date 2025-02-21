const gameContainer = document.getElementById("game-container");
const ball = document.getElementById("ball");
const playerPaddle = document.getElementById("player-paddle");
const computerPaddle = document.getElementById("computer-paddle");
const scoreDisplay = document.getElementById("score");

const BALL_SIZE = 20;
const PADDLE_WIDTH = 10;
const PADDLE_HEIGHT = 100;
const GAME_WIDTH = gameContainer.offsetWidth;
const GAME_HEIGHT = gameContainer.offsetHeight;

let ballX = GAME_WIDTH / 2;
let ballY = GAME_HEIGHT / 2;
let ballDX = 5;
let ballDY = 5;
let playerY = GAME_HEIGHT / 2 - PADDLE_HEIGHT / 2;
let computerY = GAME_HEIGHT / 2 - PADDLE_HEIGHT / 2;
let playerScore = 0;
let computerScore = 0;

function updateBallPosition(){
    ballX += ballDX;
    ballY += ballDY;


    // collision with top and bottom wall
    if(ballY + BALL_SIZE > GAME_HEIGHT || ballY < 0){
        ballDY *= -1;
    }

    // collision with player paddle
    if(ballX < PADDLE_WIDTH && ballY > playerY && ballY < playerY + PADDLE_HEIGHT){
        ballDX *= -1;
    }
    
    // collision with computer paddle
    if(ballX + BALL_SIZE > GAME_WIDTH - PADDLE_WIDTH && ballY > computerY && ballY < computerY + PADDLE_HEIGHT){
        ballDX *= -1;
    }

    //SCORING
    if(ballX < 0){
        computerScore++;
        resetBall();
    } else if(ballX + BALL_SIZE > GAME_WIDTH){
        playerScore++;
        resetBall();
    }

    //player movement
    ball.style.left = ballX + "px";
    ball.style.top = ballY + "px";

}

function resetBall(){
    ballX = GAME_WIDTH / 2;
    ballY = GAME_HEIGHT / 2;
    ballDX *= -1;

}

function updatePaddlePosition(){
    document.addEventListener("mousemove", (event) =>{
        playerY = event.clientY - gameContainer.offsetTop - PADDLE_HEIGHT / 2;

        playerY = Math.max(0, Math.min(GAME_HEIGHT - PADDLE_HEIGHT, playerY)); 
        playerPaddle.style.top = playerY + "px";

    });    
}

function gameLoop(){
    
    updatePaddlePosition();
    requestAnimationFrame(gameLoop);
    updateBallPosition();
}

gameLoop();