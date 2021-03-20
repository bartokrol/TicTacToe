import {
	boxes,
	markChoice,
	resultWins,
	resultDraws,
	resultDefeats,
	latest,
	newGameBtn,
} from "./dom-elems.js";

function resetPageAfterResetBtn(player, computer, players, board) {
	resetBoxes();
	resetPlayersWins(player, computer);
	resetPlayersArr(players);
	resetResults(player, computer);
	resetBoard(board);
	markChoice.classList.remove("inactive");
}

function resetPageAfterNewGameBtn(player, computer, players, board) {
	resetBoxes();
	resetPlayers(player, computer);
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

const resetResults = (player, computer) => {
	console.log(resultWins, resultDraws, resultDefeats);
	resultWins.textContent = player.wins;
	resultDraws.textContent = computer.wins;
	resultDefeats.textContent = computer.wins;
	latest.innerHTML = "";
};

const resetPlayersWins = (player, computer) => {
	player.wins = 0;
	computer.wins = 0;
	resetPlayers(player, computer);
};

const resetPlayers = (player, computer) => {
	player.active = true;
	computer.active = false;
	player.winner = false;
	computer.winner = false;
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
