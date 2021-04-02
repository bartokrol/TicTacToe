import {
	boxes,
	markChoice,
	resultWins,
	resultDraws,
	resultDefeats,
	latest,
	newGameBtn,
} from "./domElems.js";

// Function that reset page after reset btn is clicked
function resetPageAfterResetBtn(
	player,
	computer,
	draws,
	players,
	board,
	isGameEnd
) {
	resetBoxes();
	resetPlayersWins(player, computer, draws);
	resetPlayers(player, computer);
	resetPlayersArr(players);
	resetResults(player, computer, draws);
	// resetBoard(board);
	isGameEnd = false;
	markChoice.classList.remove("inactive");
	return isGameEnd;
}

// Function that reset page after new game btn is clicked
function resetPageAfterNewGameBtn(player, computer, players, board, isGameEnd) {
	resetBoxes();
	resetPlayers(player, computer);
	resetPlayersForNewGame(player, computer);
	resetPlayersArr(players);
	// resetBoard(board);
	isGameEnd = false;
	newGameBtn.disabled = true;
	newGameBtn.classList.add("disabled");
	return isGameEnd;
}

// Function cleares classNames and textContents of every box
const resetBoxes = () => {
	boxes.forEach((box) => {
		box.className = "game-container__board-container__box board--box";
		box.textContent = "";
	});
};

// Function resets players wins and latest unordered list
const resetResults = (player, computer, draws) => {
	resultWins.textContent = player.wins;
	resultDraws.textContent = draws;
	resultDefeats.textContent = computer.wins;
	latest.innerHTML = "";
};

// Function that resets player and computer wins and draws number
const resetPlayersWins = (player, computer, draws) => {
	player.wins = 0;
	computer.wins = 0;
	draws = 0;
};

//
const resetPlayers = (player, computer) => {
	player.active = false;
	computer.active = false;
	player.winner = false;
	computer.winner = false;
};

const resetPlayersForNewGame = (player, computer) => {
	player.mark === "X"
		? (player.active = true) && (computer.active = false)
		: (computer.active = true) && (player.active = false);
};

// Function that reset the board
// const resetBoard = (board) => {
// 	board = [
// 		[null, null, null],
// 		[null, null, null],
// 		[null, null, null],
// 	];
// };

// Function that reset the each players array
const resetPlayersArr = (players) => {
	for (let player of players) {
		player.arr = [];
	}
};

export { resetPageAfterResetBtn, resetPageAfterNewGameBtn };
