<script lang="ts">
	import { AppShell, Avatar } from '@skeletonlabs/skeleton';
	import { AppBar } from '@skeletonlabs/skeleton';
	import type { PageData } from './$types';
	import { LightSwitch } from '@skeletonlabs/skeleton';
	import { onMount } from 'svelte';

	export let data: PageData;

	function getInitials(name: string) {
		const names = name.split(' ');
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

	onMount(() => {
		window.addEventListener('scroll', handleScrollThrottled);
	});
</script>

<div
	class="fixed w-full z-20 transition-all ease-in-out duration-300 sm:!translate-y-0 {isMenuVisible
		? ''
		: 'translate-y-[-100%]'}"
>
	<AppBar background="dark:bg-black/40">
		<svelte:fragment slot="lead">
			<span
				><img class="w-[64px] aspect-square rounded-md" src="/logo-medium.webp" alt="logo" /></span
			>
			<span>RKS "Mat"</span>
		</svelte:fragment>
		<svelte:fragment slot="trail">
			<a href="/">Strona główna</a>

			{#if data.user}
				<a href="/admin"
					><Avatar src={data.user.avatarUrl} initials={getInitials(data.user.username)} /></a
				>
			{/if}
			<LightSwitch />
		</svelte:fragment>
	</AppBar>
</div>
<slot />
<div class="dark:bg-black/25 bg-black/5 w-full">
	<div class="flex flex-row items-center gap-2 p-4">
		<img src="/logo-medium.webp" class="w-12 h-12" alt="rks mat" />
		<div class="flex-col flex">
			<span class="text-base font-bold">RKS "Mat"</span>
			<span class=" text-sm">RKS "Mat" - klub sportowy</span>
		</div>
		<div class="ml-auto">
			<p class="text-base">Facebook</p>
			<p class="text-base">Kontakt</p>
			<p class="text-base">Kontakt</p>
		</div>
	</div>
	<hr />
</div>

<!-- ---- / ---- -->

<style>
</style>
