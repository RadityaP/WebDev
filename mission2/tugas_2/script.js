import Player from "./player.js";
import Ground from "./ground.js";
import CactiController from "./cactiController.js";
import Score from "./score.js";

const canvas = document.getElementById('game');
const ctx = canvas.getContext("2d");

const GAME_SPEED_START = 1;
const GAME_SPEED_INC = 0.00001;

const GAME_W = 800;
const GAME_H = 200;
const PLAYER_W = 88;
const PLAYER_H = 65;
const MAX_JUMP_H = GAME_H;
const MIN_JUMP_H = 150;
const GROUND_W = 2400;
const GROUND_H = 24;
const GROUND_AND_CACTUS_SPEED = 0.5;

const CACTI_CONFIG = [
    {width: 48 /1.5, height:100 /1.5, image: "images/cactus_1.png"},
    {width: 98 /1.5, height:100 /1.5, image: "images/cactus_2.png"},
    {width: 68 /1.5, height:70  /1.5, image: "images/cactus_3.png"}
]

//game obj
let player = null
let ground = null
let cactiController = null
let score = null;

let scaleRatio = null
let previousTime = null
let gameSpeed = GAME_SPEED_START;
let gameOver = false;
let hasAddedEventListenersForRestart = false;
let waitingToStart = true;

function createSprites(){
    const playerWidthIG = PLAYER_W * scaleRatio
    const playerHeightIG = PLAYER_H * scaleRatio
    const minJumpHeightIG = MIN_JUMP_H * scaleRatio
    const maxJumpHeightIG = MAX_JUMP_H * scaleRatio

    const groundWidthIG = GROUND_W * scaleRatio
    const groundHeightIG = GROUND_H * scaleRatio

    player = new Player(ctx,playerWidthIG,playerHeightIG,minJumpHeightIG,maxJumpHeightIG,scaleRatio)
    ground = new Ground(ctx,groundWidthIG,groundHeightIG,GROUND_AND_CACTUS_SPEED,scaleRatio);

    const cactiImages = CACTI_CONFIG.map(cactus =>{
        const image = new Image()
        image.src = cactus.image
        return{
            image: image,
            width: cactus.width * scaleRatio,
            height: cactus.height * scaleRatio,
        }
    })

    cactiController = new CactiController(
        ctx,
        cactiImages,
        scaleRatio,
        GROUND_AND_CACTUS_SPEED,

    )

    score = new Score(ctx,scaleRatio);
}

function setScreen(){
    scaleRatio = getScaleRatio()
    canvas.width = GAME_W * scaleRatio;
    canvas.height = GAME_H * scaleRatio;
    createSprites();
}

setScreen()
window.addEventListener("resize",setScreen);

if(screen.orientation){
    screen.orientation.addEventListener('change',setScreen);
}

function getScaleRatio(){
    const screenHeight = Math.min(window.innerHeight, 
        document.documentElement.clientHeight);

    const screenWidth = Math.min(
        window.innerWidth,
        document.documentElement.clientWidth
    );

    if(screenWidth/screenHeight < GAME_W/GAME_H){
        return screenWidth/GAME_W
    }else {
        return screenHeight/GAME_H
    }
}

function clearScreen(){
    ctx.fillStyle = "white";
    ctx.fillRect(0,0, canvas.width, canvas.height);
}

function showGameOver() {
    const fontSize = 70 * scaleRatio;
    ctx.font = `${fontSize}px Verdana`;
    ctx.fillStyle = "grey";
    const x = canvas.width / 8.5;
    const y = canvas.height / 2;
    ctx.fillText("LMAO SKILL ISSUE", x, y);
  }

  function setupGameReset() {
    if (!hasAddedEventListenersForRestart) {
      hasAddedEventListenersForRestart = true;
  
      setTimeout(() => {
        window.addEventListener("keyup", reset, { once: true });
        window.addEventListener("touchstart", reset, { once: true });
      }, 1000);
    }
  }

  function reset() {
    hasAddedEventListenersForRestart = false;
    gameOver = false;
    waitingToStart = false;
    ground.reset();
    cactiController.reset();
    score.reset();
    gameSpeed = GAME_SPEED_START;
  }

  function showStartGameText() {
    const fontSize = 40 * scaleRatio;
    ctx.font = `${fontSize}px Verdana`;
    ctx.fillStyle = "grey";
    const x = canvas.width / 14;
    const y = canvas.height / 2;
    ctx.fillText("Press Space To Start :3 ", x, y);
  }

  function updateGameSpeed(frameTimeDelta) {
    gameSpeed += frameTimeDelta * GAME_SPEED_INC;
  }

function gameLoop(currentTime){
    if(previousTime === null){
        previousTime= currentTime;
        requestAnimationFrame(gameLoop);
        return
    }

    const frameTimeDelta = currentTime - previousTime;
    previousTime = currentTime;

    clearScreen();
    if (!gameOver && !waitingToStart) {
        //update game obj
    ground.update(gameSpeed,frameTimeDelta);
    cactiController.update(gameSpeed, frameTimeDelta);
    player.update(gameSpeed, frameTimeDelta)
    score.update(frameTimeDelta)
    updateGameSpeed(frameTimeDelta)
    }

    if(!gameOver && cactiController.collideWith(player)){
        gameOver = true;
        setupGameReset();
        score.setHighScore();
    }
    

    //draw obj
    ground.draw();
    cactiController.draw();
    player.draw();
    score.draw();

    if(gameOver){
        showGameOver();
    }

    if(waitingToStart){
        showStartGameText();
    }


    requestAnimationFrame(gameLoop)
}

requestAnimationFrame(gameLoop)

window.addEventListener("keyup", reset, { once: true });
window.addEventListener("touchstart", reset, { once: true });