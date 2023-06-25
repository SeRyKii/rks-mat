<script lang="ts">
  import PostContentViewer from "$lib/PostContentViewer.svelte";
  import { Avatar } from "@skeletonlabs/skeleton";
  import type { PageData } from "./$types";
  import dayjs from "dayjs";
  import { drawerStore } from "@skeletonlabs/skeleton";
  import { onMount } from "svelte";

  export let data: PageData;

  onMount(() => {
    drawerStore.close();
  });
</script>

<svelte:head>
  <title>{data.post.title}</title>
  <meta name="description" content="Post RKS Mat" />

  <meta property="og:title" content={data.post.title} />
  <meta property="og:description" content="Post RKS Mat" />
  <meta property="og:image" content="https://rksmat.pl/logo-medium.webp" />
  <meta property="og:url" content="https://rksmat.pl/posts/{data.post.id}" />
  <meta property="og:type" content="website" />
  <meta property="og:locale" content="pl_PL" />
  <meta property="og:site_name" content="RKS Mat" />
</svelte:head>

<div
  class="mt-8 flex flex-col items-center w-full px-0 sm:px-12 lg:px-72 gap-2 mb-36"
>
  <div
    class="bg-surface-200-700-token p-4 w-full flex flex-col gap-2 shadow-lg rounded -md overflow-hidden"
  >
    <header
      class="text-token text-6xl w-full text-left flex flex-row items-center"
    >
      <span>{data.post.title}</span>
      <div class="ml-auto space-x-2 flex flex-row items-center">
        <!-- Each -->
        {#each data.tags as tag}
          <span class="chip variant-filled-primary">{tag.expand?.tag.name}</span
          >
        {/each}
      </div>
    </header>
    <hr class="w-full border-t-2" />
    <section class="dark:prose-invert prose !max-w-full h-fit">
      <PostContentViewer blocks={data.post.content} />
    </section>
    <footer
      class="w-auto text-token text-left p-4 bg-surface-200 dark:bg-surface-900 flex flex-row items-center gap-4 -mx-4 -mb-4"
    >
      <Avatar width="w-12" src={data.userAvatar} />
      <span class="text-xl">{data.post?.expand?.users.username}</span>
      <div class="flex flex-col items-center text-right ml-auto">
        <span>{dayjs(data.post.created).format("DD/MM/YY HH:mm:ss")}</span>
        {#if !dayjs(data.post.created).isSame(dayjs(data.post.updated), "date")}
          <span class="text-[8px] text-token brightness-50"
            >Edytowany: {dayjs(data.post.updated).format(
              "DD/MM/YY HH:mm:ss"
            )}</span
          >
        {/if}
      </div>
    </footer>
  </div>
</div>
