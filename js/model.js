var allHoles = [];
var allDOMHoles = [];

var blueHoles = [];
var blueDOMHoles = [];

var redHoles = [];
var redDOMHoles = [];

var playerTurn = "blue";

var winner;

function Hole(stones, row, team) {
	this.stones = stones;
	this.row = row;
	this.team = team;
}

Array.prototype.move = function (from, to) {
  this.splice(to, 0, this.splice(from, 1)[0]);
};

function createBlueHoles() {
	var r = 1;
	var i = 0;
	while(i<5) {
		blueHoles[i] = new Hole(5, r, "blue");
		$( "<div class='hole blue' id='bh" + i + "'></div>" ).appendTo( "#blueholes" );
		var current = '#bh' + i;
		$(current).html(blueHoles[i].stones);
		r++;
		i++;
	}
	bigHole = new Hole(0, 'none', "blue");
	$( "<div class='hole blue' id='bhn'></div>" ).appendTo( "#firstsub" );
	blueHoles.push(bigHole);
}

function createRedHoles() {
	var r = 5;
	var i = 0;
	while(i<5) {
		redHoles[i] = new Hole(5, r, "red");
		$( "<div class='hole red' id='rh" + i + "'></div>" ).appendTo( "#redholes" );
		var current = '#rh' + i;
		$(current).html(redHoles[i].stones);
		r--;
		i++;
	}
	bigHole = new Hole(0, 'none', "red");
	$( "<div class='hole red' id='rhn'></div>" ).appendTo( "#thirdsub" );
	redHoles.push(bigHole);	
}

function setUpGame() {

	//set up the array of data
	createBlueHoles();
	createRedHoles();
	allHoles = allHoles.concat(blueHoles, redHoles);

	//set up the array of DOM elements the same way
	blueDOMHoles = $( ".hole.blue" ).toArray()
	blueDOMHoles.move(0, 5);

	redDOMHoles = $( ".hole.red" ).toArray()
	allDOMHoles = allDOMHoles.concat(blueDOMHoles, redDOMHoles);
	$('#turn').html("blue starts");
	console.log(allDOMHoles);
	console.log(allHoles);

}

function checkEnd() {
	if (allHoles[0].stones + allHoles[1].stones + allHoles[2].stones + allHoles[3].stones + allHoles[4].stones === 0) {
		var collectRedStones = allHoles[6].stones + allHoles[7].stones + allHoles[8].stones + allHoles[9].stones + allHoles[10].stones;
		allHoles[11].stones += collectRedStones;
		allHoles[6].stones = 0;
		allHoles[7].stones = 0;
		allHoles[8].stones = 0;
		allHoles[9].stones = 0;
		allHoles[10].stones = 0;
		checkWinner();
	} else if (allHoles[6].stones + allHoles[7].stones + allHoles[8].stones + allHoles[9].stones + allHoles[10].stones === 0) {
		var collectBlueStones = allHoles[0].stones + allHoles[1].stones + allHoles[2].stones + allHoles[3].stones + allHoles[4].stones;
		allHoles[5].stones += collectBlueStones;
		allHoles[0].stones = 0;
		allHoles[1].stones = 0;
		allHoles[2].stones = 0;
		allHoles[3].stones = 0;
		allHoles[4].stones = 0;
		checkWinner();
	}

}

//reset all values and remove holes
function resetGame() {
	$('.holecontainer').empty();
	$('#firstsub').empty();
	$('#thirdsub').empty();

	allHoles = [];
	allDOMHoles = [];

	blueHoles = [];
	blueDOMHoles = [];

	redHoles = [];
	redDOMHoles = [];

	playerTurn = "blue";

};

function checkWinner() {
	if (allHoles[5].stones > allHoles[11].stones) {
		$('#bluewins').show();
		resetGame();
	} else if (allHoles[5].stones < allHoles[11].stones) {
		$('#redwins').show();
		resetGame();
	} else {
		$('#draw').show();
		resetGame();
	}
}

function changeTurn() {
	playerTurn = playerTurn === "blue" ? "red" : "blue";
}

//update all the holes to display the right value
function updateAllHoles() {	
	for (k = 0; k < allHoles.length; k++) {
		$(allDOMHoles[k]).html(allHoles[k].stones);
	}
}

//player clicks a hole
function playerChoice(clicked) { 				
//clickedHole here is the index in the allHoles array of the hole that has been clicked

	$('#errors').html(" ").fadeIn(0);
	//cache clicked hole object once to always know where we started counting
	var clickedHole = allHoles[clicked];
	var $clickedDOMHole = $('allDOMHoles[clicked]');

	//check if clicked hole is playable by player
	if (clickedHole.team === playerTurn && clickedHole.stones !== 0 && clickedHole.row !== 'none') {
		//redistribute stones by iterating through array
		while (clickedHole.stones>0) {
			clicked++;

			//start array from beginning when at last object
			if (clicked >= allHoles.length) {
				clicked = 0;
			}

			//leave out hole with opposite team && row:'none'
			if (clickedHole.team === allHoles[clicked].team || allHoles[clicked].row !== 'none') { 
				allHoles[clicked].stones++;
				clickedHole.stones--;
				$clickedDOMHole.val(clickedHole.stones);
				$('allDOMHoles[clicked]').val(allHoles[clicked].stones);
			}

			//prepare hook for actions on last stone		
			if (clickedHole.stones === 0) {
				//cache hole with same row value but different team value as last stone (opposite hole)
				var oppositeHole = allHoles.filter(function(hole) {
					if (allHoles[clicked].row === hole.row && allHoles[clicked].team !== hole.team && hole.row !== 'none') {
						return true;
					}
				});
				oppositeHole = oppositeHole[0];

				//cache "score hole" with same team value as clicked hole and row value 'none'
				var scoreHole = allHoles.filter(function(hole) {
					if (clickedHole.team === hole.team && hole.row === 'none') {
						return true;
					}
				});
				scoreHole = scoreHole[0];
				
				//if last stone falls into "row:'none'", go again (no ternary here)
				if (allHoles[clicked].row === 'none') {
					$('#errors').html(playerTurn + " goes again").fadeOut(1700);
				//if alone on own side and opposite whole has at least one stone, add both those stones to active teams "row:'none'" hole
				} else if(allHoles[clicked].stones === 1 && oppositeHole.stones > 0 && allHoles[clicked].team === clickedHole.team) {
					scoreHole.stones += oppositeHole.stones;
					scoreHole.stones += allHoles[clicked].stones;
					oppositeHole.stones = 0;
					allHoles[clicked].stones = 0;
					changeTurn();
					$('#turn').html("it's " + playerTurn + "'s turn");
				} else {
					changeTurn();
					$('#turn').html("it's " + playerTurn + "'s turn");
				}

			}

			}
	checkEnd();
	updateAllHoles();
	} else {
		//put some kind of friendly error message here
		$('#errors').html("you can't play this hole").fadeOut(1700);
	}
}

