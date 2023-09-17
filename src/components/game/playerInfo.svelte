<script lang="ts">
  interface Player {
    name: string;
  }
  export let turn: boolean;
  export let player: Player;
  export let piece: string;
  export let winner: boolean | null;
</script>

<div
  class={` player-info ${turn ? "turn" : "noturn"} ${
    winner != null ? (winner ? "green" : "red") : ""
  }`}
>
  {player.name}: {piece}
</div>

<style>
  .player-info {
    padding: 1rem;
    font-size: 1rem;
    font-weight: normal;
  }
  .turn {
    background-color: #ddd;
  }
  .noturn {
    background-color: #eee;
  }
  .green {
    background-color: #ddeedd;
  }
  .red {
    background-color: #eedddd;
  }
</style>
