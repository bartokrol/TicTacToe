import { DomElems } from "./DomElems.js";

export class Box extends DomElems {
	constructor(dataRow, dataColumn, id) {
		super();
		(this.dataRow = dataRow),
			(this.dataColumn = dataColumn),
			(this.id = id),
			(this.selector = `[data-row="${this.dataRow}"][data-column="${this.dataColumn}"]`);
	}

	element = null;
	mark = null;

	createBox() {
		const element = `<div class="game-container__board-container__box board--box" data-row=${this.dataRow} data-column=${this.dataColumn} id=${this.id}></div>`;
		return element;
	}
}
