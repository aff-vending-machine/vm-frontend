<!-- Breadcrumb -->
<script lang="ts">
  export let home = true;
  export let path: string;

  const items = path.split('/').map((p, index, a) => {
    path = '';
    for (let i = 0; i < index; i++) {
      path += a[i] + '/';
    }
    path += p;
    return {
      link: path,
      text: p,
    };
  });
  items.shift();

  if (home) {
    items.unshift({
      link: '/',
      text: 'Home',
    });
  }
</script>

<!-- HTML -->
<nav aria-label="breadcrumb">
  <ol class="inline-flex items-center space-x-4 py-2 text-sm font-medium">
    {#each items as item, i}
      {#if i === 0}
        <li class="inline-flex items-center">
          <a href={item.link} class="capitalize text-gray-300 hover:text-gray-400">{item.text}</a>
        </li>
      {:else if i === items.length - 1}
        <li class="inline-flex items-center space-x-4" aria-current="page">
          <span class="text-white">/</span>
          <p class="capitalize text-white hover:text-white">{item.text}</p>
        </li>
      {:else}
        <li class="inline-flex items-center space-x-4">
          <span class="text-white">/</span>
          <a href={item.link} class="capitalize text-white hover:text-white">{item.text}</a>
        </li>
      {/if}
    {/each}
  </ol>
</nav>

<!-- style -->
<style lang="scss">
</style>
