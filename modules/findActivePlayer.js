// FindActivePlayer is called inside module - "startGame.js", "setEventListeners.js" (is called after newGameBtn is clicked) and "activePlayerChange.js".
class FindActivePlayer {
	constructor(activePlayer, players) {
		(this.activePlayer = activePlayer), (this.players = players);
		this.findActivePlayer();
	}

	// Function that filter inside "players" array which contain player and computer.
	findActivePlayer = () => {
		this.activePlayer = this.players.find((el) => el.active);
	};
}

export { FindActivePlayer };
