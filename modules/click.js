import { boxes, newGameBtn } from "./dom-elems.js";
import { LatestResults } from "./latest-results.js";

class Click {
	constructor(
		e,
		board,
		activePlayer,
		player1,
		player2,
		players,
		winningCombinations,
		latestResults
	) {
		(this.e = e),
			(this.board = board),
			(this.activePlayer = activePlayer),
			(this.player1 = player1),
			(this.player2 = player2),
			(this.players = players),
			(this.winningCombinations = winningCombinations),
			(this.latestResults = latestResults),
			this.click(this.e);
	}
	click = (e) => {
		e.target.classList.remove("board--box--hover");
		this.addBoxToBoard(e);
		this.pushBoxIntoPlayerArr(e, this.activePlayer[0]);
		this.checkPlayerArrLength(e);
	};

	addBoxToBoard = (e) => {
		const boxRow = e.target.dataset.row;
		const boxColumn = e.target.dataset.column;
		this.board[boxRow][boxColumn] = e.target.id;
	};

	pushBoxIntoPlayerArr = (e, player) => {
		player.arr.push(Number(e.target.id));
		e.target.textContent = `${player.mark}`;
	};

	checkPlayerArrLength = (e) => {
		if (this.player1.arr.length > 2 || this.player2.arr.length > 2) {
			this.checkForWinner(e);
		}
	};

	checkForWinner = (e) => {
		const player = this.activePlayer[0];
		this.findWinningCombination(player, e);
	};

	findWinningCombination = (player, e) => {
		for (let combination of this.winningCombinations) {
			if (combination.every((el) => player.arr.includes(el))) {
				this.setWinner(player, e);
				this.showWinningBoxes(combination);
				this.unlockNewGameBtn();
			}
		}
		this.checkDraw(); 
	};

	setWinner = (player) => {
		console.log(`${player.name} wygrał!`);
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
			this.player1.arr.length === 5 &&
			this.player2.arr.length === 4 &&
			this.player1.winner === false &&
			this.player2.winner === false
		) {
			console.log("it's a draw");
			const results = new LatestResults("", this.latestResults);
			this.unlockNewGameBtn();
		}
	};

	addWins = (player) => {
		player.winner = true;
		player.wins++;
		const results = new LatestResults(player, this.latestResults);
	};
}

export { Click };
