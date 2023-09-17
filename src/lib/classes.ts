const fillerString = "";

export class BoardCell {
  state: IndividualBoard;
  completedBoard: string = "";
  isSelected: boolean = false;
  constructor(board: IndividualBoard) {
    this.state = board;
  }
  setState(state: IndividualBoard) {
    this.state = state;
  }
  getState() {
    return this.state;
  }
  getCells(): IndividualCell[][] {
    return this.state.cells;
  }
}

export class IndividualCell {
  state: string = fillerString;
  setState(state: string) {
    this.state = state;
  }
  getState() {
    return this.state;
  }
}

export class Board {
  winner: string = "";
  finished: boolean = false;
  cells: IndividualCell[][] | BoardCell[][] = [];
  setWinner(winner: string) {
    this.winner = winner;
  }
}

export class IndividualBoard extends Board {
  cells: IndividualCell[][] = [];
  constructor(cells?: IndividualCell[][]) {
    super();
    if (cells) this.cells = cells;
  }
  checkEnd() {
    //checks if a board is finished and determines the winner
    this.#checkFilesAndColumns();
    this.#checkDiagonals();
    this.#checkIsBoardFull();
  }
  #checkFilesAndColumns() {
    let cells = this.cells;
    for (let i = 0; i < 3; i++) {
      if (
        cells[i][0].getState() === cells[i][1].getState() &&
        cells[i][0].getState() === cells[i][2].getState() &&
        cells[i][0].getState() != fillerString
      ) {
        this.finished = true;
        this.winner = cells[i][0].getState();
        return;
      }
      if (
        cells[0][i].getState() === cells[1][i].getState() &&
        cells[0][i].getState() === cells[2][i].getState() &&
        cells[0][i].getState() != fillerString
      ) {
        this.finished = true;
        this.winner = cells[0][i].getState();
        return;
      }
    }
  }
  #checkDiagonals() {
    let cells = this.cells;
    if (
      (cells[0][0].getState() === cells[1][1].getState() &&
        cells[0][0].getState() === cells[2][2].getState() &&
        cells[0][0].getState() != fillerString) ||
      (cells[2][0].getState() === cells[1][1].getState() &&
        cells[2][0].getState() === cells[0][2].getState() &&
        cells[2][0].getState() != fillerString)
    ) {
      this.finished = true;
      this.winner = cells[1][1].getState();
    }
  }
  #checkIsBoardFull() {
    let cells = this.cells;
    let occupiedCells = 0;
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        let cellState = cells[i][j].getState();
        if (cellState === "X" || cellState === "O") occupiedCells++;
      }
    }
    if (occupiedCells === 9) {
      this.finished = true;
    }
  }
}

export class SuperBoard extends Board {
  turn: number = 0;
  cells: BoardCell[][] = [];
  constructor(cells?: BoardCell[][]) {
    super();
    if (cells) this.cells = cells;
  }
  #checkBoardsCompletion() {
    for (let i in this.cells) {
      for (let j in this.cells[i]) {
        this.cells[i][j].getState().checkEnd();
      }
    }
  }

  checkBoardWinner() {
    //Converts the SuperBoard to an IndividualBoard and checks if there's a winner
    this.#checkBoardsCompletion();
    let superBoardMimic = this.#getSuperBoardGrid();
    superBoardMimic.checkEnd();
    if (superBoardMimic.winner) {
      this.winner = superBoardMimic.winner;
      this.finished = true;
      return;
    }
    this.#checkAllBoardsFinished();
  }

  #checkAllBoardsFinished() {
    let finishedBoards = 0;
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        if (this.cells[i][j].getState().finished) finishedBoards++;
      }
    }
    if (finishedBoards === 9) {
      this.finished = true;
    }
  }

  #getSuperBoardGrid() {
    //Returns an IndividualBoard which mimics the state of the Super Board Game
    let cells: IndividualCell[][] = [];
    for (let i in this.cells) {
      let row: IndividualCell[] = [];
      for (let j in this.cells[i]) {
        let cell = new IndividualCell();
        cell.setState(this.cells[i][j].getState().winner);
        row.push(cell);
      }
      cells.push(row);
    }
    return new IndividualBoard(cells);
  }
}

export class Game {
  board: SuperBoard;
  moves: number[][] = [];
  constructor() {
    this.board = this.#createSuperBoard();
  }
  //Board creation
  #createSuperBoard() {
    const boardCells: BoardCell[][] = [];
    for (let i = 0; i < 3; i++) {
      const rowCells: BoardCell[] = [];
      for (let j = 0; j < 3; j++) {
        let cell;
        let board = this.#createIndividualBoard();
        cell = new BoardCell(board);
        rowCells.push(cell);
      }
      boardCells.push(rowCells);
    }
    return new SuperBoard(boardCells);
  }

  #createIndividualBoard() {
    const cells: IndividualCell[][] = [];
    for (let i = 0; i < 3; i++) {
      const rowCells: IndividualCell[] = [];
      for (let j = 0; j < 3; j++) {
        let cell;
        cell = new IndividualCell();
        rowCells.push(cell);
      }
      cells.push(rowCells);
    }
    return new IndividualBoard(cells);
  }
  //Game Manipulation
  handleMove(i: number, j: number, k: number, l: number, lastMove: number[]) {
    if (!this.#checkValidMove(i, j, k, l, lastMove)) return lastMove;
    this.#addMoveAndTurn(i, j, k, l);
    this.#checkBoardCompletion(i, j);
    this.#checkGameEnding();
    this.moves.push([i, j, k, l]);
    return [i, j, k, l];
  }

  #checkValidMove(
    i: number,
    j: number,
    k: number,
    l: number,
    lastMove: number[]
  ) {
    let cell = this.board.cells[i][j].getCells()[k][l].getState();
    if (cell === "X" || cell === "O") return false;
    //If last move's cell isn't current move's board,
    //and last move's correspondant board isn't finished or has no winner, don't move
    let lastk = lastMove[2] || 0;
    let lastl = lastMove[3] || 0;
    let currentBoard = this.board.cells[lastk][lastl];
    if (
      lastMove.length &&
      (lastk != i || lastl != j) &&
      !currentBoard.getState().finished
    )
      return false;
    //If the selected board is already finished, don't move
    if (this.board.cells[i][j].getState().finished) return false;
    return true;
  }

  #checkGameEnding() {
    this.board.checkBoardWinner();
    if (this.board.finished && !this.board.winner) {
      let x = 0;
      let o = 0;
      for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
          if (this.board.cells[i][j].completedBoard === "O") o++;
          if (this.board.cells[i][j].completedBoard === "X") x++;
        }
      }
      o > x && this.board.setWinner("O");
      x > o && this.board.setWinner("X");
    }
    this.#updateBoardsWithWinner();
  }

  #addMoveAndTurn(i: number, j: number, k: number, l: number) {
    this.board.turn % 2 === 0
      ? this.board.cells[i][j].getCells()[k][l].setState("X")
      : this.board.cells[i][j].getCells()[k][l].setState("O");
    this.board.turn++;
  }

  #checkBoardCompletion(i: number, j: number) {
    this.board.cells[i][j].getState().checkEnd();
  }

  #updateBoardsWithWinner() {
    if (this.board.winner === "X" || this.board.winner === "O") {
      for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
          if (!this.board.cells[i][j].getState().winner) {
            this.board.cells[i][j].getState().setWinner(this.board.winner);
            this.board.cells[i][j].getState().finished = true;
          }
        }
      }
    }
  }
  getMoves() {
    return this.moves;
  }
}
