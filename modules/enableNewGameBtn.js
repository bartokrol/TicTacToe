import { newGameBtn } from "./domElems.js";

class EnableNewGameBtn {
	constructor() {
		this.enableNewGameBtn();
	}
	enableNewGameBtn = () => {
		newGameBtn.disabled = false;
		newGameBtn.classList.remove("disabled");
	};
}

export { EnableNewGameBtn };
