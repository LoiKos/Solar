
//INITWORLD
function worldObject(parent)
{
	this.localTransformation = mat4.create();	//Matrice de translation
	this.orbitMat = mat4.create();				//Matrice d'orbite
	this.rotatMat = mat4.create();				//Matrice de rotation
	this.children = [];
	this.vertexPositionBuffer = null;
	this.vertexTextureCoordBuffer = null;
	this.vertexIndexBuffer = null;
	this.toggled = true;
	this.vertexNormalBuffer = null;
	this.texture = null;
	mat4.identity(this.localTransformation);
	mat4.identity(this.orbitMat);				//Matrice d'orbite
	mat4.identity(this.rotatMat);				//Matrice de rotation
	if(parent != null) parent.addChild(this);
	this.orbitParam=0;							//Vitesse de l'orbite
	this.rotatParam=0;							//Vitesse de rotation
}

worldObject.prototype.addChild = function(child)
{
	this.children.push(child);
}

worldObject.prototype.translate = function(translation)
{
	mat4.translate(this.localTransformation, translation);
}

worldObject.prototype.rotate = function(rotation, axis)
{
	mat4.rotate(this.rotatMat, rotation, axis);
}

worldObject.prototype.orbit = function(rotation, axis)
{
	mat4.rotate(this.orbitMat, rotation, axis);
}

worldObject.prototype.scale = function(scale)
{
	mat4.scale(this.localTransformation, scale);
}

worldObject.prototype.draw = function()
{
	if(this.toggled)
	{

		if(this.texture != null)
		{
			//gl.activeTexture(this.texture.getbind());
			gl.activeTexture(gl.TEXTURE0);
			gl.bindTexture(gl.TEXTURE_2D, this.texture);
			gl.uniform1i(shaderProgram.samplerUniform, this.texture.bindNumber);
		}
		
		mvPushMatrix();
		mat4.multiply(mvMatrix,this.orbitMat);					//Matrice d'orbite
		mat4.multiply(mvMatrix, this.localTransformation);
		mvPushMatrix();
		mat4.multiply(mvMatrix,this.rotatMat);					//Matrice de rotation


		gl.bindBuffer(gl.ARRAY_BUFFER, this.vertexPositionBuffer);
		gl.vertexAttribPointer(shaderProgram.vertexPositionAttribute, this.vertexPositionBuffer.itemSize, gl.FLOAT, false, 0, 0);

		gl.bindBuffer(gl.ARRAY_BUFFER, this.vertexTextureCoordBuffer);
		gl.vertexAttribPointer(shaderProgram.textureCoordAttribute, this.vertexTextureCoordBuffer.itemSize, gl.FLOAT, false, 0, 0);

		gl.bindBuffer(gl.ARRAY_BUFFER, this.vertexNormalBuffer);
		gl.vertexAttribPointer(shaderProgram.vertexNormalBuffer, this.vertexNormalBuffer.itemSize, gl.FLOAT, false, 0, 0);
		
		setMatrixUniforms();
		if(this.vertexIndexBuffer == null)
		{
			gl.drawArrays(drawStyle, 0, this.vertexPositionBuffer.numItems);
		}
		else
		{
			gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.vertexIndexBuffer);
			gl.drawElements(drawStyle, this.vertexIndexBuffer.numItems, gl.UNSIGNED_SHORT, 0);
		}

		mvPopMatrix();

		//draws children
		for(var i =0; i< this.children.length; i++)
		{
			this.children[i].draw();
		}
		mvPopMatrix();
	}
}

worldObject.prototype.animate = function(elapsedTime)
{
	//animate children
	for(var i =0; i< this.children.length; i++)
	{
		this.children[i].animate(elapsedTime);
	}
	this.orbit(this.orbitParam*0.00005*elapsedTime,[0,Math.PI,0]); // cette ligne est surement discutable comme animation par défaut!
	this.rotate(this.rotatParam*0.0005*elapsedTime,[0,Math.PI,0]);
}
