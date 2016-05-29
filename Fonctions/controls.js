	// Controls for camera
  	function handleMouseDown(event) {
    	mouseDown = true;
    	lastMouseX = event.clientX;
    	lastMouseY = event.clientY;
  	}

  	function handleMouseUp(event) {
    	mouseDown = false;
  	}

  	function handleMouseMove(event)
  	{
		if (!mouseDown) {
		  return;
		}
		var newX = event.clientX;
		var newY = event.clientY;
		var sensi = 0.0006;

		if(newX < lastMouseX)
		{
			camWidth+=degToRad(newX*sensi);
		}

		if(newX > lastMouseX)
		{
			camWidth-=degToRad(newX*sensi);
		}

		if(newY < lastMouseY)
		{
			camHeight+=degToRad(newY*sensi);
		}

		if(newY > lastMouseY)
		{
			camHeight-=degToRad(newY*sensi);
		}


		/*var newRotationMatrix = mat4.create();
		mat4.identity(newRotationMatrix);

		var deltaX = newX - lastMouseX;
		mat4.rotate(newRotationMatrix, degToRad(deltaX / 7), [0, 1, 0]);

		var deltaY = newY - lastMouseY;
		mat4.rotate(newRotationMatrix, degToRad(deltaY / 7), [1, 0, 0]);

		mat4.multiply(newRotationMatrix, userRotationMatrix, userRotationMatrix);*/

		lastMouseX = newX;
		lastMouseY = newY;

    }

    function handleWheel(event)
    {
		event.preventDefault();
    	currentZoom*=1+(event.wheelDelta/Math.abs(event.wheelDelta))/10;
    }

	function handleKeyDown(event)
    {
    	//console.log(event.keyCode);
    	event.preventDefault();
    	switch(event.keyCode)
    	{
			case 37: //left
					camX++;
					Stars.translate([-0.02,0,0]);
					break;
			case 39: //right
					camX--;
					Stars.translate([0.02,0,0]);
					break;
			case 38: //down
					camZ++;
					Stars.translate([0,0,-0.02]);
					break;
			case 40: //forward
					camZ--;
					Stars.translate([0,0,0.02]);
					break;
			case 33: //pageUp
					camHeight+=degToRad(1);
					break;
			case 34: //pageDown
					camHeight-=degToRad(1);
					break;
			default:
		}
    }

    function drawCombo(list)
	{
		drawStyle = list.selectedIndex;
	}

    function handleClick(checkMesh)
	{
		switch(checkMesh.value)
		{
			case 'triangle':
			        toggleTriangle = checkMesh.checked;
			        break;
			case 'square':
			        toggleSquare = checkMesh.checked;
			        break;
			case 'sphere':
			        toggleSphere = checkMesh.checked;
			        break;
			    default:
		}
	}

	function handleSlider1(sliderValue)
	{
		// à faire	
	}