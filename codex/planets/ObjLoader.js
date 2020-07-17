class ObjLoader{
    static domToMesh(meshName, elmID, flipYUV, keepRawData){
        var d = ObjLoader.parseFromDom(elmID, flipYUV);
        var mesh =  gl.fCreateMeshVAO(meshName, d[0], d[1], d[2], d[3], 3);

        if(keepRawData){  //Have the option to save the data to use for normal debugging or modifying
            mesh.aIndex = d[0];
            mesh.aVert = d[1];
            mesh.aUV = d[2];
        }

        return mesh;
    }

    static parseFromDom(elmID, flipYUV){ return ObjLoader.parseObjText(document.getElementById(elmID).innerHTML, flipYUV); }

    static parseObjText(txt, flipYUV){
        txt = txt.trim() + "\n"; //Add newline to be able to access last line in the for loop

        var line,                   //Line text from obj file
            itm,                    //Line split into array
            ary,                    //Itm split into an array, used for face decoding
            i,
            ind,                    //Used to calc index of the cache arrays
            isQuad = true,         //Determine if face is a quad or not
            aCache = [],            //Cache Dictionary key = itm array element, val = final index of the vertice
            cVert = [],             //Cache vertice array read from obj
            cNorm = [],             //Cache normal array...
            cUV = [],               //Cache UV array...
            fVert = [],             //Final index sorted vertice array
            fNorm = [],             //...normal array
            fUV = [],               //...UV array
            fIndex = [],            //Final sorted index array
            fIndexCnt = 0,          //Final count of unique vertices
            posA = 0,
            posB = txt.indexOf("\n",0);

        while(posB > posA){
            line = txt.substring(posA,posB).trim();

            switch(line.charAt(0)){
                //Cache vertex data
                case "v":
                    itm = line.split(" "); itm.shift();
                    switch(line.charAt(1)){
                        case " ": cVert.push( parseFloat(itm[0]) , parseFloat(itm[1]) , parseFloat(itm[2]) ); break;
                        case "t": cUV.push( parseFloat(itm[0]) , parseFloat(itm[1]) ); break;
                        case "n": cNorm.push( parseFloat(itm[0]) , parseFloat(itm[1]) , parseFloat(itm[2]) ); break;
                    }
                break;

                //Process face data
                //All index values start at 1 in an obj file, but js starts at 0. So we need to always subtract 1 from intex to match them
                case "f":
                    itm = line.split(" ");
                    itm.shift();
                    isQuad = false;

                    for(i=0; i<itm.length; i++){
                        if(i == 3 && !isQuad){
                            i = 2;  //Last vertex in the first triangle is the start of the 2nd triangle in a quad
                            isQuad = true;
                        }

                        //Has this vertex been processed?
                        if(itm[i] in aCache){
                            fIndex.push( aCache[itm[i]] );  //It has, add its index to the list
                        }else{
                            //New unique vertex data, process it
                            ary = itm[i].split("/");

                            //Parse vertex data and save the final version ordered correctly by index
                            ind = (parseInt(ary[0]) - 1) * 3;
                            fVert.push( cVert[ind] , cVert[ind+1] , cVert[ind+2] );

                            //Parse normal data and save final
                            ind = (parseInt(ary[2])-1) * 3;
                            fNorm.push( cNorm[ind] , cNorm[ind+1] , cNorm[ind+2] );

                            //Parse texture data if available and save
                            if(ary[1] != ""){
                                ind = (parseInt(ary[1])-1) * 2;
                                fUV.push( cUV[ind],
                                    (!flipYUV)? cUV[ind+1] : 1-cUV[ind+1]
                                );
                            }

                            //Cache the vertex item value and its new index
                            //The idea is to create an index for each unique set of vertex data based on the face data
                            //So when the same item is found, just add the index value without duplicating vertex, normal, and texture
                            aCache[ itm[i] ] = fIndexCnt;
                            fIndex.push(fIndexCnt);
                            fIndexCnt++;
                        }

                        //In a quad, the last vertex of the second triangle is the first vertex in the first triangle.
                        if(i==3 && isQuad) fIndex.push( aCache[itm[0]] );
                    }
                break;
            }

            //Get ready to parse the next line
            posA = posB+1;
            posB = txt.indexOf("\n", posA);
        }

        return [fIndex, fVert, fNorm, fUV];
    }
}