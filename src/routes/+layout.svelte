<script>
	import '@skeletonlabs/skeleton/themes/theme-crimson.css';
	import { Drawer, drawerStore } from '@skeletonlabs/skeleton';
	import '@skeletonlabs/skeleton/styles/all.css';
	import '../app.postcss';
	import { Toast } from '@skeletonlabs/skeleton';
	import { computePosition, autoUpdate, flip, shift, offset, arrow } from '@floating-ui/dom';
	import { storePopup } from '@skeletonlabs/skeleton';
	import { CalendarDays, Home, Icon, Newspaper, Phone } from 'svelte-hero-icons';
	storePopup.set({ computePosition, autoUpdate, flip, shift, offset, arrow });
	// import { autoModeWatcher } from '@skeletonlabs/skeleton';
</script>

<!-- <svelte:head
	>{@html `<script>${autoModeWatcher.toString()} autoModeWatcher();</script>`}</svelte:head
> -->
<svelte:head>
	<title>RKS "Mat"</title>
	<meta name="viewport" content="width=device-width, initial-scale=1" />
	<meta name="description" content="Klubowa strona klubu RKS 'Mat'" />
</svelte:head>

<Toast />
<Drawer>
	<div class="flex flex-col p-5 gap-1">
	<a href="/" class="w-full flex flex-row gap-1 items-center justify-center btn variant-ghost"
          ><Icon src={Home} size="24px" class="text-token" /><span
            class="text-md text-tokn">Strona Główna</span
          ></a
        >
        <a
          href="/calendar"
          class="w-full flex flex-row gap-1 items-center justify-center btn variant-ghost"
        >
          <span><Icon size="24px" src={CalendarDays} /></span>
          <span>Kalendarz</span>
        </a>
        <a
          href="/posts"
          class="w-full flex flex-row gap-1 items-center justify-center btn variant-ghost"
        >
          <span><Icon size="24px" src={Newspaper} /></span>
          <span>Posty</span>
        </a>
        <a href="/contact" class="w-full btn variant-filled-primary">
          <span><Icon size="24px" src={Phone} /></span>
          <span>Kontakt</span>
        </a>
      </div>
</Drawer>

<slot />
