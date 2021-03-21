// import { boxes, resetBtn, newGameBtn, bodyOverflow } from "./dom-elems.js";
// import { resetPageAfterResetBtn, resetPageAfterNewGameBtn } from "./reset.js";
// import { PlayerClick } from "./player-click.js";
// import { BoxClick } from "./box-click.js";

class Events {
	constructor() {}
	removeListenersForEachBox = () => {
		boxes.forEach((box) => {
			this.removeEventListeners(box);
		});
	};

	removeEventListeners = (el) => {
		el.removeEventListener("click", this.clickBox);
		el.removeEventListener("mouseout", this.hideElementOnMouseOut);
		el.removeEventListener("mouseover", this.showElementOnMouseOver);
	};

	showElementOnMouseOver = (e) => {
		e.target.textContent = `${this.activePlayer[0].mark}`;
		e.target.classList.add("board--box--hover");
	};

	hideElementOnMouseOut = (e) => {
		e.target.textContent = "";
		e.target.classList.remove("board--box--hover");
	};
}

export { Events };
