import { resetBtn, winnerAnnoucement, newGameBtn } from "./domElems.js";
import { EnableNewGameBtn } from "./enableNewGameBtn.js";
class WinnerBoxTransition {
	constructor() {
		this.showAndHideWinnerBox();
	}
	showAndHideWinnerBox = () => {
		resetBtn.disabled = true;
		winnerAnnoucement.classList.remove("hidden");
		setTimeout(() => {
			new EnableNewGameBtn();
			resetBtn.disabled = false;
			winnerAnnoucement.classList.add("hidden");
		}, 3000);
	};
}

export { WinnerBoxTransition };
