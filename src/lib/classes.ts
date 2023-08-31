export class Cell {
  state: string | Board;
  isSelected: boolean = false;
  constructor(board: Board | null) {
    if (board) this.state = board;
    else this.state = "_";
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
}

export class Board {
  cells: Cell[][] = [];
  turn: number = 0;
  constructor(cells?: Cell[][]) {
    if (cells) this.cells = cells;
  }
}
