// Game mechanics
class GameTable {
	constructor() {
		this.table = Array.from({ length: 9 }, _ => -1);
		this.player = 0;
		this.isWon = false;
		this.winner = -1;
	}

	nextPlayer() {
		this.player = (this.player + 1) % 2;
	}

	setCell(cell) {
		if (this.table[cell] < 0) {
			this.table[cell] = this.player;
			return true;
		}
		return false;
	}

	getCell(cell) {
		return this.table[cell];
	}

	checkWin() {
		// TODO: Fix win check bug
		for (let i = 0; i < 3; i++) {
			this.isWon ||= this.table.slice(i*3, i*3+3).every(v => v === this.player);
			this.isWon ||= [this.table[0], this.table[3], this.table[6]].every(v => v === this.player);
			this.isWon ||= [this.table[1], this.table[4], this.table[7]].every(v => v === this.player);
			this.isWon ||= [this.table[3], this.table[5], this.table[8]].every(v => v === this.player);
			this.isWon ||= [this.table[0], this.table[4], this.table[8]].every(v => v === this.player);
			this.isWon ||= [this.table[2], this.table[4], this.table[6]].every(v => v === this.player);
		}
		this.winner = this.player;
	}

	resetTable() {
		this.table.forEach(_ => -1);
	}
}

// Setup Tic-tac-toe table
const GAME = document.getElementById('game-table');

for (let i = 0; i < 3; i++) {
	let row = document.createElement('tr');
	for (let j = 0; j < 3; j++) {
		row.appendChild(document.createElement('td'));
	}
	GAME.appendChild(row);
}

// U+1F607, U+1F47F
const PLAYER_ICONS = [ '😇', '👿' ];

// Game logic
const GAME_TABLE = new GameTable();
function main(event) {
	if (!GAME_TABLE.isWon) {

	}
}

function selectBox(event) {
	let row = event.target.parentElement.rowIndex;
	let column = event.target.cellIndex;
	if (!GAME_TABLE.isWon) {
		if (GAME_TABLE.setCell(3 * row + column)) {
			event.target.innerText = PLAYER_ICONS[GAME_TABLE.player];
			GAME_TABLE.checkWin();
			GAME_TABLE.nextPlayer();
		}
	}
}

GAME.addEventListener('click', selectBox);	
