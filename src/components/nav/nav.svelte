<script lang="ts">
  import { goto } from "$app/navigation";
</script>

<div class="nav-container">
  <h2 class="nav-title">Super TicTacToe</h2>
  <button class="nav-link" on:click={() => goto("/")}>HOME</button>
  <button class="nav-link" on:click={() => goto("/game")}>GAME</button>
</div>

<style>
  .nav-container {
    padding: 0.5rem;
    border-bottom: 1px solid #ddd;
  }
  .nav-title {
    display: inline-block;
    padding: 0.5rem;
    margin: 0;
    font-weight: normal;
  }
  .nav-link {
    background-color: #fff;
    border: none;
    padding: 0.5rem;
  }
  .nav-link:hover {
    background-color: #eee;
    cursor: pointer;
  }
</style>
