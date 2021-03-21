import { boxes, resetBtn, newGameBtn, bodyOverflow } from "./dom-elems.js";
import { resetPageAfterResetBtn, resetPageAfterNewGameBtn } from "./reset.js";
import { Click } from "./click.js";
// import { FindActivePlayer } from "./find-active-player.js";
// import { EventListeners } from "./event-listeners.js";
import { EventListeners } from "./event-listeners.js";
import { FindActivePlayer } from "./findActivePlayer.js";

class Game {
	constructor(player1, player2) {
		(this.player1 = player1),
			(this.player2 = player2),
			(this.players = [this.player1, this.player2]),
			(this.activePlayer = null),
			(this.draws = 0),
			(this.isGameEnd = false),
			(this.board = [
				[null, null, null],
				[null, null, null],
				[null, null, null],
			]),
			(this.emptyBoxes = boxes.filter((box) => box.textContent == "")),
			(this.winningCombinations = [
				[1, 2, 3],
				[4, 5, 6],
				[7, 8, 9],
				[1, 4, 7],
				[2, 5, 8],
				[3, 6, 9],
				[1, 5, 9],
				[3, 5, 7],
			]),
			(this.latestResults = []);
	}

	// new StartNewGame(this.activePlayer, this.players);
	startNewGame = () => {
		this.activePlayer = new FindActivePlayer(
			this.activePlayer,
			this.players
		).activePlayer;
		new EventListeners(
			this.board,
			...this.activePlayer,
			this.player1,
			this.player2,
			this.players,
			this.draws,
			this.emptyBoxes,
			this.winningCombinations,
			this.latestResults
		).addEventListenersToEachBox();
	};

	checkPlayerArrLength = () => {
		if (this.player.arr.length > 2 || this.computer.arr.length > 2) {
			this.checkForWinner();
		}
	};

	checkForWinner = () => {
		const player = this.activePlayer[0];
		this.findWinningCombination(player);
	};

	findWinningCombination = (player) => {
		for (let combination of this.winningCombinations) {
			if (combination.every((el) => player.arr.includes(el))) {
				this.setWinner(player);
				this.showWinningBoxes(combination);
			}
		}
		this.checkDraw();
	};

	setWinner = (player) => {
		this.showWinningMessage(player);
		this.addWins(player);
	};

	showWinningBoxes = (combination) => {
		const winningArr = combination;

		boxes.forEach(function (box) {
			if (winningArr.includes(Number(box.id))) {
				box.classList.add("won");
			}
		});
	};

	unlockNewGameBtn = () => {
		this.isGameEnd = true;

		if (this.isGameEnd) {
			newGameBtn.disabled = false;
		}
	};

	checkDraw = () => {
		if (
			this.player.arr.length === 5 &&
			this.computer.arr.length === 4 &&
			this.player.winner === false &&
			this.computer.winner === false
		) {
			this.draws++;
			console.log(this.draws);
			resultDraws.textContent = this.draws;
			// const results = new LatestResults("", this.latestResults);
			resultDraws.textContent = this.showDrawMessage();
		}
	};

	addWins = (player) => {
		player.winner = true;
		player.wins++;
		if (player.name == "Player") {
			resultWins.textContent = player.wins;
		} else if (player.name == "Computer") {
			resultDefeats.textContent = player.wins;
		}

		// const results = new LatestResults(player, this.latestResults);
	};

	showDrawMessage = () => {
		endgameMessage.textContent = "";
		this.showAndHideWinnerBox();
		winner.textContent = "It's a draw...";
	};

	showWinningMessage = (player) => {
		endgameMessage.textContent = "Winner!";
		this.showAndHideWinnerBox();
		winner.textContent = `${player.name} ( ${player.mark} )`;
	};

	showAndHideWinnerBox = () => {
		resetBtn.disabled = true;
		winnerAnnoucement.classList.remove("hidden");
		setTimeout(() => {
			this.unlockNewGameBtn();
			resetBtn.disabled = false;
			winnerAnnoucement.classList.add("hidden");
			newGameBtn.classList.remove("disabled");
		}, 3000);
	};

	addEventListenersToEachBox = () => {
		boxes.forEach((box) => {
			box.addEventListener("mouseout", this.hideElementOnMouseOut);
			box.addEventListener("mouseover", this.showElementOnMouseOver);
			box.addEventListener("click", this.clickBox);
		});
		newGameBtn.addEventListener("click", () => {
			newGameBtn.classList.add("disabled");
			resetPageAfterNewGameBtn(
				this.player1,
				this.player2,
				this.players,
				this.board,
				this.activePlayer
			);
			this.emptyBoxes = boxes;
			const activePlayer = new FindActivePlayer(
				this.activePlayer,
				this.players
			);
			this.activePlayer = activePlayer.activePlayer;
			this.addEventListenersToEachBox();
		});
		resetBtn.addEventListener("click", () => {
			newGameBtn.classList.add("disabled");
			bodyOverflow.classList.add("body-hidden");
			resetPageAfterResetBtn(
				this.player1,
				this.player2,
				this.players,
				this.board
			);
		});
	};

	// clickBox = (e) => {
	// 	e.target.classList.remove("board--box--hover");
	// 	const click = new Click(
	// 		e,
	// 		this.board,
	// 		this.activePlayer,
	// 		this.player1,
	// 		this.player2,
	// 		this.players,
	// 		this.draws,
	// 		this.emptyBoxes,
	// 		this.winningCombinations,
	// 		this.latestResults
	// 	);
	// 	this.removeEventListeners(e.target);
	// 	this.changeActivePlayer();
	// 	const activePlayer = new FindActivePlayer(
	// 		this.activePlayer,
	// 		this.players
	// 	);
	// 	this.activePlayer = activePlayer.activePlayer;
	// 	console.log(activePlayer);
	// 	if (this.player1.winner || this.player2.winner) {
	// 		this.removeListenersForEachBox();
	// 	}
	// };

	removeListenersForEachBox = () => {
		boxes.forEach((box) => {
			this.removeEventListeners(box);
		});
	};

	removeEventListeners = (el) => {
		el.removeEventListener("click", this.clickBox);
		el.removeEventListener("mouseout", this.hideElementOnMouseOut);
		el.removeEventListener("mouseover", this.showElementOnMouseOver);
	};

	showElementOnMouseOver = (e) => {
		e.target.textContent = `${this.activePlayer[0].mark}`;
		e.target.classList.add("board--box--hover");
	};

	hideElementOnMouseOut = (e) => {
		e.target.textContent = "";
		e.target.classList.remove("board--box--hover");
	};

	changeActivePlayer = () => {
		this.player1.active = !this.player1.active;
		this.player2.active = !this.player2.active;
		this.activePlayer = this.players.filter((player) => player.active);
	};
}

export { Game };
