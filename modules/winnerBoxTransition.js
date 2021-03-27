import { resetBtn, winnerAnnoucement } from "./domElems.js";
import { EnableNewGameBtn } from "./enableNewGameBtn.js";

// WinnerBoxTransition is called inside "drawMessage.js" module.
class WinnerBoxTransition {
	constructor() {
		this.showAndHideWinnerBox();
	}

	// Function that add winnerAnnoucement class and then remove it after 3 seconds. After that time "EnableNewGameBtn" class is called.
	showAndHideWinnerBox = () => {
		resetBtn.disabled = true;
		resetBtn.classList.add("disabled");
		winnerAnnoucement.classList.remove("hidden");
		setTimeout(() => {
			new EnableNewGameBtn();
			resetBtn.disabled = false;
			resetBtn.classList.remove("disabled");
			winnerAnnoucement.classList.add("hidden");
		}, 3000);
	};
}

export { WinnerBoxTransition };
