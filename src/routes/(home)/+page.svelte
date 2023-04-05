<script lang="ts">
	import { Avatar } from '@skeletonlabs/skeleton';
	import { onMount } from 'svelte';
	import type { PageData } from './$types';
	import BlogPosts from './BlogPosts.svelte';

	export let data: PageData;

	function getInitials(name: String) {
		const names = name.split(' ');
		let initials = names[0].substring(0, 1).toUpperCase();
		if (names.length > 1) {
			initials += names[names.length - 1].substring(0, 1).toUpperCase();
		}
		return initials;
	}

	onMount(() => {
		// paralax scrolling effect with scroling event
		// change --pos variable of bg element

		const bg = document.getElementById('bg');
		const pos = document.documentElement.style;
		pos.setProperty('--pos', `-${window.scrollY * 2}px`);
		const scroll = () => {
			pos.setProperty('--pos', `-${window.scrollY / 3}px`);
		};
		window.addEventListener('scroll', scroll);
	});
</script>

<div class="relative w-full min-h-[75vh] flex items-center dark:bg-surface-900">
	<div
		id="bg"
		class="absolute w-screen h-[75vh] dark:brightness-75"
		style="background-image: url('bg.webp'); clip-path: ellipse(50% 100% at 100% 10%); background-repeat: no-repeat; background-attachment: fixed; background-position: 50% calc(50% + var(--pos));"
	/>
	<div class="flex flex-col ml-6 lg:ml-16  z-10 items-center gap-5">
		<span class="sm:text-6xl text-4xl">
			<b>Szachy - gimnastyka dla umysłu</b><br />Dołącz do Klubu Szachowego RKS "Mat"!
		</span>
		<a href="/kontakt" class="btn variant-filled-primary rounded-md px-5 py-4">Dołącz do klubu!</a>
	</div>
</div>

<BlogPosts {data} />

<div>
	<div class="w-screen min-h-[75vh] text-center space-y-8">
		<div class="mt-36 w-full">
			<span class="text-6xl font-bold text-center">Osiągniecia</span>
		</div>
	</div>
</div>
