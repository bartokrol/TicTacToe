import {
	boxes,
	markChoice,
	resultWins,
	resultDraws,
	resultDefeats,
	latest,
	newGameBtn,
} from "./dom-elems.js";

function resetPageAfterResetBtn(player1, player2, players, board) {
	resetBoxes();
	resetPlayersWins(player1, player2);
	resetPlayersArr(players);
	resetResults(player1, player2);
	resetBoard(board);
	markChoice.classList.remove("inactive");
}

function resetPageAfterNewGameBtn(player1, player2, players, board) {
	resetBoxes();
	resetPlayers(player1, player2);
	resetPlayersArr(players);
	resetBoard(board);
	newGameBtn.disabled = true;
}

const resetBoxes = () => {
	boxes.forEach((box) => {
		box.className = "game-container__board-container__box board--box";
		box.textContent = "";
	});
};

const resetResults = (player1, player2) => {
	resultWins.textContent = player1.wins;
	resultDraws.textContent = player2.wins;
	resultDefeats.textContent = player2.wins;
	latest.innerHTML = "";
};

const resetPlayersWins = (player1, player2) => {
	player1.wins = 0;
	player2.wins = 0;
	resetPlayers(player1, player2);
};

const resetPlayers = (player1, player2) => {
	player1.active = true;
	player2.active = false;
	player1.winner = false;
	player2.winner = false;
};

const resetBoard = (board) => {
	board = [
		[null, null, null],
		[null, null, null],
		[null, null, null],
	];
};

const resetPlayersArr = (players) => {
	for (let player of players) {
		player.arr = [];
	}
};

export { resetPageAfterResetBtn, resetPageAfterNewGameBtn };
