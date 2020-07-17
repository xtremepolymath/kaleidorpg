class Camera{

    constructor(gl, fov, near, far){

        this.projectionMatrix = new Float32Array(16);
        var ratio = gl.canvas.width / gl.canvas.height;
        Matrix4.perspective(this.projectionMatrix, fov || 45, ratio, near || 0.1, far || 100.0);

        this.transform = new Transform();
        this.viewMatrix = new Float32Array(16);

        this.mode = Camera.MODE_ORBIT;
    }

    panX(v){
        if(this.mode == Camera.MODE_ORBIT) return;
        this.updateViewMatrix();
        this.transform.position.x += this.transform.right[0] * v;
        this.transform.position.y += this.transform.right[1] * v;
        this.transform.position.z += this.transform.right[2] * v;
    }

    panY(v){
        this.updateViewMatrix();
        this.transform.position.y += this.transform.up[1] * v;
        if(this.mode == Camera.MODE_ORBIT) return;
        this.transform.position.x += this.transform.up[0] * v;
        this.transform.position.z += this.transform.up[2] * v;
    }

    panZ(v){
        this.updateViewMatrix();
        if(this.mode == Camera.MODE_ORBIT){
            this.transform.position.z += v;
        }
        else{
            this.transform.position.x += this.transform.forward[0] * v;
            this.transform.position.y += this.transform.forward[1] * v;
            this.transform.position.z += this.transform.forward[2] * v;
        }   
    }

    updateViewMatrix(){
        if(this.mode == Camera.MODE_FREE){
            this.transform.matView.reset()
                .vtranslate(this.transform.position)
                .rotateY(this.transform.rotation.y * Transform.deg2Rad)
                .rotateX(this.transform.rotation.x * Transform.deg2Rad);
        }
        else{
            this.transform.matView.reset()
                .rotateY(this.transform.rotation.y * Transform.deg2Rad)
                .rotateX(this.transform.rotation.x * Transform.deg2Rad)
                .vtranslate(this.transform.position);
        }

        this.transform.updateDirection();

        //Cameras work by doing the inverse trsnformation on all meshes, the camera itself is a lie!
        Matrix4.invert(this.viewMatrix, this.transform.matView.raw);
        return this.viewMatrix;
    }

    getTranslatelessMatrix(){
        var mat = new Float32Array(this.viewMatrix);
        mat[12] = mat[13] = mat[14] = 0.0;
        return mat;
    }
}

Camera.MODE_FREE = 0;
Camera.MODE_ORBIT = 1;

class CameraController{
    constructor(gl, camera){
        var oThis = this;
        var box = gl.canvas.getBoundingClientRect();
        this.canvas = gl.canvas;
        this.camera = camera;

        this.rotateRate = -300;
        this.panRate = 5;
        this.zoomRate = 200;

        this.offsetX = box.left;
        this.offsetY = box.top;

        this.initX = 0;
        this.initY = 0;
        this.prevX = 0;
        this.prevY = 0;

        this.onUpHandler = function(e){ oThis.onMouseUp(e); };
        this.onMoveHandler = function(e){ oThis.onMouseMove(e); };

        this.canvas.addEventListener("mousedown", function(e){ oThis.onMouseDown(e); });
        this.canvas.addEventListener("mousewheel", function(e){ oThis.onMouseWheel(e); });
    }

    //Transform mouse x,y coords to something useable by the canvas
    getMouseVec2(e){ return {x:e.pageX - this.offsetX, y:e.pageY - this.offsetY}; }

    //Begin listening for dragging movement
    onMouseDown(e){
        this.initX = this.prevX = e.pageX - this.offsetX;
        this.initY = this.prevY = e.pageY - this.offsetY;

        this.canvas.addEventListener("mouseup", this.onUpHandler);
        this.canvas.addEventListener("mousemove", this.onMoveHandler);
    }

    //End listening for dragging movement
    onMouseUp(e){
        this.canvas.removeEventListener("mouseup", this.onUpHandler);
        this.canvas.removeEventListener("mousemove", this.onMoveHandler);
    }

    onMouseWheel(e){
        var delta = Math.max(-1, Math.min(1, (e.wheelDelta || -e.detail))); //Try to map wheel movement to a number between -1 and 1
        this.camera.panZ(-delta * (this.zoomRate / this.canvas.height)); //Keep the movement speed the same no matter the height diff
    }

    onMouseMove(e){
        var x = e.pageX - this.offsetX,
            y = e.pageY - this.offsetY,
            dx = x - this.prevX,
            dy = y - this.prevY;

        if(!e.shiftKey){
            this.camera.transform.rotation.y += dx * (this.rotateRate / this.canvas.width);
            this.camera.transform.rotation.x += dy * (this.rotateRate / this.canvas.height);
        }
        else{
            this.camera.panX( -dx * (this.panRate / this.canvas.width) );
            this.camera.panY( dy * (this.panRate / this.canvas.height) );
        }

        this.prevX = x;
        this.prevY = y;
    }
}