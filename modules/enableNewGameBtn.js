import { newGameBtn } from "./dom-elems.js";

class EnableNewGameBtn {
	constructor() {
		this.enableNewGameBtn();
	}
	enableNewGameBtn = () => {
		this.isGameEnd = true;

		if (this.isGameEnd) {
			newGameBtn.disabled = false;
		}
		newGameBtn.classList.remove("disabled");
	};
}

export { EnableNewGameBtn };
