class RenderLoop{
    constructor(callback, fps){
        var oThis = this;
        this.msLastFrame = null;    //The time in milliseconds of the last frame
        this.callBack = callback;   //What function to call each frame
        this.isActive = false;      //Control the on/off state of the render loop
        this.fps = 0;               //Save the value of how fast the loop is going,

        if(fps != undefined && fps > 0){ //Build a run function that limits fps
            this.msFpsLimit = 1000/fps; //Calc how many milliseconds per frame in one second of time

            this.run = function(){
                //Calculate the delta time between frames and the current fps
                var msCurrent   = performance.now(),
                    msDelta     = (msCurrent - oThis.msLastFrame),
                    deltaTime   = msDelta / 1000.0;  //What fraction of a single second is the delta time

                if(msDelta >= oThis.msFpsLimit){ //Now execute frame since time has elapsed
                    oThis.fps                   = Math.floor(1/deltaTime);
                    oThis.msLastFrame           = msCurrent;
                    oThis.callBack(deltaTime);
                }

                if(oThis.isActive) window.requestAnimationFrame(oThis.run);
            }
        } 
        
        else{ //Else build a run function that is as optimized as possible
            this.run = function(){
                var msCurrent   = performance.now(),
                    deltaTime   = (msCurrent - oThis.msLastFrame) / 1000.0;

                oThis.fps           = Math.floor(1/deltaTime);
                oThis.msLastFrame   = msCurrent;

                oThis.callBack(deltaTime);
                if(oThis.isActive) window.requestAnimationFrame(oThis.run);
            }
        }
    } 

    start(){
        this.isActive = true;
        this.msLastFrame = performance.now();
        window.requestAnimationFrame(this.run);
        return this;
    }

    stop(){this.isActive = false}
}