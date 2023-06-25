<script lang="ts">
  import type { PageData } from "./$types";
  import { galleryPhotosNth, galleryPhotosId } from "$lib/stores";
  import { ChevronLeft, ChevronRight, Icon } from "svelte-hero-icons";
  export let data: PageData;
  if ($galleryPhotosId != data.photos[0].expand?.tournament.id) {
    $galleryPhotosId = data.photos[0].expand?.tournament.id || "";
    $galleryPhotosNth = 0;
  }
  function goRight() {
    if ($galleryPhotosNth < data.photos.length - 1) {
      $galleryPhotosNth += 1;
    }
  }

  function goLeft() {
    if ($galleryPhotosNth > 0) {
      $galleryPhotosNth -= 1;
    }
  }

  function goTo(n: number) {
    $galleryPhotosNth = n;
  }
</script>

<svelte:head>
  <title>{data.year} - {data.photos[0].expand?.tournament.name}</title>
  <meta
    name="description"
    content="Zdjęcia z {data.photos[0].expand?.tournament.name}"
  />

  <meta
    property="og:title"
    content="{data.year} - {data.photos[0].expand?.tournament.name}"
  />
  <meta
    property="og:description"
    content="Zdjęcia z {data.photos[0].expand?.tournament.name}"
  />
  <meta property="og:image" content="https://rksmat.pl/logo-medium.webp" />
  <meta
    property="og:url"
    content="https://rksmat.pl/gallery/{data.year}/{data.tournament}"
  />
  <meta property="og:type" content="website" />
  <meta property="og:locale" content="pl_PL" />
  <meta property="og:site_name" content="RKS Mat" />
</svelte:head>

<div class="w-full flex flex-col items-center mb-[28vh]">
  <div class="w-full py-0 sm:px-16 md:px-32 lg:px-64 flex flex-col">
    <div
      class="h-8 sm:h-12 rounded-t-2xl bg-surface-200-800-token text-token font-bold text-md sm:text-2xl flex items-center justify-center shadow-lg dark:shadow-surface-500"
    >
      {data.photos[0].expand?.tournament.name}
    </div>
    <div class="w-full h-auto shadow-lg dark:shadow-surface-500">
      <img src={data.photos[$galleryPhotosNth].photo} alt="" />
    </div>
    <div class="w-full flex flex-row h-8 sm:h-12">
      <button
        on:click={goLeft}
        class="aspect-square h-full btn-icon variant-filled-primary rounded-bl-2xl rounded-none shadow-lg dark:shadow-surface-500"
        ><span><Icon src={ChevronLeft} size="24px" /></span></button
      >
      <div
        class="w-full bg-surface-200 dark:bg-surface-900 shadow-lg dark:shadow-surface-500 whitespace-nowrap overflow-x-scroll overflow-y-hidden inline-block"
      >
        {#each data.photos as photo, i}
          <button
            on:click={() => goTo(i)}
            class="{i == $galleryPhotosNth
              ? 'border-2  scale-95 -translate-y-[0.10rem]'
              : ''} aspect-[20/12] h-full transition-all hover:z-20"
          >
            <img src={photo.photo + "&thumb=120x0"} class="h-full" alt="" />
          </button>
        {/each}
      </div>
      <div class="w-auto bg-surface-200 dark:bg-surface-900" />
      <button
        on:click={goRight}
        class="aspect-square ml-auto h-full btn-icon variant-filled-primary rounded-br-2xl rounded-none shadow-lg dark:shadow-surface-500"
        ><span><Icon src={ChevronRight} size="24px" /></span></button
      >
    </div>
  </div>
</div>
