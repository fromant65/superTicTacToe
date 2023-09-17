<script lang="ts">
  export let gameMoves: number[][];
</script>

<div class="moves-table">
  {#each gameMoves as move, i}
    <div class="move">
      <b class="move-number">{i}</b>
      <div class="move-coord">
        {#each move as cell, j}
          {`${cell + 1} `}
        {/each}
      </div>
    </div>
  {/each}
</div>

<style>
  .moves-table {
    height: 200px;
    font-size: 1rem;
    font-weight: normal;
    overflow: auto;
    border-top: 1px solid #ddd;
    border-bottom: 1px solid #ddd;
    background-color: #eee;
  }
  .move:nth-child(2n) {
    background-color: #ddd;
  }
  .move:nth-child(2n + 1) {
    background-color: #eee;
  }
  .move-coord {
    display: inline-block;
    padding: none;
    padding: 0.25rem;
  }
  .move-number {
    display: inline-block;
    width: 1.2rem;
    text-align: center;
    padding: 0.25rem;
    background-color: #ccc;
  }

  /* width */
  ::-webkit-scrollbar {
    width: 10px;
  }

  /* Track */
  ::-webkit-scrollbar-track {
    background: #f1f1f1;
  }

  /* Handle */
  ::-webkit-scrollbar-thumb {
    background: #888;
    border-radius: 5px;
  }

  /* Handle on hover */
  ::-webkit-scrollbar-thumb:hover {
    background: #555;
  }
</style>
