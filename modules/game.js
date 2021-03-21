import { Events } from "./event-listeners.js";
import { Click } from "./click.js";
import {
	boxes,
	resetBtn,
	newGameBtn,
	winnerAnnoucement,
	winner,
	bodyOverflow,
	endgameMessage,
	resultWins,
	resultDraws,
	resultDefeats,
} from "./dom-elems.js";
import { resetPageAfterResetBtn, resetPageAfterNewGameBtn } from "./reset.js";

class Game extends Events {
	constructor(player, computer) {
		super();
		(this.player = player),
			(this.computer = computer),
			(this.players = [this.player, this.computer]),
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

	startNewGame = () => {
		this.findActivePlayer();
		this.addEventListenersToEachBox();
	};

	findActivePlayer = () => {
		this.activePlayer = this.players.filter((player) => player.active);
		setTimeout(() => {
			// this.findComputerMove();
		}, 1000);
		console.log(this.activePlayer);
	};

	findComputerMove = () => {
		console.log("click");
		if (this.activePlayer.includes(this.computer)) {
			const click = new Click(
				this.emptyBoxes,
				this.player,
				this.computer,
				this.players,
				this.board,
				this.activePlayer
			);
			// this.setComputerMove();
		}
	};

	setComputerMove = () => {
		if (
			this.emptyBoxes.length > 0 &&
			!this.player.wins &&
			!this.computer.wins
		) {
			const randomBox = Math.floor(
				Math.random() * this.emptyBoxes.length
			);
			const box = this.emptyBoxes[randomBox];
			this.removeEventListeners(box);
			box.textContent = this.computer.mark;
			this.addBoxToBoard(box);
			this.pushBoxIntoActivePlayerArr(box, this.activePlayer[0]);
			this.filterEmptyBoxes();
			this.checkPlayerArrLength();
			this.changeActivePlayer();
		}
	};

	filterEmptyBoxes = () => {
		this.emptyBoxes = this.emptyBoxes.filter(
			(box) => box.textContent == ""
		);
	};

	addBoxToBoard = (box) => {
		const boxRow = box.dataset.row;
		const boxColumn = box.dataset.column;
		this.board[boxRow][boxColumn] = box.id;
	};

	pushBoxIntoActivePlayerArr = (box, player) => {
		player.arr.push(Number(box.id));
		box.textContent = `${player.mark}`;
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
				this.player,
				this.computer,
				this.players,
				this.board,
				this.activePlayer
			);
			this.emptyBoxes = boxes;
			this.findActivePlayer();
			this.addEventListenersToEachBox();
		});
		resetBtn.addEventListener("click", () => {
			newGameBtn.classList.add("disabled");
			bodyOverflow.classList.add("body-hidden");
			resetPageAfterResetBtn(
				this.player,
				this.computer,
				this.players,
				this.board
			);
		});
	};

	clickBox = (e) => {
		e.target.classList.remove("board--box--hover");
		// const click = new Click(
		// 	e,
		// 	this.board,
		// 	this.activePlayer,
		// 	this.player,
		// 	this.computer,
		// 	this.players,
		// 	this.winningCombinations,
		// 	this.latestResults
		// );
		this.removeEventListeners(e.target);
		if (this.player.winner || this.computer.winner) {
			this.removeListenersForEachBox();
		}
		this.changeActivePlayer();
		this.filterEmptyBoxes();
		this.findComputerMove();
	};

	changeActivePlayer = () => {
		this.player.active = !this.player.active;
		this.computer.active = !this.computer.active;
		this.activePlayer = this.players.filter((player) => player.active);
	};
}

export { Game };
