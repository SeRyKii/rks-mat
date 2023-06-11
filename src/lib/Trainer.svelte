<script lang="ts">
  export let image: string;
  export let name: string;
  export let description: string;
</script>

<div class="card overflow-hidden">
    <header class="card-header overflow-hidden aspect-[21/12] -m-4 mb-0">
      <img class="w-full" src={image} alt={name}>
    </header>
    <hr>
    <section class="p-4 flex flex-col">
      <span class="text-3xl font-bold whitespace-nowrap">{name}</span>
      <span class="text-justify">
        {description}
      </span>
    </section>
  </div>


