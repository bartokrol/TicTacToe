class FindActivePlayer {
	constructor(activePlayer, players) {
		(this.activePlayer = activePlayer), (this.players = players);
		this.findActivePlayer();
	}

	findActivePlayer = () => {
		this.activePlayer = this.players.filter((player) => player.active);
		console.log(this.activePlayer);
	};
}

export { FindActivePlayer };
