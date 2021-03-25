import { FindActivePlayer } from "./findActivePlayer.js";

class ActivePlayerChange {
	constructor(player, computer, activePlayer, players) {
		(this.player = player),
			(this.computer = computer),
			(this.activePlayer = activePlayer),
			(this.players = players),
			this.changeActivePlayer();
	}
	changeActivePlayer = () => {
		this.player.active = !this.player.active;
		this.computer.active = !this.computer.active;
		new FindActivePlayer(this.activePlayer, this.players);
	};
}

export { ActivePlayerChange };
