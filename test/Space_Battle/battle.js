//TO DO:
//  1. Have a layout of the ship available, with the different tasks being shown on the map
//  a. 
//  2. Have a 

document.addEventListener("DOMContentLoaded", SetupCanvas);

var canvas;
var ctx;
var canvasWidth = window.innerWidth;
var canvasHeight = window.innerHeight;
var ship = new Ship();
ship.img.src = "shipImg.png";
var characters = [];

function SetupCanvas(){
    canvas = document.getElementById("gameCanv");
    ctx = canvas.getContext("2d");
    canvas.width = canvasWidth;
    canvas.height = canvasHeight;
    ctx.fillStyle = "black";
    ctx.fillRect(0,0,canvas.width, canvas.height);
    Render();
}

class Ship {
    constructor(){
        this.imgSrc;
        if(this.imgSrc === undefined){
            
        }
        this.img = new Image();
        this.img.src = "shipImg.png";
        this.x = 0;
        this.y = 0;
        this.width = this.img.width;
        this.height = this.img.height;
        this.size = 1;
    }
    Draw(){
        ctx.drawImage(this.img,
            this.x,
            this.y,
            this.width*this.size, this.height*this.size)
    }
}

class Character{

}

function Render(){
    ctx.clearRect(0,0,canvasWidth,canvasHeight);
    console.log(window.innerWidth, window.innerHeight);
    ship.size = 1.27;
    ship.Draw();
    requestAnimationFrame(Render);
}