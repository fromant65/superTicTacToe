<script lang="ts">
  import { Game } from "../../lib/classes";
  import GameInfo from "./gameInfo.svelte";
  let game = new Game();
  let gameMoves = game.getMoves();
  let lastMove: number[] = [];
  function handleMove(i: number, j: number, k: number, l: number) {
    lastMove = game.handleMove(i, j, k, l, lastMove);
    game = game;
    gameMoves = game.getMoves();
  }
</script>

<div class="game-container">
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
          f${i} c${j}
          `}
        >
          {#if cell.state.winner === "X" || cell.state.winner === "O"}
            <div class="finished-board-letter">{cell.state.winner}</div>
          {:else}
            {#each cell.getCells() as iRow, k}
              {#each iRow as iCell, l}
                <button
                  class={`cell f${k} c${l}`}
                  on:click={() => handleMove(i, j, k, l)}
                >
                  {iCell.getState()}
                </button>
              {/each}
            {/each}
          {/if}
        </div>
      {/each}
    {/each}
  </div>
  <GameInfo turn={game.board.turn % 2} {gameMoves} />
  <div>
    <p>
      {game.board.finished && game.board.winner
        ? `Winner is ${game.board.winner}`
        : game.board.finished
        ? "DRAW"
        : ""}
    </p>
  </div>
</div>

<style>
  * {
    color: black;
    font-weight: 1000;
    font-size: x-large;
    font-family: Arial, Helvetica, sans-serif;
    --cell-size: 40px;
    --super-board-size: calc(var(--cell-size) * 3);
  }
  .game-container {
    display: flex;
    align-items: center;
  }
  .super-board {
    display: grid;
    grid-template-columns: repeat(3, var(--super-board-size));
    grid-template-rows: repeat(3, var(--super-board-size));
    gap: 2.5rem;
    align-items: center;
    justify-items: center;
    border: 1px solid black;
    padding: 1.5rem;
  }
  .board-container {
    display: grid;
    grid-template-rows: repeat(3, var(--cell-size));
    grid-template-columns: repeat(3, var(--cell-size));
    gap: 0.25rem;
    position: relative;
    padding: 1rem;
  }
  .finished-board {
    display: flex;
    align-items: center;
    justify-items: center;
    font-size: var(--cell-size);
    position: relative;
  }
  .finished-board-letter {
    font-size: 120px;
    font-weight: 100;
  }

  .cell {
    border: 1px solid black;
    text-align: center;
    position: relative;
  }
  .active {
    background-color: #ddd;
  }
  .c0::after,
  .c1::after,
  .c2::after,
  .f0::before,
  .f1::before,
  .f2::before {
    position: absolute;
    left: 0px;
    top: 0px;
    color: #555;
  }
  .c0::after,
  .c1::after,
  .c2::after {
    left: 8px;
  }
  .c0::after {
    content: "1";
    font-size: 10px;
    text-align: left;
  }
  .c1::after {
    content: "2";
    font-size: 10px;
    text-align: left;
  }
  .c2::after {
    content: "3";
    font-size: 10px;
    text-align: left;
  }
  .f0::before {
    content: "1";
    font-size: 10px;
    text-align: left;
  }
  .f1::before {
    content: "2";
    font-size: 10px;
    text-align: left;
  }
  .f2::before {
    content: "3";
    font-size: 10px;
    text-align: left;
  }
</style>
