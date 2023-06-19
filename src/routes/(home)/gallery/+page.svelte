<script lang="ts">
  import type {
    TournamentsByYearRecord,
    TournamentsByYearResponse,
    TournamentsResponse,
  } from "$lib/pb_types";
  import { onDestroy, onMount } from "svelte";
  import type { PageData } from "./$types";
  import { fade, fly } from "svelte/transition";
  import { ProgressRadial } from "@skeletonlabs/skeleton";
  import { cubicOut } from "svelte/easing";
  import { drawerStore } from "@skeletonlabs/skeleton";
  onMount(() => {
    drawerStore.close();
  });
  interface SlideScaleXYOptions {
    x?: number;
    y?: number;
    scaleFrom?: number;
    scaleTo?: number;
    duration?: number;
    delay?: number;
    easing?: (t: number) => number;
  }

  function slideScaleXY(
    node: HTMLElement,
    {
      x = 0,
      y = 0,
      scaleFrom = 1,
      scaleTo = 1,
      duration = 400,
      delay = 0,
      easing = cubicOut,
    }: SlideScaleXYOptions
  ) {
    const deltaX = x * scaleFrom;
    const deltaY = y * scaleFrom;

    console.log(closing);

    return {
      duration,
      delay,
      easing,
      css: (t: number, u: number) => {
        const currentScale = scaleFrom + (scaleTo - scaleFrom) * t;
        const currentX = x * u + deltaX * (1 - t);
        const currentY = y * u + deltaY * (1 - t);

        return `transform: translate(${currentX}px, ${currentY}px) scale(${currentScale}); z-index: 1000; position: relative; ${
          closing ? "" : "display: none; opacity: 0;"
        }`;
      },
    };
  }

  export let data: PageData;

  let selected = -1;
  let closing = false;
  let displayedData: Promise<TournamentsByYearResponse[]>;
  let displayedDataSelected = -1;
  let height = 0;
  let width = 0;
  let top = 0;
  let left = 0;
  let currentScale = 1;
  let childTop = 0;
  let childLeft = 0;

  async function fetchData(i: number) {
    try {
      displayedDataSelected = i;
      let res = await fetch("/gallery/year", {
        method: "POST",
        body: JSON.stringify({
          year: data.years.items[selected].year,
        }),
      });

      let json: Promise<TournamentsByYearResponse[]> = await res.json();
      return json;
    } catch (e) {
      displayedDataSelected = -1;
      return [];
    }
  }
</script>

<div class="grid-cols-1 sm:grid-cols-2 md:grid-cols-3 grid gap-2 p-2" id="page">
  {#each data.years.items as year, i}
    <div
      on:click={() => {
        if (selected == i) return;
        selected = i;
        if (displayedDataSelected != i) displayedData = fetchData(i);
        closing = false;
        let el = document.getElementById(i.toString());
        if (el) {
          height = el.clientHeight;
          width = el.clientWidth;
          top = el.offsetTop;
          left = el.offsetLeft;
        }
        // change url to gallery/year.year without reloading the page
        //window.history.pushState({}, "", `/gallery/${year.year}`);

        setTimeout(() => {
          let el1 = document.getElementById(i + "child");
          if (el1) {
            let rect = el1.getBoundingClientRect();
            let centerX = window.innerWidth / 2;
            let centerY = window.innerHeight / 2;
            let translateX = centerX - rect.left - rect.width / 2;
            let translateY = centerY - rect.top - rect.height / 2;
            // scale depending on phone, tablet, desktop
            // phone scale = 1
            // tablet scale = 1.5
            // desktop scale = 2
            let scale = 1;
            if (window.innerWidth < 640) {
              scale = 1;
            } else if (window.innerWidth < 1024) {
              scale = 1.5;
            } else {
              scale = 2;
            }
            currentScale = scale;
            el1.style.transform = `translate(${translateX}px, ${translateY}px) scale(${scale})`;
          }
        }, 1);
      }}
      on:keydown={(e) => {
        if (e.key == i.toString(10)) {
          let el = document.getElementById(i.toString());

          if (el) {
            height = el.clientHeight;
            width = el.clientWidth;
          }
          selected = i;
          //window.history.pushState({}, "", `/gallery/${year.year}`);
        }
      }}
      id={i.toString(10)}
      class="{selected != i
        ? ''
        : ''} w-auto aspect-[20/12] rounded-md transition-all"
    >
      {#if selected != i}
        <!-- if i % 3 = 0 in:fly from left =1 fade =2 fly from right -->
        <span
          in:slideScaleXY={{
            x: childLeft,
            y: childTop,
            scaleFrom: currentScale,
            scaleTo: 1,
            duration: 400,
            delay: 0,
            easing: cubicOut,
          }}
          class="w-full h-full flex flex-col items-start rounded-md overflow-hidden transition-all hover:scale-105 shadow-lg dark:shadow-surface-600 hover:brightness-105 cursor-pointer text-white {data
            .years.items.length > 1
            ? data.years.items.length > 2
              ? 'text-2xl'
              : 'text-4xl'
            : 'text-8xl'}"
          style={`background-image: url(${data.photos[i]}); background-size: cover; background-position: center;`}
        >
          <div
            class="w-full h-full flex justify-center items-center backdrop-blur-[1px]"
          >
            <span class="text-8xl font-bold block z-10">{year.year}</span>
          </div>
        </span>
      {:else if selected == i}
        <div
          class="absolute z-30 transition-all bg-surface-200-800-token rounded-md flex flex-col items-center justify-center"
          id={i + "child"}
          style={`top: ${top}px; left: ${left}px; width: ${width}px; height: ${height}px;`}
        >
          <div
            class="w-full h-full bg-surface-200-800-token overflow-x-scroll block"
          >
            <div
              class="w-full grid-cols-1 bg-surface-200-800-token sm:grid-cols-2 gap-1 grid overflow-x-scroll h-fit p-2 no-underline"
            >
              {#await displayedData}
                {#each Array(2) as _}
                  <div
                    class="placeholder animate-pulse aspect-[20/12] w-full rounded-md overflow-hidden h-full"
                  />
                {/each}
              {:then tournaments}
                {#each tournaments as tournament}
                  <a
                    on:click={() => {
                      closing = false;
                      let el = document.getElementById(selected.toString());
                      if (el) {
                        el.style.display = "none";
                      }
                      let page = document.getElementById("page");
                      if (page) {
                        page.style.display = "none";
                      }
                    }}
                    style="background-image: url({tournament.photo}); background-size: cover; background-position: center; text-decoration: none;"
                    class="aspect-[20/12] w-full rounded-md overflow-hidden text-center no-underline"
                    href={`/gallery/${tournament.year}/${tournament.id}`}
                  >
                    <span
                      class="bg-surface-50-900-token text-token text-md sm:text-md md:text-sm lg:text-xl w-full h-fit block no-underline"
                      >{tournament.name}</span
                    >
                  </a>
                {/each}
              {/await}
            </div>
          </div>
        </div>
      {/if}
    </div>
    {#if selected == i}
      <!-- <div class="w-[{width}px] h-[{height}px]" /> -->
    {/if}
  {/each}
</div>

{#if selected != -1}
  <div
    out:fade
    class="fixed inset-0 bg-black bg-opacity-50 z-10"
    on:keydown={() => {
      return;
    }}
    on:click={() => {
      let el1 = document.getElementById(selected + "child");
      let el = document.getElementById(selected.toString());
      closing = true;
      if (el1) {
        // get offsets position relative to the viewport
        const rect = el1.getBoundingClientRect();
        let centerX = window.innerWidth / 2;
        let centerY = window.innerHeight / 2;
        childLeft =
          centerX -
          (rect.left + rect.width / 2) +
          (centerX - (left + width / 2)) / 2.5;
        childTop =
          centerY -
          (rect.top + rect.height / 2) +
          (centerY - (top + height / 2)) / 2.5;
      }
      selected = -1;
    }}
  />
{/if}
