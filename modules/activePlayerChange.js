import { FindActivePlayer } from "./findActivePlayer.js";

// ActivePlayerChange is called inside modules - "computerClick.js" and "playerClick.js".
class ActivePlayerChange {
	constructor(player, computer, activePlayer, players) {
		(this.player = player),
			(this.computer = computer),
			(this.activePlayer = activePlayer),
			(this.players = players),
			this.changeActivePlayer();
	}

	// Function changes players' and computers' active state and then called FindActivePlayer class
	changeActivePlayer = () => {
		this.player.active = !this.player.active;
		this.computer.active = !this.computer.active;
		new FindActivePlayer(this.activePlayer, this.players);
	};
}

export { ActivePlayerChange };
