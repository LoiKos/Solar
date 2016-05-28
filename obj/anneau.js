Anneau.prototype = new worldObject;
	function Anneau(parent)
	{
		this.base = worldObject;
		this.base(parent);
		var buffers = this.initBuffers();
		this.vertexPositionBuffer = buffers[0];
		this.vertexTextureCoordBuffer = buffers[1];
		this.vertexIndexBuffer = buffers[2];
		this.vertexNormalBuffer = buffers[3];
	}

	Anneau.prototype.initBuffers = function()
	{
		innerRad = 2;
		outterRad = 3;
		
		normalData = [];
		vertices = [];
		textureCoordData=[];
		index = [];
		
		nbIndex = 0;
		nbVertices = 0;
		
		for( i=0 ; i < 360 ; i += 10){
			
			x = Math.cos(i) ;
			y = 0 ;
			z = Math.sin(i) ;

			normalData.push(x);
			normalData.push(y);
			normalData.push(z);

			vertices.push(x * innerRad);
			vertices.push(y);
			vertices.push(z * innerRad);

			vertices.push(x * outterRad);
			vertices.push(y);
			vertices.push(z * outterRad);

			nbVertices += 2;
		}

		for( j=0 ; j <= vertices.length - 4 ; j += 4 ){
			
			index = index.concat([
				j,
				j+1,
				j+2,

				j + 1,
				j + 2,
				j + 3,
			]);

			nbIndex += 2;
		}

		console.log(index.length);
		console.log(index[323]);
		console.log(vertices.length);

		vertexPositionBuffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, vertexPositionBuffer);
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);
        vertexPositionBuffer.itemSize = 3;
        vertexPositionBuffer.numItems = nbVertices;

		vertexIndexBuffer = gl.createBuffer();
		gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, vertexIndexBuffer);
		gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(index), gl.STATIC_DRAW);
		vertexIndexBuffer.itemSize = 1;
		vertexIndexBuffer.numItems = index.length;

		vertexTextureCoordBuffer = gl.createBuffer();
		gl.bindBuffer(gl.ARRAY_BUFFER, vertexTextureCoordBuffer);
		gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(textureCoordData), gl.STATIC_DRAW);
		vertexTextureCoordBuffer.itemSize = 2;
		vertexTextureCoordBuffer.numItems = textureCoordData.length;
		
		// Buffer Normal
		vertexNormalBuffer = gl.createBuffer(); 
    	gl.bindBuffer(gl.ARRAY_BUFFER, vertexNormalBuffer);
    	gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(normalData), gl.STATIC_DRAW); 
    	vertexNormalBuffer.itemSize = 3; 
    	vertexNormalBuffer.numItems = normalData.length / 3;
		
		return [vertexPositionBuffer, vertexTextureCoordBuffer, vertexIndexBuffer, vertexNormalBuffer];
	}