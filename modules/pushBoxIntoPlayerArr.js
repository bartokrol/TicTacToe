// PushBoxIntoPlayerArr is called in "computerClick.js" and "playerClick.js" modules
class PushBoxIntoPlayerArr {
	constructor(box, player) {
		(this.box = box), (this.player = player);
		this.pushBoxIntoPlayerArr(box, player);
	}

	// Clicked element is send into the player array.
	pushBoxIntoPlayerArr = (box, player) => {
		player.arr.push(Number(box.id));
		box.textContent = `${player.mark}`;
	};
}

export { PushBoxIntoPlayerArr };
