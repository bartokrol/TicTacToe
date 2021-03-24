import { newGameBtn } from "./dom-elems.js";

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
