<script>
  import { drawerStore } from "@skeletonlabs/skeleton";
  import { onMount } from "svelte";

  onMount(() => {
    drawerStore.close();
  });
</script>

<svelte:head>
  <title>O nas</title>
  <meta
    name="description"
    content="O nas. Dowiedz się więcej o RKS Mat."
  />

  <meta property="og:title" content="O nas" />
  <meta
    property="og:description"
    content="O nas. Dowiedz się więcej o RKS Mat."
  />
  <meta property="og:image" content="https://rksmat.pl/logo-medium.webp" />
  <meta property="og:url" content="https://rksmat.pl/about" />
  <meta property="og:type" content="website" />
  <meta property="og:locale" content="pl_PL" />
  <meta property="og:site_name" content="RKS Mat" />
</svelte:head>

<div class="flex flex-col items-center w-full px-0 sm:px-32 md:px-64 lg:px-80">
  <div class="bg-surface-200-800-token p-4">
    <h1 class="text-4xl font-bold text-center">O nas</h1>
    <div class="p-4 px-0 sm:px-4 text-justify space-y-2">
      <p class="text-justify w-full">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Enim incidunt
        tempore minima illum rerum doloremque molestias voluptates
        <img src="" alt="" class="w-32 h-32 float-left mr-2" />
        reprehenderit, sint natus eligendi esse quisquam, sequi eius praesentium
        maxime ex nihil voluptatem?
      </p>
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Architecto
        eligendi laboriosam in vitae adipisci ducimus velit, eius asperiores
        harum dolor aperiam voluptatem incidunt ullam et delectus doloremque
        error voluptate dignissimos.
      </p>
    </div>
  </div>
</div>
