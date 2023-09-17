<script lang="ts">
  export let player1 = { name: "Player 1" };
  export let player2 = { name: "Player 2" };
  export let turn: number;
  export let gameMoves: number[][];
  export let winner: string;
  import PlayerInfo from "./playerInfo.svelte";
  import GameMoves from "./gameMoves.svelte";

  $: isFirstPlayerTurn = turn % 2 ? false : true;
  $: isNotFirstPlayerTurn = !isFirstPlayerTurn;
  $: isP1Winner = winner === "" ? null : winner === "X" ? true : false;
  $: isP2Winner = winner === "" ? null : winner === "O" ? true : false;
</script>

<div class="game-info">
  <PlayerInfo
    player={player1}
    bind:turn={isFirstPlayerTurn}
    piece="X"
    winner={isP1Winner}
  />
  <GameMoves {gameMoves} />
  <PlayerInfo
    player={player2}
    bind:turn={isNotFirstPlayerTurn}
    piece="O"
    winner={isP2Winner}
  />
</div>

<style>
  .game-info {
    margin: 1rem;
    border: 1px solid #d4d4d4;
  }
</style>
