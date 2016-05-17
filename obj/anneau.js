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
		
		vertices = [ ];
        textureCoords = [];
		var indices = [];

		nbVertice = 0;
		for (i=0;i<=(Math.PI*2);i+=((Math.PI*2)/1000)){
			vertices.push(Math.sin(i)*3,Math.cos(i)*3,1);
			vertices.push(Math.sin(i)*5,Math.cos(i)*5,1);
			nbVertice+=2;
		}


		nbTriangles = 0;
		for (j=0;j<=nbVertice;j+=4){
			indices.push(
					vertices[j],
					vertices[j+1],
					vertices[j+2],

					vertices[j+1],
					vertices[j+2],
					vertices[j+3]
				)
			nbTriangles += 2;
		}

		console.log(j)
		console.log(nbTriangles);

		vertexPositionBuffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, vertexPositionBuffer);
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);
        vertexPositionBuffer.itemSize = 3;
        vertexPositionBuffer.numItems = nbVertice;

		vertexIndexBuffer = gl.createBuffer();
		gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, vertexIndexBuffer);
		gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(indices), gl.STATIC_DRAW);
		vertexIndexBuffer.itemSize = 1;
		vertexIndexBuffer.numItems = nbTriangles;

		vertexTextureCoordBuffer = gl.createBuffer();
		gl.bindBuffer(gl.ARRAY_BUFFER, vertexTextureCoordBuffer);
		gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(indices), gl.STATIC_DRAW);
		vertexTextureCoordBuffer.itemSize = 2;
		vertexTextureCoordBuffer.numItems = nbVertice;

		// Buffer Normal
		vertexNormalBuffer = gl.createBuffer(); 
    	gl.bindBuffer(gl.ARRAY_BUFFER, vertexNormalBuffer);
    	gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW); 
    	vertexNormalBuffer.itemSize = 3; 
    	vertexNormalBuffer.numItems = vertices.length;
				
		return [vertexPositionBuffer, vertexTextureCoordBuffer, vertexIndexBuffer, vertexNormalBuffer];
}