<script lang="ts">
  import { AppShell, Avatar, drawerStore } from "@skeletonlabs/skeleton";
  import { AppBar } from "@skeletonlabs/skeleton";
  import type { PageData } from "./$types";
  import { LightSwitch } from "@skeletonlabs/skeleton";
  import { onMount } from "svelte";
  import {
    Icon,
    Home,
    Phone,
    CalendarDays,
    Newspaper,
    Bars3
  } from "svelte-hero-icons";
  export let data: PageData;

  console.log(data.user);
  function getInitials(name: string) {
    const names = name.split(" ");
    let initials = names[0].substring(0, 1).toUpperCase();
    if (names.length > 1) {
      initials += names[names.length - 1].substring(0, 1).toUpperCase();
    }
    return initials;
  }

  // mobile make menu appear when scrolling down
  let lastScrollTop = 0;
  let isScrolling = false;
  let isMenuVisible = true;

  function handleScroll() {
    const st = window.pageYOffset || document.documentElement.scrollTop;
    if (st > lastScrollTop) {
      isMenuVisible = false;
    } else {
      isMenuVisible = true;
    }
    lastScrollTop = st <= 0 ? 0 : st;
    isScrolling = false;
  }

  function handleScrollThrottled() {
    if (!isScrolling) {
      window.requestAnimationFrame(function () {
        handleScroll();
      });
    }
    isScrolling = true;
  }

  function openDrawer() {
    drawerStore.open();
  }

  $: positionClasses = $drawerStore.open ? "translate-x-[-50%]" : "";

  onMount(() => {
    window.addEventListener("scroll", handleScrollThrottled);
  });
</script>

<div
  class="{positionClasses} transition-all duration-150
"
>
  <div
    class="sticky w-full top-0 z-20 transition-all backdrop-opacity-40 duration-150 sm:!translate-y-0 dark:bg-black/40 bg-white/40 {isMenuVisible
      ? ''
      : 'translate-y-[-100%]'}"
  >
    <AppBar background="">
      <svelte:fragment slot="lead">
        <span
          ><img
            class="w-[64px] aspect-square rounded-md"
            src="/logo-medium.webp"
            alt="logo"
          /></span
        >
        <span>RKS "Mat"</span>
      </svelte:fragment>
      <svelte:fragment slot="trail">
        <div
          class="hidden sm:flex app-bar-slot-trail flex-none items-center space-x-4
"
        >
          <a href="/" class="flex flex-row gap-1 items-center justify-center"
            ><Icon src={Home} size="24px" class="text-token" /><span
              class="text-md text-tokn">Strona Główna</span
            ></a
          >
          <a
            href="/calendar"
            class="flex flex-row gap-1 items-center justify-center"
          >
            <span><Icon size="24px" src={CalendarDays} /></span>
            <span>Kalendarz</span>
          </a>
          <a
            href="/posts"
            class="flex flex-row gap-1 items-center justify-center"
          >
            <span><Icon size="24px" src={Newspaper} /></span>
            <span>Posty</span>
          </a>
          <a href="/contact" class="btn variant-filled-primary">
            <span><Icon size="24px" src={Phone} /></span>
            <span>Kontakt</span>
          </a>
        </div>
        <div class="block sm:hidden">
          <button class="btn variant-ghost" on:click={openDrawer}>
            <!-- Add icon Bars4 -->
            <Icon size="24px" src={Bars3} />
          </button>
        </div>
      </svelte:fragment>
    </AppBar>
  </div>
  <div
    class="min-h-[75vh] mb-24

"
  >
    <slot />
  </div>
  <div class="dark:bg-black/25 bg-black/5 w-full">
    <div class="flex flex-row items-center gap-2 p-4">
      <img src="/logo-medium.webp" class="w-12 h-12" alt="rks mat" />
      <div class="flex-col flex">
        <span class="text-base font-bold">RKS "Mat"</span>
        <span class=" text-sm">RKS "Mat" - klub sportowy</span>
      </div>
      <LightSwitch />
      <div class="ml-auto">
        <p class="text-base">Facebook</p>
        <p class="text-base">Kontakt</p>
        <p class="text-base">Kontakt</p>
      </div>
    </div>
    <hr />
  </div>
  <style>
  </style>
</div>
