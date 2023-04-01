<script>
	// @ts-nocheck

	import PostCard from './PostCard.svelte';
	import PostContentViewer from '$lib/PostContentViewer.svelte';
	import { Avatar } from '@skeletonlabs/skeleton';
	import { stringify } from 'postcss';
	import { onMount } from 'svelte';

	function getInitials(name) {
		const names = name.split(' ');
		let initials = names[0].substring(0, 1).toUpperCase();
		if (names.length > 1) {
			initials += names[names.length - 1].substring(0, 1).toUpperCase();
		}
		return initials;
	}
	// import type { PageData } from './$types';
	export let data;
	let showMoreButton = false;
	function mouseenter() {
		showMoreButton = true;
		const btn = document.getElementById('btn-show-more');
		btn.style.opacity = '1';
		btn.style.bottom = '5rem';
		btn.style.scale = '1';

		// transform scale(0) to scale(1)

		btn.style.transform = 'scale(1)';
	}
	function mouseleave() {
		showMoreButton = false;
		const btn = document.getElementById('btn-show-more');
		btn.style.opacity = '0';
		btn.style.bottom = '0';
		// transform scale(1) to scale(0)
		btn.style.transform = 'scale(0)';
	}

	// get first item with type "image" in .content

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
		style="background-image: url('bg.jpg'); clip-path: ellipse(50% 100% at 100% 10%); background-repeat: no-repeat; background-attachment: fixed; background-position: 50% calc(50% + var(--pos));"
	/>
	<div class="flex flex-col ml-6 lg:ml-16  z-10 items-center gap-5">
		<span class="sm:text-6xl text-4xl">
			<b>Szachy - gimnastyka dla umysłu</b><br />Dołącz do Klubu Szachowego RKS "Mat"!
		</span>
		<a href="/kontakt" class="btn variant-filled-primary rounded-md px-5 py-4">Dołącz do klubu!</a>
	</div>
</div>
<div class="w-screen min-h-[75vh] text-center space-y-8">
	<div class="mt-36 w-full">
		<span class="text-6xl font-bold text-center">Aktualności</span>
	</div>
	<div
		class="relative after:absolute after:w-full after:h-96 after:z-10 after:from-transparent dark:after:to-surface-900 after:to-surface-50 after:bg-gradient-to-b after:bottom-0 after:left-0 after:pointer-events-none"
	>
		<div
			class="grid grid-cols-1 lg:grid-cols-2 justify-items-center gap-5 overflow-hidden h-[60vh] "
			on:mouseenter={mouseenter}
			on:mouseover={mouseenter}
			on:focus={mouseenter}
			on:mouseleave={mouseleave}
			on:blur={mouseleave}
			on:mouseout={mouseleave}
		>
			<a
				href="/posts"
				id="btn-show-more"
				class={`btn variant-ghost-secondary rounded-md absolute z-20 transition-all duration-300 ease-in-out md:opacity-0 scale-100 bottom-20 md:bottom-0`}
				>Pokaż więcej</a
			>
			<div class="flex flex-col w-full items-center lg:items-end gap-5">
				{#each data.posts.items as post, i}
					{#if i % 2 == 0}
						<PostCard {post} avatars={data.userAvatars} />
					{/if}
				{/each}
			</div>
			<div class="flex flex-col w-full items-center lg:items-start gap-5">
				{#each data.posts.items as post, i}
					{#if i % 2 != 0}
						<PostCard {post} avatars={data.userAvatars} />
					{/if}
				{/each}
			</div>
		</div>
	</div>
</div>
