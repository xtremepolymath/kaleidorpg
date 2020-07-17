var GameObject = {};

GameObject.Sprite = class {
    static create(imgSrc, x, y, size){
        this.img = document.getElementById(imgSrc);
        this.x = x;
        this.y = y;
        this.angle = 0;
        this.accel = 10;
        if(size === undefined){this.size = 1;}
        else{this.size = size;}

        return this;
    }

    static move(canvas, mouseX, mouseY){
        var dx, dy;
        if(isNaN(mouseX) || isNaN(mouseY) || mouseX < 0 || mouseY < 0 || mouseX > canvas.width || mouseY > canvas.height){
            return;
        }else{
            var mag = Math.sqrt((mouseX-this.x)*(mouseX-this.x) + (mouseY - this.y) * (mouseY - this.y));
            var angle = Math.atan2((mouseY - this.y), (mouseX-this.x));
            
            dx = Math.cos(angle);
            dy = Math.sin(angle);

            this.angle = angle;
        }

        if(mag < 10){
            return;
        }

        this.x += Math.floor(dx * this.accel);
        this.y += Math.floor(dy * this.accel);
    }

    static moveTo(x, y){
        this.x = x;
        this.y = y;
    }
}