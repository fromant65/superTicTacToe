<script lang="ts">
  export let player1 = "Player 1";
  export let player2 = "Player 2";
  export let turn: number;
  export let gameMoves: number[][];
  import GameMoves from "./gameMoves.svelte";
</script>

<div class="game-info">
  <div class={`${turn === 0 ? "turn" : "noturn"}`}>{player1}: X</div>
  <GameMoves {gameMoves} />
  <div class={`${turn === 1 ? "turn" : "noturn"}`}>{player2}: O</div>
</div>

<style>
  .game-info {
    padding: 1rem;
  }
  .noturn {
    font-weight: normal;
  }
  .turn {
    font-weight: bold;
  }
</style>
