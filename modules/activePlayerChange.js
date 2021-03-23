import { FindActivePlayer } from "./findActivePlayer.js";

class ActivePlayerChange {
	constructor(player1, player2, activePlayer, players) {
		(this.player1 = player1),
			(this.player2 = player2),
			(this.activePlayer = activePlayer),
			(this.players = players),
			this.changeActivePlayer();
	}
	changeActivePlayer = () => {
		this.player1.active = !this.player1.active;
		this.player2.active = !this.player2.active;
		new FindActivePlayer(this.activePlayer, this.players);
	};
}

export { ActivePlayerChange };
