import { resultDraws } from "./domElems.js";
import { DrawMessage } from "./drawMessage.js";
import { LatestResults } from "./latestResults.js";

// EventsListeners class is called inside module - "startGame.js"
class Game {
	constructor(game) {
		(this.player = game.players[0]),
			(this.computer = game.players[1]),
			(this.players = game.players),
			(this.activePlayer = game.activePlayer),
			(this.draws = game.draws),
			(this.isGameEnd = game.isGameEnd),
			(this.board = game.board),
			(this.emptyBoxes = game.emptyBoxes),
			(this.winningCombinations = game.winningCombinations),
			(this.latestResults = game.latestResults),
			this.getActivePlayer();
	}

	getActivePlayer = () => {
		this.activePlayer = this.players.find((el) => el.active);
		return this.activePlayer;
	};

	setActivePlayer = () => {
		this.player.active = !this.player.active;
		this.computer.active = !this.computer.active;
		this.getActivePlayer();
		return this.activePlayer;
	};

	drawCheck = (player, draws) => {
		if (player.arr.length === 5 && player.winner === false) {
			this.isGameEnd = true;
			draws++;
			resultDraws.textContent = draws;
			new LatestResults("", this.latestResults);
			new DrawMessage();
			return this.isGameEnd;
		}
	};
}

export { Game };
