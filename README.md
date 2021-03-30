# TicTacToe - Game in Vanilla JS

This is a TicTacToe game made to train my programming skills, written in Vanilla JS using Object-oriented Programming.
Game can be played in here -> https://bartokrol.github.io/TicTacToe/

### Rules

-   Player with "X" mark starts the game.
-   The first player to get 3 of his marks in a row (up, down, across, or diagonally) is the winner.
-   When all 9 squares are full and there is no winner, the game is drawn.
-   "Reset all" button resets all of the previous results and players mark has to be chosen again.
-   "New Game" button starts new game with previous results still visible.

### Start

When DOM is loaded the player has to choose his mark. After this the game begins.
At this stage the player can't slide the page.
Player with "X" mark is always the starting player.

### Game

If player choose "O" as his mark the computer click starts the game with his "X" mark.              
After every click on the empty box on the board the active player changes.
When the game is finished, the boxes that match the winning combinations change their color which shows the exact winning combination.
After this the new game can be started (the players' marks stay the same and the results are still being counted) or the whole page can be reset and the game starts from the beginning.

The current results are counted from the beginning and the players' winning scores increase after each win.
The latest results are also counted from the beginning and can contain last 5 games.
