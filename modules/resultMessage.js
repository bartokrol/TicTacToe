import {
	endgameMessage,
	winnerAnnoucement,
	newGameBtn,
	resetBtn,
	winner,
} from "./domElems.js";

// ResultMessage is called inside "setWinner.js" module.
class ResultMessage {
	constructor(activePlayer) {
		(this.activePlayer = activePlayer),
			this.showWinningMessage(this.activePlayer);
	}

	// Function shows specific message to winningContainers after winner is set
	showWinningMessage = (player) => {
		endgameMessage.textContent = "Winner!";
		winner.textContent = `${player.name} ( ${player.mark} )`;
		this.showAndHideWinnerBox();
	};

	// Function that add winnerAnnoucement class and then remove it after 3 seconds. After that time "EnableNewGameBtn" class is called.
	showAndHideWinnerBox = () => {
		resetBtn.disabled = true;
		resetBtn.classList.add("disabled");
		winnerAnnoucement.classList.remove("hidden");
		setTimeout(() => {
			this.enableNewGameBtn();
			resetBtn.disabled = false;
			resetBtn.classList.remove("disabled");
			winnerAnnoucement.classList.add("hidden");
		}, 3000);
	};

	enableNewGameBtn = () => {
		newGameBtn.disabled = false;
		newGameBtn.classList.remove("disabled");
	};
}

export { ResultMessage };
