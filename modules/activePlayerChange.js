class ActivePlayerChange {
	constructor(player1, player2, activePlayer, players) {
		(this.player1 = player1),
			(this.player2 = player2),
			(this.activePlayer = activePlayer),
			(this.players = players),
			this.changeActivePlayer(
				this.player1,
				this.player2,
				this.activePlayer,
				this.players
			);
	}
	changeActivePlayer = (player, computer, activePlayer, players) => {
		player.active = !player.active;
		computer.active = !computer.active;
		activePlayer = players.filter((player) => player.active);
	};
}

export { ActivePlayerChange };
