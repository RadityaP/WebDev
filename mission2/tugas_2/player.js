export default class Player{

    WALK_ANI_TIMER = 200;
    walkAnimationTimer = this.WALK_ANI_TIMER;
    runImages= [];

    jumpPressed = false;
    jumpInProgress= false;
    falling = false;
    JUMP_SPEED = 4.5;
    GRAVITY = 4.75

    constructor(ctx,width,height,minJumpHeight,maxJumpHeight,scaleRatio)
    {
        this.ctx = ctx;
        this.canvas = ctx.canvas;
        this.width = width;
        this.height = height;
        this.minJumpHeight = minJumpHeight;
        this.maxJumpHeight = maxJumpHeight;
        this.scaleRatio = scaleRatio;

        this.x = 10 * scaleRatio
        this.y = this.canvas.height - this.height - 1.5 * scaleRatio

        this.yStanding = this.y;

        this.standingStill = new Image();
        this.standingStill.src = "images/pika_standing-still.png";
        this.image = this.standingStill;

        const runImage1 = new Image();
        runImage1.src ="images/pika-1.png"
        const runImage2 = new Image();
        runImage2.src ="images/pika-2.png"

        this.runImages.push(runImage1);
        this.runImages.push(runImage2);

        //space
        window.removeEventListener('keydown', this.keydown);
        window.removeEventListener('keyup', this.keyup);

        window.addEventListener('keydown', this.keydown);
        window.addEventListener('keyup', this.keyup);
        
        //click or touch
        window.removeEventListener('touchstart', this.touchstart);
        window.removeEventListener('touchend', this.touchend)

        window.addEventListener('touchstart', this.touchstart);
        window.addEventListener('touchend', this.touchend)


    }
    keydown = (event)=>  {
        if (event.code === "Space"){
            this.jumpPressed = true;
        }
    }

    keyup = (event)=>  {
        if (event.code === "Space"){
            this.jumpPressed = false;
        }
    }

    touchstart = () => {
        this.jumpPressed = true;
    }

    touchend = () => {
        this.jumpPressed = false;
    }

    draw(){
        this.ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
    }

    update(gameSpeed,frameTimeDelta){
        console.log(this.jumpPressed)
        this.run(gameSpeed,frameTimeDelta)
        if (this.jumpInProgress) {
            this.image = this.runImages[0]
        }
        this.jump(gameSpeed,frameTimeDelta)
    }

    jump(frameTimeDelta){
        if(this.jumpPressed){
            this.jumpInProgress = true;
        }

        if(this.jumpInProgress && !this.falling){
            if(this.y > this.canvas.height - this.minJumpHeight || 
                this.y > this.canvas.height - this.maxJumpHeight && this.jumpPressed)
                {
                 this.y -= this.JUMP_SPEED * frameTimeDelta * this.scaleRatio   
                } else {
                    this.falling = true;
                }
        }
        else {
            if(this.y < this.yStanding){
                this.y += this.GRAVITY * frameTimeDelta * this.scaleRatio
                if(this.y + this.height > this.canvas.height){
                    this.y = this.yStanding
                }
            }
            else{
                this.falling = false;
                this.jumpInProgress = false;
            }
        }
    }

    run(gameSpeed,frameTimeDelta){
        if(this.walkAnimationTimer <=0){
            if(this.image === this.runImages[0]){
                this.image = this.runImages[1];
            }else{
                this.image = this.runImages[0];
            }
            this.walkAnimationTimer = this.WALK_ANI_TIMER;
        }
        this.walkAnimationTimer -= frameTimeDelta * gameSpeed;
    }
}