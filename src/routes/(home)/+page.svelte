<script lang="ts">
  import { Avatar } from "@skeletonlabs/skeleton";
  import { onMount } from "svelte";
  import type { PageData } from "./$types";
  import { posts } from "$lib/stores";
  import { drawerStore } from "@skeletonlabs/skeleton";

  import BlogPosts from "./BlogPosts.svelte";
  import ConditionalLink from "$lib/ConditionalLink.svelte";
  import dayjs from "dayjs";
  import "dayjs/locale/pl";
  import relativeTime from "dayjs/plugin/relativeTime";

  dayjs.locale("pl");
  dayjs.extend(relativeTime);

  let currDate = dayjs();

  export let data: PageData;
  posts.set(data.posts.items);

  function getInitials(name: string) {
    const names = name.split(" ");
    let initials = names[0].substring(0, 1).toUpperCase();
    if (names.length > 1) {
      initials += names[names.length - 1].substring(0, 1).toUpperCase();
    }
    return initials;
  }

  onMount(() => {
    drawerStore.close();

    // paralax scrolling effect with scroling event
    // change --pos variable of bg element

    const bg = document.getElementById("bg");
    const pos = document.documentElement.style;
    pos.setProperty("--pos", `-${window.scrollY / 3}px`);
    const scroll = () => {
      pos.setProperty("--pos", `-${window.scrollY / 3}px`);
    };
    // request animation frame to throttle scroll event make it do it on scroll
    const raf = requestAnimationFrame;
    window.addEventListener("scroll", () => {
      raf(scroll);
    });
  });

  // Add status field to each tournament with either "planowany", "w trakie", "zakońcony"
  // based on the startDate and endDate of the tournament
  // Extend type of data.tournaments.items to include status field

  let tournaments: any = data.tournaments.items;

  tournaments.forEach((tournament: any, i: number) => {
    // pad toruanemnt name to 14 characters and add ... if it's longer
    if (tournament.name.length > 14) {
      tournaments[i].name = tournament.name.substring(0, 14) + "...";
    }
    const startDate = dayjs(tournament.startDate);
    const endDate = dayjs(tournament.endDate);
    if (startDate.isAfter(currDate)) {
      tournaments[i].status = "planowany";
    } else if (startDate.isBefore(currDate) && endDate.isAfter(currDate)) {
      tournaments[i].status = "w trakcie";
    } else if (endDate.isBefore(currDate)) {
      tournaments[i].status = "zakończony";
    }
  });
</script>

<div
  class="relative w-full min-h-[100vh] flex items-center dark:bg-surface-900"
>
  <div
    id="bg"
    class="absolute w-screen h-[100vh] brightness-150 dark:brightness-75"
    style="background-image: url('bg.webp'); clip-path: ellipse(50% 100% at 0% 20%); background-repeat: no-repeat; background-attachment: fixed; background-position: 50% calc(50% + var(--pos));"
  />
  <div class="flex flex-col ml-6 lg:ml-16 z-10 items-center gap-5">
    <span class="sm:text-6xl text-4xl drop-shadow-white drop-shadow-2xl">
      <b>Szachy - gimnastyka dla umysłu</b><br />Dołącz do Klubu Szachowego RKS
      "Mat"!
    </span>
    <a
      href="mailto:rksmat@gmail.com"
      class="btn variant-filled-primary px-5 py-4 text-token"
      >Dołącz do klubu!</a
    >
  </div>
  <div
    class="absolute top-0 right-[00%] transition-all h-[35vh] sm:h-[65vh] aspect-[2/5] md:translate-x-[-15vw] sm:translate-y-[5vh] translate-y-[17.5vh]"
  >
    <!-- center -->
    <img id="queen" class="opacity-0 hidden" src="/queen.webp" alt="queen" />
  </div>
</div>

<BlogPosts {data} />

<span class="text-4xl sm:text-6xl font-bold text-center mt-36 mb-4 block"
  >Instruktorzy</span
>
<div class="flex flex-col sm:flex-row w-screen min-h-[50vh] gap-2">
  <div class="flex flex-col items-center w-full px-4 sm:pl-12">
    <div class="w-full flex flex-row items-center">
      <span class="text-4xl text-right w-full mr-6">Marian Twardoń</span>
      <img
        src="/queen.webp"
        alt="Marian Twardoń"
        class="ml-auto aspect-square w-32"
      />
    </div>
    <span class="text-justify w-full">
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Omnis nesciunt
      dolorem vero sunt quo, dolore ipsum suscipit cumque magnam voluptatum
      incidunt neque explicabo maiores eius nostrum minima aliquid nulla
      perspiciatis.
    </span>
  </div>
  <span class="divider-vertical hidden sm:block" />
  <hr class="block sm:hidden" />
  <div class="flex flex-col items-center w-full px-4 sm:pr-12">
    <div class="w-full flex flex-row">
      <img src="" alt="Dariusz Smagacz" class="ml-auto aspect-square w-32" />
      <span class="text-4xl text-left w-full ml-6">Dariusz smagacz</span>
    </div>
  </div>
</div>

<div class="w-screen min-h-[50vh] text-center space-y-8">
  <div class="mt-36 w-full flex flex-col items-center gap-5">
    <span class="text-4xl sm:text-6xl font-bold text-center">Osiągnięcia</span>
    <div>
      <ul class="flex flex-col gap-2">
        {#each data.achievements.items as achievements}
          <ConditionalLink
            href={`/blog/${achievements.post}`}
            isWrapped={achievements.post != ""}
          >
            <div
              class="relative shadow-md rounded-sm overflow-hidden bg-surface-100 dark:bg-surface-800 p-3 sm:px-24 h-fit after:absolute after:h-[200%] after:w-4 after:right-5 after:top-[-50%] after:bg-[var(--color)] after:-rotate-45 !no-underline !text-token flex flex-row items-center justify-center"
              style={`--color: ${achievements.color}`}
            >
              <span class="text-2xl">{achievements.emoji}</span
              >{achievements.description}
            </div>
          </ConditionalLink>
        {/each}
      </ul>
    </div>
  </div>
</div>

<div class="w-screen min-h-[50vh] text-center space-y-8">
  <div class="mt-36 w-full flex flex-col items-center gap-5">
    <span class="text-6xl font-bold text-center">Turnieje</span>

    {#each tournaments as tournament}
      <div
        class="bg-surface-100-800-token flex flex-row items-center p-2 px-6 w-[100vw] sm:w-3/4 h-fit rounded-md shadow-lg gap-2"
      >
        <span class="text-md sm:text-3xl break-words">{tournament.name}</span>
        <div class="ml-auto flex flex-row gap-8 items-center h-3/4">
          <!-- Change status depending on startDate and endDate -->
          <span
            class="badge {tournament.status == 'planowany'
              ? 'variant-filled-primary'
              : tournament.status == 'w trakcie'
              ? 'variant-filled-secondary'
              : 'variant-filled-tertiary'}">{tournament.status}</span
          >
          <span class="text-token/10 text-sm sm:text-md hidden sm:block"
            >{tournament.status == "planowany"
              ? dayjs(tournament.startDate).fromNow(false)
              : dayjs(tournament.endDate).fromNow(false)}</span
          >
          <a
            href={tournament.link}
            target="_blank"
            class="btn variant-ghost-primary h-full">Chessarbiter</a
          >
        </div>
      </div>
    {/each}
  </div>
</div>

<style>
  @keyframes slideInRight {
    0% {
      transform: translateX(250%);
    }
    1% {
      opacity: 1;
    }
    100% {
      opacity: 1;
      transform: translateX(0);
    }
  }

  #queen {
    animation: 1s cubic-bezier(1, 0, 0, 1) 0.5s forwards slideInRight;
  }
</style>
