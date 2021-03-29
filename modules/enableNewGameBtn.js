import { newGameBtn } from "./domElems.js";

// EnableNewGameBtn is called inside "resultBoxTransition.js" module.
class EnableNewGameBtn {
	constructor() {
		this.enableNewGameBtn();
	}

	// Function that enables newGameBtn
	enableNewGameBtn = () => {
		console.log("button enabled");
		newGameBtn.disabled = false;
		newGameBtn.classList.remove("disabled");
	};
}

export { EnableNewGameBtn };
