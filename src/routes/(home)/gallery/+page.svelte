<script lang="ts">
  import type {
    TournamentsByYearRecord,
    TournamentsResponse,
  } from "$lib/pb_types";
  import { onDestroy, onMount } from "svelte";
  import type { PageData } from "./$types";
  import { fade, fly } from "svelte/transition";

  export let data: PageData;

  let selected: number = -1;
  let displayedData: TournamentsByYearRecord[] = [];
  let height: number = 0;
  let width: number = 0;
  let top: number = 0;
  let left: number = 0;

  function fetchData() {}
</script>

<div class="grid-cols-1 sm:grid-cols-2 md:grid-cols-3 grid gap-2 p-2">
  {#each data.years.items as year, i}
    <div
      on:click={() => {
        if (selected == i) return;
        let el = document.getElementById(i.toString());
        if (el) {
          height = el.clientHeight;
          width = el.clientWidth;
          top = el.offsetTop;
          left = el.offsetLeft;
        }
        selected = i;
        // change url to gallery/year.year without reloading the page
        window.history.pushState({}, "", `/gallery/${year.year}`);

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
          window.history.pushState({}, "", `/gallery/${year.year}`);
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
          in:fly={{
            x: i % 3 == 0 ? -1000 : i % 3 == 2 ? 1000 : -1000,

            duration: 1000,
          }}
          class="w-full h-full flex flex-col items-start text-white {data.years
            .items.length > 1
            ? data.years.items.length > 2
              ? 'text-2xl'
              : 'text-4xl'
            : 'text-8xl'}"
          style={`background-image: url(${data.photos[i]}); background-size: cover; background-position: center;`}
        >
          <div class="w-full h-full backdrop-blur-[1px]">
            {year.year}
          </div>
        </span>
      {:else if selected == i}
        <div
          out:fly={{
            x: i % 3 == 0 ? -1000 : i % 3 == 2 ? 1000 : -1000,
            duration: 1000,
          }}
          class="absolute z-30 transition-all bg-surface-100-800-token rounded-md}"
          id={i + "child"}
          style={`top: ${top}px; left: ${left}px; width: ${width}px; height: ${height}px;`}
        >
          test
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
    on:click={() => {
      selected = -1;
      window.history.pushState({}, "", `/gallery`);
    }}
  />
{/if}
