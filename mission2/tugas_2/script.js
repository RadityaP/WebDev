import Player from "./player.js";
import Ground from "./ground.js";

const canvas = document.getElementById('game');
const ctx = canvas.getContext("2d");

const GAME_SPEED_START = .75;
const GAME_SPEED_INC = 0.0001;

const GAME_W = 800;
const GAME_H = 200;
const PLAYER_W = 88;
const PLAYER_H = 65;
const MAX_JUMP_H = GAME_H;
const MIN_JUMP_H = 150;
const GROUND_W = 2400;
const GROUND_H = 24;
const GROUND_AND_CACTUS_SPEED = 0.5

//game obj
let player = null
let ground = null

let scaleRatio = null
let previousTime = null
let gameSpeed = GAME_SPEED_START;

function createSprites(){
    const playerWidthIG = PLAYER_W * scaleRatio
    const playerHeightIG = PLAYER_H * scaleRatio
    const minJumpHeightIG = MIN_JUMP_H * scaleRatio
    const maxJumpHeightIG = MAX_JUMP_H * scaleRatio

    const groundWidthIG = GROUND_W * scaleRatio
    const groundHeightIG = GROUND_H * scaleRatio

    player = new Player(ctx,playerWidthIG,playerHeightIG,minJumpHeightIG,maxJumpHeightIG,scaleRatio)
    ground = new Ground(ctx,groundWidthIG,groundHeightIG,GROUND_AND_CACTUS_SPEED,scaleRatio);
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

function gameLoop(currentTime){
    if(previousTime === null){
        previousTime= currentTime;
        requestAnimationFrame(gameLoop);
        return
    }

    const frameTimeDelta = currentTime - previousTime;
    previousTime = currentTime;

    clearScreen();

    //update game obj
    ground.update(gameSpeed,frameTimeDelta);
    player.update(gameSpeed, frameTimeDelta)

    //draw obj
    ground.draw();
    player.draw();


    requestAnimationFrame(gameLoop)
}

requestAnimationFrame(gameLoop)
