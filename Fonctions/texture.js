	//TEXTURES
	function initTexture()
	{
		textureStars = gl.createTexture();
		textureStars.image = new Image();
		textureStars.image.onload = function()
		{
		  handleLoadedTexture(textureStars)
		}

		textureSun = gl.createTexture();
		textureSun.image = new Image();
		textureSun.image.onload = function()
		{
		  handleLoadedTexture(textureSun)
		}

		textureMercure = gl.createTexture();
		textureMercure.image = new Image();
		textureMercure.image.onload = function()
		{
		  handleLoadedTexture(textureMercure)
		}

		textureVenus = gl.createTexture();
		textureVenus.image = new Image();
		textureVenus.image.onload = function()
		{
		  handleLoadedTexture(textureVenus)
		}

		textureEarth = gl.createTexture();
		textureEarth.image = new Image();
		textureEarth.image.onload = function()
		{
		  handleLoadedTexture(textureEarth)
		}

		textureMoon = gl.createTexture();
		textureMoon.image = new Image();
		textureMoon.image.onload = function()
		{
		  handleLoadedTexture(textureMoon)
		}

		textureMars = gl.createTexture();
		textureMars.image = new Image();
		textureMars.image.onload = function()
		{
		  handleLoadedTexture(textureMars)
		}

		textureJupiter = gl.createTexture();
		textureJupiter.image = new Image();
		textureJupiter.image.onload = function()
		{
		  handleLoadedTexture(textureJupiter)
		}

		textureSaturne = gl.createTexture();
		textureSaturne.image = new Image();
		textureSaturne.image.onload = function()
		{
		  handleLoadedTexture(textureSaturne)
		}
		
		textureSaturne = gl.createTexture();
		textureSaturne.image = new Image();
		textureSaturne.image.onload = function()
		{
		  handleLoadedTexture(textureSaturne)
		}
		
		textureUranus = gl.createTexture();
		textureUranus.image = new Image();
		textureUranus.image.onload = function()
		{
		  handleLoadedTexture(textureUranus)
		}
		
		textureNeptune = gl.createTexture();
		textureNeptune.image = new Image();
		textureNeptune.image.onload = function()
		{
		  handleLoadedTexture(textureNeptune)
		}
 
		textureStars.image.src = "./img/stars.jpg";
		textureSun.image.src = "./img/sun.jpg";
		textureMercure.image.src = "./img/mercure.jpg"; 
	    textureVenus.image.src = "./img/venus.jpg"; 
		textureEarth.image.src = "./img/earth.jpg";
	    textureMoon.image.src = "./img/moon.gif"; 
		textureMars.image.src = "./img/mars.jpg"; 
		textureJupiter.image.src = "./img/jupiter.jpg";
		textureSaturne.image.src = "./img/saturn.png";
		textureUranus.image.src = "./img/uranus.jpg";
		textureNeptune.image.src = "./img/neptune.jpg";
  }

	function handleLoadedTexture(texture)
	{
		gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true);
		gl.bindTexture(gl.TEXTURE_2D, texture);
		gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, texture.image);
		gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
		gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR_MIPMAP_NEAREST);
		gl.generateMipmap(gl.TEXTURE_2D);
		gl.bindTexture(gl.TEXTURE_2D, null);
	}