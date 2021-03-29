import { newGameBtn } from "./domElems.js";

// EnableNewGameBtn is called inside "resultBoxTransition.js" module.
class EnableNewGameBtn {
	constructor() {
		this.enableNewGameBtn();
	}

	// Function that enables newGameBtn
	enableNewGameBtn = () => {
		newGameBtn.disabled = false;
		newGameBtn.classList.remove("disabled");
	};
}

export { EnableNewGameBtn };
