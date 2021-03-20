import { boxes, resetBtn, newGameBtn, bodyOverflow } from "./dom-elems.js";
import { resetPageAfterResetBtn, resetPageAfterNewGameBtn } from "./reset.js";
import { Click } from "./click.js";
import { Events } from "./event-listeners.js";

class Game extends Events {
	constructor(player, computer) {
		super();
		(this.player = player),
			(this.computer = computer),
			(this.players = [this.player, this.computer]),
			(this.activePlayer = null),
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
	};

	findActivePlayer = () => {
		this.activePlayer = this.players.filter((player) => player.active);
		setTimeout(() => {
			this.addEventListenersToEachBox();
			this.findComputerMove();
		}, 1000);
	};

	findComputerMove = () => {
		if (this.activePlayer.includes(this.computer)) {
			this.setComputerMove();
		}
	};

	setComputerMove = () => {
		const randomBox = Math.floor(Math.random() * this.emptyBoxes.length);
		const box = this.emptyBoxes[randomBox];
		this.removeEventListeners(box);
		box.textContent = this.computer.mark;
		this.addBoxToBoard(box);
		this.pushBoxIntoPlayerArr(box, this.activePlayer[0]);
		this.changeActivePlayer();
		this.filterEmptyBoxes();
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

	pushBoxIntoPlayerArr = (box, player) => {
		player.arr.push(Number(box.id));
		box.textContent = `${player.mark}`;
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
			this.findActivePlayer();
			setTimeout(() => this.addEventListenersToEachBox(), 1500);
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
		const click = new Click(
			e,
			this.board,
			this.activePlayer,
			this.player,
			this.computer,
			this.players,
			this.winningCombinations,
			this.latestResults
		);
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
