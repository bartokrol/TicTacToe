import { boxes } from "./domElems.js";
import { resultWins, resultDefeats } from "./domElems.js";

// Click class is called inside module - "setEventListeners.js"
class Click {
	constructor() {
		// box,
		// board,
		// activePlayer,
		// player,
		// computer,
		// players,
		// draws,
		// isGameEnd,
		// emptyBoxes,
		// winningCombinations,
		// latestResults
		// (this.box = box),
		// 	(this.board = board),
		// 	(this.activePlayer = activePlayer),
		// 	(this.player = player),
		// 	(this.computer = computer),
		// 	(this.players = players),
		// 	(this.draws = draws),
		this.isGameEnd = false;
		// 	(this.emptyBoxes = emptyBoxes),
		// 	(this.winningCombinations = winningCombinations),
		// 	(this.latestResults = latestResults),
		// 	this.click();
	}

	// Function firstly filters for empty boxes on the board, then set which box is going to be filled with computer.mark
	// After computer "click" the classes that can be seen below are called
	click = (box, activePlayer, winningCombinations) => {
		// this.setBoxIntoPlayerArr(box, activePlayer);
		this.findWinningPlayer(activePlayer, winningCombinations);
		return this.isGameEnd;
	};

	// Clicked element is send into the player array.
	// setBoxIntoPlayerArr = (box, player) => {
	// 	player.arr.push(Number(box.id));
	// 	box.textContent = `${player.mark}`;
	// };

	// findWinningPlayer = (player, winningCombinations) => {
	// 	for (let combination of winningCombinations) {
	// 		if (combination.every((el) => player.arr.includes(el))) {
	// 			this.isGameEnd = true;
	// 			this.addPlayerWins(player);
	// 			this.showWinningPlayersMarks(combination);
	// 			return;
	// 		}
	// 	}
	// };

	// addPlayerWins = (player) => {
	// 	player.winner = true;
	// 	player.wins++;
	// 	if (player.name == "Player") {
	// 		resultWins.textContent = player.wins;
	// 	} else if (player.name == "Computer") {
	// 		resultDefeats.textContent = player.wins;
	// 	}
	// };

	showWinningPlayersMarks = (combination) => {
		const winningArr = combination;

		boxes.forEach((box) => {
			if (winningArr.includes(Number(box.id))) {
				box.classList.add("won");
			}
		});
	};

	resetPageAfterResetBtn(player, computer, draws, players) {
		resetPlayersWins(player, computer, draws);
		resetPlayers(player, computer);
		resetPlayersArr(players);
	}

	resetPageAfterNewGameBtn(player, computer, players) {
		resetPlayers(player, computer);
		resetPlayersForNewGame(player, computer);
		resetPlayersArr(players);
	}

	// Function that resets player and computer wins and draws number
	resetPlayersWins = (player, computer, draws) => {
		player.wins = 0;
		computer.wins = 0;
		draws = 0;
	};

	//
	resetPlayers = (player, computer) => {
		player.active = false;
		computer.active = false;
		player.winner = false;
		computer.winner = false;
	};

	resetPlayersForNewGame = (player, computer) => {
		player.mark === "X"
			? (player.active = true) && (computer.active = false)
			: (computer.active = true) && (player.active = false);
	};

	// Function that reset the each players array
	resetPlayersArr = (players) => {
		for (let player of players) {
			player.arr = [];
		}
	};
}

export { Click };
