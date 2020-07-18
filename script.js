// images
var inners = document.getElementsByClassName("flip-card-inner");
let clickedImages = [];
let clickedCount = 0;

function disable() {
	for (i of inners) {
		i.classList.add("disable");
	}
}
function enable() {
	for (i of inners) {
		i.classList.remove("disable");
	}
}

function matched() {
	resetMistakes();
	pointCounter();
	clickedImages[0].classList.add("matched");
	clickedImages[1].classList.add("matched");
	clickedImages = [];
}

function notMatched() {
	mistakeCounter();
	disable();
	setTimeout(function () {
		clickedImages[0].classList.remove("show");
		clickedImages[1].classList.remove("show");
		enable();
		clickedImages = [];
	}, 1500);
}

// when any box is clicked, this function works
for (var i = 0; i < inners.length; i++) {
	inners[i].addEventListener("click", function () {
		// when a card was clicked, start timer function
		if (!onTimer) {
			startTimer();
		}

		// when we clicked to box, we add "show" class to is classes, and we check here that if it is clicked or not. if it is clicked we can not change it, if it is not clicked we give it "show" class value
		if (!this.classList.contains("show")) {
			this.classList.add("show");
			// save clicked images in clickedImages array
			clickedImages.push(this);
			// we have only 2 box to click
			clickedCount++;
		}
		// if we clicked 2 boxes, we need to compare them
		if (clickedCount != 0 && clickedCount % 2 === 0) {
			//check clicked cards, they are matched or not
			if (clickedImages[0].querySelector(".image").getAttribute(`src`) === clickedImages[1].querySelector(".image").getAttribute(`src`)) {
				// if they are matched, call matched function
				matched();
			} else {
				// if they are not matched, call notMatched function
				notMatched();
			}
		}
	});
}

// set randomly images to game boxes
images = document.getElementsByClassName("image");
// self-invoked function, so when we open the page it set the images automatically
function setRandomImages() {
	let numbers = [-1];
	let random = -1;
	let count = 0;
	// we have 4x4 = 16 image boxes, but we need half of it times different images
	for (let i = 1; i <= images.length / 2; i++) {
		// we need two box number to set our images
		while (count < 2) {
			// box number should not be used before for different images
			while (0 <= numbers.indexOf(random)) {
				random = Math.floor(Math.random() * 16);
			}
			// we are adding our new and different box numbers to array
			// we user unshift method, because working with index 0 and 1 is easier than the last 2 index
			numbers.unshift(random);
			count++;
		}
		// we reset the randomly generated box number count
		count = 0;
		// we saved all images like "image${number}.png" so it is easier to call them with changing i value
		images[numbers[0]].src = "images/image" + i + ".png";
		images[numbers[1]].src = "images/image" + i + ".png";
	}
}

// declaring mistake variable
let mistakes = 0;

// count the player's mistakes
function mistakeCounter() {
	mistakes++;
	if (mistakes == 4) {
		//reset points to zero
		resetPoints();
		// reset mistakes
		mistakes = 0;
	}
}

// reset the  player's mistakes
function resetMistakes() {
	mistakes = 0;
}

// declaring points variable
let points = 0;
let matchCounter = 0;

// count player's points
function pointCounter() {
	points += 12.5;
	matchCounter++;
	setScore(points);

	if (matchCounter === 8) {
		clearInterval(interval);
		setTimeout(function () {
			alert(`Wawwww you finished at ${time} !!! \n Your score is ${points}`);
		}, 1000);
	}
}
// reset player's points
function resetPoints() {
	points = 0;
	setScore(points);
}

// set score value
function setScore(points) {
	document.getElementById("points").innerHTML = points;
}

// Timer
var second = 0,
	minute = 0,
	time = "";
var onTimer = false;
var interval;
var timer = document.getElementsByClassName("timer")[0];
function startTimer() {
	onTimer = true;
	interval = setInterval(function () {
		time = getTimeFormat(minute) + ":" + getTimeFormat(second);
		timer.innerHTML = time;
		second++;
		if (second == 60) {
			minute++;
			second = 0;
		}
	}, 1000);
}
// format time counter as 00:00
function getTimeFormat(time) {
	if (time < 10) {
		return "0" + time;
	}
	return time;
}

// @description shuffles cards when page is refreshed / loads
document.body.onload = startGame();

// @description function to start a new play
function startGame() {
	clickedImages = [];
	clickedCount = 0;
	matchCounter = 0;

	// remove all exisiting classes from each card
	for (var i = 0; i < inners.length; i++) {
		inners[i].classList.remove("show", "matched", "disable");
	}
	// reset moves
	resetMistakes();
	// reset score
	resetPoints();

	// set randomly cards
	setTimeout(function () {
		setRandomImages();
	}, 500);

	//reset timer
	second = 0;
	minute = 0;
	clearInterval(interval);
	timer.innerHTML = "00:00";
	onTimer = false;
}

// restart the game
var restart = document.getElementsByClassName("restart")[0];
restart.addEventListener("click", function () {
	startGame();
});
