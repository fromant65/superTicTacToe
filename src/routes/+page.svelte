<script lang="ts">
  import { Game } from "../lib/classes";

  let game = new Game();

  let lastMove: number[] = [];
  function handleMove(i: number, j: number, k: number, l: number) {
    lastMove = game.handleMove(i, j, k, l, lastMove);
    game = game;
  }
</script>

<main>
  <div class="super-board">
    {#each game.board.cells as row, i}
      {#each row as cell, j}
        <div
          class={`${
            cell.state.winner === "O" || cell.state.winner === "X"
              ? "finished-board"
              : "board-container"
          } 
          ${
            lastMove[2] === i && lastMove[3] === j && !cell.state.finished
              ? "active"
              : ""
          }
          `}
        >
          {#if cell.state.winner === "X" || cell.state.winner === "O"}
            <div class="finished-board-letter">{cell.state.winner}</div>
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
  <div>
    <p>Turn: {game.board.turn % 2 ? "O" : "X"}</p>
    <p>
      {game.board.finished && game.board.winner
        ? `Winner is ${game.board.winner}`
        : game.board.finished
        ? "DRAW"
        : ""}
    </p>
  </div>
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
    font-size: 50px;
  }
  .finished-board-letter {
    font-size: 120px;
    font-weight: 100;
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
