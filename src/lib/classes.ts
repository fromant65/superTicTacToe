const fillerString = " ";

export class Cell {
  state: string | Board;
  isSelected: boolean = false;
  constructor(board: Board | null) {
    if (board) this.state = board;
    else this.state = fillerString;
  }
  setState(player: "O" | "X" | Board) {
    this.state = player;
  }
  getState() {
    return this.state;
  }
  getCells(): Cell[][] {
    return this.state instanceof Board ? this.state.cells : [];
  }
  getPlayer(): string {
    return typeof this.state === "string" ? this.state : "";
  }
  getBoard(): Board | null {
    return this.state instanceof Board ? this.state : null;
  }
}

export class Board {
  winner: string | null = null;
  finished = false;
  cells: Cell[][] = [];
  turn: number = 0;
  constructor(cells?: Cell[][]) {
    if (cells) this.cells = cells;
  }
  setWinner(winner: string) {
    this.winner = winner;
  }

  checkEnd() {
    //checks if a board is finished and determines the winner
    let cells = this.cells;
    if (typeof cells[0][0].getState() === "string") {
      this.#checkFilesAndColumns(cells);
      this.#checkDiagonals(cells);
      this.#checkIsBoardFull(cells);
    }
  }

  #checkFilesAndColumns(cells: Cell[][]) {
    for (let i = 0; i < 3; i++) {
      if (
        cells[i][0].getState() === cells[i][1].getState() &&
        cells[i][0].getState() === cells[i][2].getState() &&
        cells[i][0].getState() != fillerString
      ) {
        this.finished = true;
        this.winner = cells[i][0].getPlayer();
      }
      if (
        cells[0][i].getState() === cells[1][i].getState() &&
        cells[0][i].getState() === cells[2][i].getState() &&
        cells[0][i].getState() != fillerString
      ) {
        this.finished = true;
        this.winner = cells[0][i].getPlayer();
      }
    }
  }
  #checkDiagonals(cells: Cell[][]) {
    if (
      (cells[0][0].getState() === cells[1][1].getState() &&
        cells[0][0].getState() === cells[2][2].getState() &&
        cells[0][0].getState() != fillerString) ||
      (cells[2][0].getState() === cells[1][1].getState() &&
        cells[2][0].getState() === cells[0][2].getState() &&
        cells[2][0].getState() != fillerString)
    ) {
      this.finished = true;
      this.winner = cells[1][1].getPlayer();
    }
  }
  #checkIsBoardFull(cells: Cell[][]) {
    let occupiedCells = 0;
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        let cellState = cells[i][j].getPlayer();
        if (cellState === "X" || cellState === "O") occupiedCells++;
      }
    }
    if (occupiedCells === 9) this.finished = true;
  }
}

export class Game {
  turn: number = 0;
}
