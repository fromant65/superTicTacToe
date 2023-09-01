<script lang="ts">
  import { Cell, Board } from "../lib/classes";

  function createBoard(type: "super" | "normal") {
    const cells: Cell[][] = [];
    for (let i = 0; i < 3; i++) {
      const rowCells: Cell[] = [];
      for (let j = 0; j < 3; j++) {
        let cell;
        if (type === "super") {
          let board = createBoard("normal");
          cell = new Cell(board);
        } else {
          cell = new Cell(null);
        }
        rowCells.push(cell);
      }
      cells.push(rowCells);
    }
    return new Board(cells);
  }
  let board = createBoard("super");
  let lastMove: number[] = [];

  function handleMove(i: number, j: number, k: number, l: number) {
    if (!checkValidMove(i, j, k, l)) return;
    board.turn % 2 === 0
      ? board.cells[i][j].getCells()[k][l].setState("X")
      : board.cells[i][j].getCells()[k][l].setState("O");
    board.turn++;

    board.cells[i][j].getBoard()?.checkEnd();
    if (board.cells[i][j].getBoard()?.winner) {
      let winner = board.cells[i][j].getBoard()?.winner;
      if (winner === "O" || winner === "X") board.cells[i][j].setState(winner);
    }
    checkGameEnding();
    if (board.winner === "X" || board.winner === "O") {
      for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
          if (!board.cells[i][j].getPlayer())
            board.cells[i][j].setState(board.winner);
        }
      }
    }
    lastMove = [i, j, k, l];
    board = board; //Triggers update on state
  }

  function checkValidMove(i: number, j: number, k: number, l: number) {
    let cell = board.cells[i][j].getCells()[k][l].getPlayer();
    if (cell === "X" || cell === "O") return false;
    //If last move's cell isn't current move's board,
    //and last move's correspondant board isn't finished or has no winner, don't move
    let lastk = lastMove[2] || 0;
    let lastl = lastMove[3] || 0;
    let currentBoard = board.cells[lastk][lastl];
    if (
      lastMove.length &&
      (lastk != i || lastl != j) &&
      !currentBoard.getPlayer() &&
      !currentBoard.getBoard()?.finished
    )
      return false;
    //If the selected board is already finished, don't move
    if (board.cells[i][j].getBoard()?.finished) return false;
    return true;
  }

  function checkGameEnding() {
    board.checkEnd();
    if (board.finished && !board.winner) {
      let x = 0;
      let o = 0;
      for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
          if (board.cells[i][j].getBoard()?.winner === "O") o++;
          if (board.cells[i][j].getBoard()?.winner === "X") x++;
        }
      }
      o > x && board.setWinner("O");
      x > o && board.setWinner("X");
    }
    board = board;
  }
</script>

<main>
  <div class="super-board">
    {#each board.cells as row, i}
      {#each row as cell, j}
        <div
          class={`${
            cell.getState() === "O" || cell.getState() === "X"
              ? "finished-board"
              : "board-container"
          } 
          ${lastMove[2] === i && lastMove[3] === j ? "active" : ""}
          `}
        >
          {#if cell.getState() === "X" || cell.getState() === "O"}
            <div>{cell.getState()}</div>
          {:else}
            {#each cell.getCells() as iRow, k}
              {#each iRow as iCell, l}
                <button class="cell" on:click={() => handleMove(i, j, k, l)}>
                  {iCell.getState()}
                </button>
              {/each}
            {/each}
          {/if}
        </div>
      {/each}
    {/each}
  </div>
  <p>
    {board.finished && board.winner
      ? `Winner is ${board.winner}`
      : board.finished
      ? "DRAW"
      : ""}
  </p>
</main>

<style>
  * {
    color: black;
    font-weight: 1000;
    font-size: x-large;
    font-family: Arial, Helvetica, sans-serif;
  }
  main {
    display: flex;
  }
  .super-board {
    display: grid;
    grid-template-columns: repeat(3, 200px);
    grid-template-rows: repeat(3, 200px);
    gap: 1rem;
    align-items: center;
    justify-items: center;
  }
  .board-container {
    display: grid;
    grid-template-rows: repeat(3, 50px);
    grid-template-columns: repeat(3, 50px);
    gap: 0.25rem;
  }
  .finished-board {
    display: flex;
    align-items: center;
    justify-items: center;
  }

  .cell {
    border: 1px solid black;
    padding: 0.5rem;
    text-align: center;
  }
  .active {
    background-color: gray;
  }
</style>
