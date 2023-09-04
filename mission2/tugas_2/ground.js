export default class Ground {
    constructor (ctx,W,H,S,scaleRatio){
        this.ctx = ctx;
        this.canvas = ctx.canvas;
        this.width = W
        this.height = H
        this.speed = S
        this.scaleRatio = scaleRatio

        this.x = 0
        this.y = this.canvas.height - this.height;

        this.groudImage = new Image();
        this.groudImage.src = "images/ground.png"
    }

    draw(){
        this.ctx.drawImage(this.groudImage,this.x,this.y,this.width,this.height);
        
        this.ctx.drawImage(this.groudImage,this.x + this.width,this.y,this.width,this.height);

        if(this.x < -this.width){
            this.x = 0;
        }
    };

    

    update(gameSpeed, frameTimeDelta){
        this.x -= gameSpeed * frameTimeDelta * this.speed * this.scaleRatio;

    }

    reset(){
        this.x = 0
    }
}