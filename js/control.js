$('#welcome').show();

$('.newgame').click(function () {
	setUpGame();
	$('.info').hide();

	$(allDOMHoles[0]).click(function () {
		playerChoice(0);
	}); //end click

	$(allDOMHoles[1]).click(function () {
		playerChoice(1);
	}); //end click

	$(allDOMHoles[2]).click(function () {
		playerChoice(2);
	}); //end click

	$(allDOMHoles[3]).click(function () {
		playerChoice(3);
	}); //end click

	$(allDOMHoles[4]).click(function () {
		playerChoice(4);
	}); //end click

	$(allDOMHoles[5]).click(function () {
		playerChoice(5);
	}); //end click

	$(allDOMHoles[6]).click(function () {
		playerChoice(6);
	}); //end click

	$(allDOMHoles[7]).click(function () {
		playerChoice(7);
	}); //end click

	$(allDOMHoles[8]).click(function () {
		playerChoice(8);
	}); //end click

	$(allDOMHoles[9]).click(function () {
		playerChoice(9);
	}); //end click

	$(allDOMHoles[10]).click(function () {
		playerChoice(10);
	}); //end click

	$(allDOMHoles[11]).click(function () {
		playerChoice(11);
	}); //end click

}); //end on
