window.setTimeout(function(){
	var numSquares = 6;
	var colors = [];
	var pickedColor;
	var squares = document.getElementsByClassName("square");
	var colorDisplay = document.getElementById("colorDisplay");
	var messageDisplay = document.getElementById("message");
	var resetButton = document.getElementById("reset");
	var h1 = document.querySelector("h1");
	var modeButtons = document.querySelectorAll(".mode");

	init();

	function init(){
		// modeButtons envent listener
		setupModeButtons();

		setupSquares();
		
		reset();
	}

	function setupModeButtons(){
		for (var i = 0; i<modeButtons.length; i++){
			modeButtons[i].addEventListener("click", function(){
				modeButtons[0].classList.remove("selected");
				modeButtons[1].classList.remove("selected");
				this.classList.add("selected");
				this.textContent === "Easy" ? numSquares = 3: numSquares = 6;
				reset();
			});
		}
	}

	function setupSquares(){
		for (var i=0; i < squares.length; i++){
		// add click listener to square
			squares[i].addEventListener("click",function(){
				// grab color of picked square
				var clickedColor = this.style.backgroundColor;
				// compare color to pickedColor
				if(clickedColor === pickedColor){
				messageDisplay.textContent = "Correct";
					changeColors(clickedColor);
					h1.style.backgroundColor = pickedColor;
					resetButton.textContent = "PLAY AGAIN?";
				} else {
					this.style.backgroundColor = '#232323';
					messageDisplay.textContent = "Try Again"
				}
			});
		}
	}

	function reset(){
		// generate all new colors
		colors = generateRandomColors(numSquares);
		// pick a new random color from array
		pickedColor = pickColor();
		// change color display to match picked color
		colorDisplay.textContent = pickedColor;
		// change color of squares
		for (var i=0; i<squares.length; i++){
			if (colors[i]){
				squares[i].style.display = "block";
				squares[i].style.backgroundColor = colors[i];
			} else {
				squares[i].style.display = "none";
			}
		}
		// change backgroungColor of h1 to #232323
		h1.style.backgroundColor = "steelblue";
		// change messageDisplay
		messageDisplay.textContent = "";
		resetButton.textContent = "NEW COLORS";
	}

	resetButton.addEventListener("click",reset);

	function changeColors(color){
		// loop through all squares
		for (var i=0; i<colors.length; i++){
			// change each color to match given color
			squares[i].style.backgroundColor = color;
		}
	}

	function pickColor(){
		var random = Math.floor(Math.random()*colors.length);
		return colors[random];
	}

	function generateRandomColors(num){
		// make an array
		var arr = [];
		// add num random colors to array
		for (var i = 0; i < num; i++){
			// get random color and push into arr
			arr.push(randomColor());
		}
		// return that array
		return arr;
	}

	function randomColor(){
		// pick a red from 0 to 255
		var r = Math.floor(Math.random()*256);
		// pick a green from 0 to 255
		var g = Math.floor(Math.random()*256);
		// pick a blue from 0 to 255
		var b = Math.floor(Math.random()*256);
		return "rgb("+r+", "+g+", "+b+")";
	}

},100);
