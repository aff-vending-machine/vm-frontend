<!-- CreateModal -->
<script lang="ts">
  export let src: string;
  export let alt = 'image';

  const handleImageError = () => {
    src = 'https://placehold.co/512x512?text=No+Image';
  };
</script>

<!-- HTML -->
<img class={$$props.class} {alt} {src} on:error={handleImageError} />

<!-- style -->
<style lang="scss">
</style>
