<script lang="ts">
	import { onMount } from 'svelte';
	import { fade, fly } from 'svelte/transition';
	import { createEventDispatcher } from 'svelte';
	import { Envelope, Icon, Phone } from 'svelte-hero-icons';

	const dispatch = createEventDispatcher();
	export let image: string;
	export let name: string;
	export let description: string;
	export let nth: number = 1;
	export let active: boolean;
	export let email: string;
	let styles = '';
	let height: number = 0;

	onMount(() => {
		// get height of id = nth
		let el = document.getElementById(nth.toString());
		if (el) {
			height = el.clientHeight;
		}
	});

	$: active, calcClasses();

	function calcClasses() {
		if (!active) {
			classes = '';
			return;
		}

		dispatch('clicked');

		if (document.activeElement instanceof HTMLElement) {
			document.activeElement.blur();
		}

		switch (nth) {
			case 1: {
				classes = `!scale-105 sm:translate-x-1/2 sm:!scale-125 z-20`;
				styles = `height: ${height}px;`;
				break;
			}
			case 2: {
				classes = `!scale-105 sm:!scale-125 z-20`;
				styles = `height: ${height}px;`;
				break;
			}
			case 3: {
				classes = `!scale-105 sm:-translate-x-1/2 sm:!scale-125 z-20`;
				styles = `height: ${height}px;`;
				break;
			}
		}
	}

	let classes = '';
</script>

<div
	id={nth.toString()}
	style={styles}
	class="card overflow-hidden transition-all {classes} hover:scale-105 cursor-pointer shadow-md shadow-surface-400 dark:shadow-surface-500"
	on:click={() => {
		active = active !== true;
	}}
	on:keypress={() => {
		active = active !== true;
	}}
>
	{#if !active}
		<header
			in:fly={{ x: -2000, duration: 500 }}
			out:fade
			class="card-header overflow-hidden aspect-[21/12] -m-4 mb-0"
		>
			<img class="w-full" src={image} alt={name} />
		</header>
		<hr />
		<section in:fly={{ x: -2000, duration: 500 }} out:fade class="p-4 flex flex-col">
			<span class="text-3xl font-bold whitespace-nowrap">{name}</span>
			<span class="text-justify">
				{description}
			</span>
		</section>
	{:else}
		<div
			in:fly={{ x: -2000, duration: 500 }}
			class="w-auto logo-cloud grid-cols-1 xl:grid-cols-2 2xl:grid-cols-4 gap-0.5"
		>
			<a href="/elements/logo-clouds" class="logo-item">
				<span><Icon src={Envelope} /></span>
				<span>{email}</span>
			</a>
			<a href="/elements/logo-clouds" class="logo-item">
				<span><Icon src={Phone} /></span>
				<span>+48 884629596</span>
			</a>
		</div>
		<p class="w-full text-center text-xs">Kliknij aby skopiować</p>
	{/if}
</div>
