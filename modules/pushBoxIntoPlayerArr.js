class PushBoxIntoPlayerArr {
	constructor(box, player) {
		(this.box = box), (this.player = player);
		this.pushBoxIntoPlayerArr(box, player);
	}

	pushBoxIntoPlayerArr = (box, player) => {
		player.arr.push(Number(box.id));
		box.textContent = `${player.mark}`;
		console.log(player.arr);
	};
}

export { PushBoxIntoPlayerArr };
