class Terrain{
    static createModel(gl, keepRawData){ return new Model(Terrain.createMesh(gl, 100, 100, 100, 100, keepRawData)); }
    static createMesh(gl, w, h, rLen, cLen, keepRawData){
        var rStart = w / -2,        //Starting position for rows when calculating Z position
            cStart = h / -2,        //Starting position of column when calculating X position
            vLen = rLen * cLen,     //Total vertices needed to create plane
            iLen = (rLen-1)*cLen,   //Total index values needed to create the triangle strip (not counting degenerate tris)
            cInc = w / (cLen-1),    //Increment value for columns
            rInc = h / (rLen-1),    //Increment value for rows
            cRow = 0,               //Current row
            cCol = 0,               //Current column
            aVert = [],             //Vertice array
            aIndex = [],            //Index array
            aUV = [],               //UV map array
            uvxInc = 1/(cLen-1),    //Increment value for columns when calculating x UV position
            uvyInc = 1/(rLen-1);    //Increment value for rows when calculating z uv pos

        //Perlin Noise
        noise.seed(1);
        var h = 0,          //Temp height
            freq = 10,      //Freq on how to step through the noise
            maxHeight = -1.5; //Max height

        //Generate vertices
        for(var i=0; i<vLen; i++){
            cRow = Math.floor(i / cLen);    //Current row
            cCol = i % cLen;                //Current column
            h = noise.perlin2((cRow+1)/freq, (cCol+1)/freq) * maxHeight;

            //Create vertices, x, y, z
            aVert.push(cStart+cCol*cInc, 0.2 + h, rStart+cRow*rInc);

            aUV.push( (cCol == cLen-1)? 1 : cCol * uvxInc,
                    (cRow == rLen-1)? 1 : cRow * uvyInc );

            //Create the index, we stop creating the index before the loop ends
            if(i < iLen){
                //Column index of row R and R+1
                aIndex.push(cRow * cLen + cCol, (cRow+1) * cLen + cCol);

                //Create degenerate triangle, last AND first index of the R+1
                if(cCol == cLen-1 && i < iLen-1) aIndex.push( (cRow+1) * cLen + cCol, (cRow+1) * cLen );
            }
        }

        //..................................
		//Generate the Normals using finite difference method
		var x,					//X Position in grid
            y,					//Y Position in grid
            p,					//Temp Array Index when calcating neighboring vertices
            pos,				//Using X,Y, determine current vertex index position in array
            xMax = cLen-1,		//Max X Position in Grid
            yMax = rLen -1,		//Max Y Position in Grid
            nX = 0,				//Normal X value
            nY = 0,				//Normal Y value
            nZ = 0,				//Normal Z value
            nL = 0,				//Normal Vector Length
            hL,					//Left Vector height
            hR,					//Right Vector Height
            hD,					//Down Vector height
            hU,					//Up Vector Height
            aNorm = [];			//Normal Vector Array

        for(var i=0; i < vLen; i++){
            y = Math.floor(i / cLen);	//Current Row
            x = i % cLen;				//Current Column
            pos = y*3*cLen + x*3;		//X,Y position to Array index conversion

            //-----------------
            //Get the height value of 4 neighboring vectors: Left,Right,Top Left
            
            if(x > 0){ //LEFT
                p = y*3*cLen + (x-1)*3;	//Calc Neighbor Vector
                hL = aVert[p+1];		//Grab only the Y position which is the height.
            }else hL = aVert[pos+1];	//Out of bounds, use current 

            if(x < xMax){ //RIGHT
                p = y*3*cLen + (x+1)*3;
                hR = aVert[p+1];
            }else hR = aVert[pos+1];	

            if(y > 0){ //UP
                p = (y-1)*3*cLen + x*3;
                hU = aVert[p+1];
            }else hU = aVert[pos+1];

            if(y < yMax){ //DOWN
                p = (y+1)*3*cLen + x*3;
                hD = aVert[p+1];
            }else hD = aVert[pos+1];

            //-----------------
            //Calculate the final normal vector
            nX = hL - hR;
            nY = 2.0;
            nZ = hD - hU;
            nL = Math.sqrt( nX*nX + nY*nY + nZ*nZ);	//Length of vector						
            aNorm.push(nX/nL,nY/nL,nZ/nL);			//Normalize the final normal vector data before saving to array.
        }

        var mesh = gl.fCreateMeshVAO("Terrain", aIndex, aVert,aNorm,aUV,3);
        mesh.drawMode = gl.TRIANGLE_STRIP;

        if(keepRawData){//Have the option to save the data to use for normal debugging or modifying
            mesh.aVert = aVert;
            mesh.aNorm = aNorm;
            mesh.aIndex = aIndex;
        }

        return mesh;
    }
}