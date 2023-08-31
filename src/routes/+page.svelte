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
  //console.log(board);

  function handleMove(i: number, j: number, k: number, l: number) {
    board.turn % 2 === 0
      ? board.cells[i][j].getCells()[k][l].setState("X")
      : board.cells[i][j].getCells()[k][l].setState("O");
    board.turn++;
    board = board; //Triggers update on state
  }
</script>

<main>
  <div class="super-board">
    {#each board.cells as row, i}
      {#each row as cell, j}
        <div class={`board-container`}>
          {#each cell.getCells() as iRow, k}
            {#each iRow as iCell, l}
              <button class="cell" on:click={() => handleMove(i, j, k, l)}>
                {iCell.getState()}
              </button>
            {/each}
          {/each}
        </div>
      {/each}
    {/each}
  </div>
</main>

<style>
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
  .cell {
    border: 1px solid black;
    padding: 0.5rem;
    text-align: center;
  }
</style>
