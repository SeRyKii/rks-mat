<script lang="ts">
  import Trainer from "$lib/Trainer.svelte";
  import { inview } from "svelte-inview";
  import { gsap } from "gsap";
  import { Avatar } from "@skeletonlabs/skeleton";
  import { onMount } from "svelte";
  import type { PageData } from "./$types";
  import { posts } from "$lib/stores";
  import { drawerStore } from "@skeletonlabs/skeleton";

  import BlogPosts from "$lib/BlogPosts.svelte";
  import ConditionalLink from "$lib/ConditionalLink.svelte";
  import dayjs from "dayjs";
  import "dayjs/locale/pl";
  import relativeTime from "dayjs/plugin/relativeTime";
  import WaveBorder from "$lib/WaveBorder.svelte";
  import EmojiAnimation from "$lib/EmojiAnimation.svelte";
  dayjs.locale("pl");
  dayjs.extend(relativeTime);

  let currDate = dayjs();
  let active1 = false;
  let active2 = false;
  let active3 = false;
  let vw = 0;

  export let data: PageData;

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
  });

  let y = 0;

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

  let bg: HTMLDivElement;
  let pos = 0;
</script>

<div
  class="w-screen h-screen fixed top-0 left-0 backdrop-blur-sm backdrop-brightness-50 z-10 {active1 ||
  active2 ||
  active3
    ? 'block'
    : 'hidden'}"
  on:keydown={() => {
    if (active1) {
      active1 = false;
    } else if (active2) {
      active2 = false;
    } else if (active3) {
      active3 = false;
    }
  }}
  on:click={() => {
    if (active1) {
      active1 = false;
    } else if (active2) {
      active2 = false;
    } else if (active3) {
      active3 = false;
    }
  }}
/>

<svelte:head>
  <title>Strona Główna</title>
  <meta
    name="description"
    content="Strona główna RKS Mat - Klubu Szachowego działającego przy Ul. Sztygarskiej 9 w Rudzie Śląskiej"
  />

  <meta property="og:title" content="Strona Główna" />
  <meta
    property="og:description"
    content="Strona główna RKS Mat - Klubu Szachowego działającego przy Ul. Sztygarskiej 9 w Rudzie Śląskiej"
  />
  <meta property="og:image" content="https://rksmat.pl/logo-medium.webp" />
  <meta property="og:url" content="https://rksmat.pl/" />
  <meta property="og:type" content="website" />
  <meta property="og:locale" content="pl_PL" />
  <meta property="og:site_name" content="RKS Mat" />
</svelte:head>

<svelte:window bind:scrollY={y} bind:innerWidth={vw} />

<div
  class="relative w-full min-h-[100vh] flex items-center dark:bg-primary-900 bg-primary-900 -mt-28 oveflow-y-hidden"
>
  <div
    class="absolute w-10/12 h-screen overflow-hidden dark:brightness-75"
    style="clip-path: ellipse(50% 100% at 0% 20%);"
  >
    <img
      src="bg.webp"
      alt=""
      bind:this={bg}
      style="transform: translate3d(0px, {y * 0.3}px, 0px) scale(1.5);"
      class="will-change-transform h-full"
    />
  </div>
  <div class="flex flex-col ml-6 lg:ml-16 z-10 items-center gap-5 w-full">
    <span
      class="sm:text-6xl text-4xl drop-shadow-white drop-shadow-2xl text-center text-dark-token"
    >
      <b>Szachy - gimnastyka dla umysłu</b><br />Dołącz do Klubu Szachowego<br
      />RKS "Mat"!
    </span>
    <a href="/contact" class="btn variant-filled-primary px-5 py-4 text-token"
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

<WaveBorder
  rotate
  waveColors={["fill-primary-700", "fill-primary-800", "fill-primary-900"]}
/>

<EmojiAnimation emojis={["📰", "📣", "📝", "📩", "📬", "📫", "📭"]}>
  <BlogPosts {data} />
</EmojiAnimation>
<div class="mt-24" />

<WaveBorder
  waveColors={[
    "dark:fill-secondary-700 fill-secondary-200",
    "dark:fill-secondary-800 fill-secondary-300",
    "dark:fill-secondary-900 fill-secondary-400",
  ]}
/>
<div class="w-full bg-secondary-400 dark:bg-secondary-900 py-8">
  <span class="text-4xl sm:text-6xl font-bold text-center mb-4 block"
    >Szkoleniowcy</span
  >
  <div
    class="w-screen gap-2 grid grid-cols-1 sm:grid-cols-3 sm:grid-flow-col {!active1 &&
    !active2 &&
    !active3
      ? 'min-h-[0]'
      : ''} justify-center p-4"
  >
    <Trainer
      image="mt.webp"
      name="Marian Twardoń"
      description="Mistrz Fide, trener klasy pierwszej. Wśród jego wychowanków nie brakuje medalistów Mistrzostw Śląska i Mistrzostw Polski Juniorów. W ponad 30-letniej pracy szkoleniowej prowadził wiele drużyn ze Śląska i Małopolski, osiągając z nimi sukcesy, m.in. brązowy medal Górnika Zabrze w DMP Juniorów w 1995 r."
      nth={1}
      email="mtwardon@interia.pl"
      bind:active={active1}
      on:clicked={() => {
        active2 = false;
        active3 = false;
      }}
    />
    <Trainer
      image="ah.webp"
      name="Anna Hampel"
      description="Instruktorka szachowa, wychowanka naszego Klubu. Wielokrotna medalistka Mistrzostw Śląska i uczestniczka finałów Mistrzostw Polski."
      nth={2}
      email="aniahampel8@gmail.com"
      bind:active={active2}
      on:clicked={() => {
        active1 = false;
        active3 = false;
      }}
    />
    <Trainer
      image="ds.webp"
      name="Dariusz Smagacz"
      description="Kandydat na mistrza krajowego, instruktor szachowy. W przeszłości jeden z trenerów utytułowanej drużyny juniorskiej KŚ AZS Politechniki Śląskiej Gliwice. Wciąż czynny zawodnik, kapitan naszej drużyny seniorskiej."
      nth={3}
      email="dariuszszachista@onet.pl"
      bind:active={active3}
      on:clicked={() => {
        active2 = false;
        active1 = false;
      }}
    />
  </div>
</div>
<WaveBorder
  rotate
  waveColors={[
    "dark:fill-secondary-700 fill-secondary-200",
    "dark:fill-secondary-800 fill-secondary-300",
    "dark:fill-secondary-900 fill-secondary-400",
  ]}
/>
<EmojiAnimation
  emojis={["🏆", "🎖️", "🥇", "🎗️", "🌟"]}
  resizeYMultipler={0.8}
  resizeXMultiplier={0.8}
  middle={3}
  classes="-z-20"
>
  <div class="w-screen min-h-[50vh] text-center space-y-8">
    <div class="mt-36 w-full flex flex-col items-center gap-5">
      <span class="text-4xl sm:text-6xl font-bold text-center">Osiągnięcia</span
      >
      <div>
        <ul class="flex flex-col gap-2">
          {#each data.achievements.items as achievements}
            <ConditionalLink
              href={`/blog/${achievements.post}`}
              isWrapped={achievements.post != ""}
            >
              <div
                class="relative shadow-md rounded-sm overflow-hidden bg-surface-200 dark:bg-surface-900 p-3 sm:px-24 h-fit after:absolute after:h-[200%] after:w-4 after:right-5 after:top-[-50%] after:bg-[var(--color)] after:-rotate-45 !no-underline !text-token flex flex-row items-center justify-center"
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
</EmojiAnimation>

<div class="mt-36" />

<WaveBorder
  waveColors={[
    "dark:fill-secondary-700 fill-secondary-200",
    "dark:fill-secondary-800 fill-secondary-300",
    "dark:fill-secondary-900 fill-secondary-400",
  ]}
/>
<EmojiAnimation
  emojis={["🏆", "🎮", "🏅", "🎌", "🥊"]}
  resizeXMultiplier={1.2}
  rotationMultiplier={0.05}
  resizeYMultipler={0.7}
  classes="!z-10 absolute"
>
  <div
    class="relative block max-w-[100vw] min-h-[50vh] text-center space-y-8 overflow-hidden"
  >
    <div
      class="absolute w-screen h-screen bg-secondary-400 dark:bg-secondary-900 -z-20"
    />
    <div class="mb-24 w-full flex flex-col items-center gap-2">
      <span class="text-6xl font-bold text-center">Turnieje</span>

      {#each tournaments as tournament}
        <div
          class="z-20 relative bg-surface-50-900-token flex flex-row items-center p-2 px-6 w-screen sm:w-3/4 h-fit rounded-md shadow-lg gap-2 justify-around"
        >
          <span class="text-sm sm:text-3xl whitespace-nowrap"
            >{tournament.name.length > 15
              ? tournament.name.slice(0, 15) + "..."
              : tournament.name}</span
          >
          <!-- <div class="ml-auto flex flex-row gap-8 items-center h-3/4">
          Change status depending on startDate and endDate -->
          <div class="ml-auto flex items-center justify-center gap-2">
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
              class="btn variant-ghost-primary sm:h-full">Chessarbiter</a
            >
          </div>
        </div>
        <!-- </div> -->
      {/each}
    </div>
  </div>
</EmojiAnimation>

<div
  class="absolute -bottom-16 -z-20 w-full h-48 bg-secondary-400 dark:bg-secondary-900"
/>
