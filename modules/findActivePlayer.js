// FindActivePlayer is called inside module - "startGame.js"
class FindActivePlayer {
	constructor(activePlayer, players) {
		(this.activePlayer = activePlayer), (this.players = players);
		this.findActivePlayer();
	}

	// Function that filter inside "players" array which contain player and computer.
	findActivePlayer = () => {
		this.activePlayer = this.players.filter((player) => player.active);
	};
}

export { FindActivePlayer };
