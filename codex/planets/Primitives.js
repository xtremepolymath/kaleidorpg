var Primitives = {};

Primitives.Cube = class {
    static createModel(gl, name){ return new Model(Primitives.Cube.createMesh(gl,name || "Cube", 1, 1, 1, 0, 0, 0)); }
    static createMesh(gl, name, width, height, depth, x, y, z){
        var w = width*0.5, h = height*0.5, d = depth*0.5;
		var x0 = x-w, x1 = x+w, y0 = y-h, y1 = y+h, z0 = z-d, z1 = z+d;

        //Starting bottom left corner, then working counter clockwise to create the front face
        //Keep each quad face built the same way to make index and uv easier to assign
        var aVert = [
			x0, y1, z1, 0,	//0 Front
			x0, y0, z1, 0,	//1
			x1, y0, z1, 0,	//2
			x1, y1, z1, 0,	//3 

			x1, y1, z0, 1,	//4 Back
			x1, y0, z0, 1,	//5
			x0, y0, z0, 1,	//6
			x0, y1, z0, 1,	//7 

			x0, y1, z0, 2,	//7 Left
			x0, y0, z0, 2,	//6
			x0, y0, z1, 2,	//1
			x0, y1, z1, 2,	//0

			x0, y0, z1, 3,	//1 Bottom
			x0, y0, z0, 3,	//6
			x1, y0, z0, 3,	//5
			x1, y0, z1, 3,	//2

			x1, y1, z1, 4,	//3 Right
			x1, y0, z1, 4,	//2 
			x1, y0, z0, 4,	//5
			x1, y1, z0, 4,	//4

			x0, y1, z0, 5,	//7 Top
			x0, y1, z1, 5,	//0
			x1, y1, z1, 5,	//3
			x1, y1, z0, 5	//4
        ];
        
        //Build the index of each quad [0,1,2, 2,3,0]
		var aIndex = [];
		for(var i=0; i < aVert.length / 4; i+=2) aIndex.push(i, i+1, (Math.floor(i/4)*4)+((i+2)%4));

		//Build UV data for each vertex
		var aUV = [];
		for(var i=0; i < 6; i++) aUV.push(0,0,	0,1,  1,1,  1,0);

		//Build Normal data for each vertex
		var aNorm = [
			 0, 0, 1,	 0, 0, 1,	 0, 0, 1,	 0, 0, 1,		//Front
			 0, 0,-1,	 0, 0,-1,	 0, 0,-1,	 0, 0,-1,		//Back
			-1, 0, 0,	-1, 0, 0,	-1, 0,0 ,	-1, 0, 0,		//Left
			 0,-1, 0,	 0,-1, 0,	 0,-1, 0,	 0,-1, 0,		//Bottom
			 1, 0, 0,	 1, 0, 0,	 1, 0, 0,	 1, 0, 0,		//Right
			 0, 1, 0,	 0, 1, 0,	 0, 1, 0,	 0, 1, 0		//Top
		]

        var mesh = gl.fCreateMeshVAO(name ,aIndex,aVert,aNorm,aUV,4);
        mesh.noCulling = true;
		return mesh;
    }
}

Primitives.Quad = class {
    static createModel(gl){ return new Model(Primitives.Quad.createMesh(gl)); }
    static createMesh(gl){
        var aVert = [ -0.5,0.5,0, -0.5,-0.5,0, 0.5,-0.5,0, 0.5,0.5,0 ],
            aUV = [ 0,0, 0,1, 1,1, 1,0 ],
            aIndex = [ 0,1,2, 2,3,0 ];
        
        var mesh = gl.fCreateMeshVAO("Quad", aIndex, aVert, null, aUV);
        mesh.noCulling = true;
        mesh.doBlending = true;
        return mesh;
    }
}

Primitives.MultiQuad = class {

    static createModel(gl){ return new Model(Primitives.MultiQuad.createMesh(gl)); }
    static createMesh(gl){

        var aIndex = [ ],
            aUV = [ ],
            aVert = [];

        for( var i = 0; i < 100; i++){
            //Calculate a random size, y rotation, and position for the quad
            var size = 0.2 + (0.8 * Math.random()),
                half = size * 0.5,
                angle = Math.PI * 2 * Math.random(),
                dx = half * Math.cos(angle),
                dy = half * Math.sin(angle),
                x = -2.5 + (Math.random() * 5),
                y = half,
                z = 2.5 - (Math.random() * 5),
                p = i * 4;  //Index of the first vertex of the quad

            //Build the 4 points of the quad
            aVert.push(x-dx, y+half, z-dy);
            aVert.push(x-dx, y-half, z-dy);
            aVert.push(x+dx, y-half, z+dy);
            aVert.push(x+dx, y+half, z+dy);

            aUV.push(0,0, 0,1, 1,1, 1,0);
            aIndex.push(p, p+1, p+2, p+2, p+3, p);
        }

        var mesh = gl.fCreateMeshVAO("MultiQuad", aIndex, aVert, null, aUV);
        mesh.noCulling = true;
        mesh.doBlending = true;
        return mesh;
    }

}

Primitives.GridAxis = class {
    static createModel(gl, incAxis){ return new Model(Primitives.GridAxis.createMesh(gl, incAxis)); }
    static createMesh(gl, incAxis){
        //Dynamically create a grid
        var verts = [],
            size = 4,           //W/H of outer box of grid. From origin can only go 1 unit in each direction, so 2 is max size
            div = 20.0,         //How to divide up the grid
            step = size / div,  //Steps between each line
            half = size / 2;    //From origin, the starting position is half the size

        var p;  //Temp variable for position value
        for(var i=0; i <= div; i++){
            //vertical line
            p = -half + (i * step);
            verts.push(p);      //x1
            verts.push(0);      //y1
            verts.push(half);   //z1
            verts.push(0);      //c1

            verts.push(p);      //x2
            verts.push(0);      //y2
            verts.push(-half);  //z2
            verts.push(0);      //c2

            //Horizontal line
            p = half - (i * step);
            verts.push(-half);  //x1
            verts.push(0);      //y1
            verts.push(p);      //z1
            verts.push(0);      //c1

            verts.push(half);   //x2
            verts.push(0);      //y2
            verts.push(p);      //z2
            verts.push(0);      //c2
        }

        if(incAxis){
            //X-Axis
            verts.push(-half * 1.1);   //x1
            verts.push(0);      //y1
            verts.push(0);      //z1
            verts.push(1);      //c1

            verts.push(half * 1.1);    //x2
            verts.push(0);      //y2
            verts.push(0);      //z2
            verts.push(1);      //c2

            //y-Axis
            verts.push(0);      //x1
            verts.push(-half * 1.1);   //y1
            verts.push(0);      //z1
            verts.push(2);      //c1

            verts.push(0);      //x2
            verts.push(half*1.1);    //y2
            verts.push(0);      //z2
            verts.push(2);      //c2

            //z-axis
            verts.push(0);      //x1
            verts.push(0);      //y1
            verts.push(-half*1.1);   //z1
            verts.push(3);      //c1

            verts.push(0);      //x2
            verts.push(0);      //y2
            verts.push(half*1.1);    //z2
            verts.push(3);      //c2

        }

        var attrColorLoc = 4,
            strideLen,
            mesh = { drawMode:gl.LINES, vao:gl.createVertexArray() };

        //Do some math
        mesh.vertexComponentLen = 4;
        mesh.vertexCount = verts.length / mesh.vertexComponentLen;
        strideLen = Float32Array.BYTES_PER_ELEMENT * mesh.vertexComponentLen; //Stride length is the vertex size for the buffer in bytes
    
        //Setup our buffer
        mesh.bufVertices = gl.createBuffer();
        gl.bindVertexArray(mesh.vao);
        gl.bindBuffer(gl.ARRAY_BUFFER, mesh.bufVertices);
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(verts), gl.STATIC_DRAW);
        gl.enableVertexAttribArray(ATTR_POSITION_LOC);
        gl.enableVertexAttribArray(attrColorLoc);

        gl.vertexAttribPointer(
            ATTR_POSITION_LOC,              //Attribute location
            3,                              //How big is the vector by number count?
            gl.FLOAT,                       //What type of number?
            false,                          //Does it need to be normalized?
            strideLen,                      //How many pieces of data per chunk?
            0                               //Offset by how much?
        );

        gl.vertexAttribPointer(
            attrColorLoc,                   //Next attribute location
            1,                              //Just a single float
            gl.FLOAT,                           
            false,
            strideLen,
            Float32Array.BYTES_PER_ELEMENT * 3
        );

        //Cleanup and finalize
        gl.bindVertexArray(null);
        gl.bindBuffer(gl.ARRAY_BUFFER, null);
        gl.mMeshCache["grid"] = mesh;
        return mesh;
    }
}