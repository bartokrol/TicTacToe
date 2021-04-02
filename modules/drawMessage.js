import {
	endgameMessage,
	winnerAnnoucement,
	newGameBtn,
	resetBtn,
	winner,
} from "./domElems.js";

// DrawMessage is called inside "drawCheck.js" module.
class DrawMessage {
	constructor() {
		this.showDrawMessage();
	}

	// Function show draw message after game is drawn and then call new ResultBoxTransition
	showDrawMessage = () => {
		endgameMessage.textContent = "";
		winner.textContent = "It's a draw...";
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

export { DrawMessage };
