<!-- Action -->
<script lang="ts">
  import { Product } from '@apps/core';

  export let source: Product;
</script>

<!-- HTML -->
<div class="space-x-5">
  <img class="h-12 w-12" src={source['image_url']} alt={source['name']} />
</div>

<!-- style -->
<style lang="scss">
</style>
