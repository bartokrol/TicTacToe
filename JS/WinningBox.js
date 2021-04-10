import { DomElems } from "./DomElems.js";

export class WinningBox extends DomElems {
	resultMessage = this.getElement(this.domElems.resultMessage);
	resultWinner = this.getElement(this.domElems.resultWinner);
	newGameBtn = this.getElement(this.domElems.newGameBtn);
	resetBtn = this.getElement(this.domElems.resetBtn);
	winnerAnnouncement = this.getElement(this.domElems.winnerAnnouncement);

	showWinningMessage = (player) => {
		this.resultMessage.textContent = player ? "Winner!" : "";
		this.resultWinner.textContent = player
			? `${player.name} ( ${player.mark} )`
			: "It's a draw...";
		this.showAndHideWinnerBox();
	};

	showAndHideWinnerBox = () => {
		this.resetBtn.disabled = true;
		this.resetBtn.classList.add("disabled");
		this.winnerAnnouncement.classList.remove("hidden");
		setTimeout(() => {
			this.enableNewGameBtn();
			this.resetBtn.disabled = false;
			this.resetBtn.classList.remove("disabled");
			this.winnerAnnouncement.classList.add("hidden");
		}, 3000);
	};

	enableNewGameBtn = () => {
		this.newGameBtn.disabled = false;
		this.newGameBtn.classList.remove("disabled");
	};
}
