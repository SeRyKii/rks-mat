<script lang="ts">
	import { onMount } from 'svelte';
	import { fade, fly } from 'svelte/transition';
	import { createEventDispatcher } from 'svelte';
	import { Envelope, Icon, Phone } from 'svelte-hero-icons';
	import { toastStore, type ToastSettings } from '@skeletonlabs/skeleton';

	const dispatch = createEventDispatcher();
	export let image: string;
	export let name: string;
	export let description: string;
	export let nth: number;
	export let active: boolean;
	export let email: string;
	export let phone: string = '';
	let styles = '';
	let height = 0;

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

	function copyEmail() {
		navigator.clipboard
			.writeText(email)
			.then(() => {
				let t = {
					timeout: 2000,
					message: 'Skopiowano!',
					background: 'bg-primary-500',
					autohide: true
				};

				toastStore.trigger(t);
			})
			.catch((err) => {
				let t = {
					timeout: 2000,
					message: err,
					background: 'bg-primary-500',
					autohide: true
				};

				toastStore.trigger(t);
			});
	}
	function copyPhone() {
		navigator.clipboard
			.writeText(phone)
			.then(() => {
				let t = {
					timeout: 2000,
					message: 'Skopiowano!',
					background: 'bg-primary-500',
					autohide: true
				};

				toastStore.trigger(t);
			})
			.catch((err) => {
				let t = {
					timeout: 2000,
					message: err,
					background: 'bg-primary-500',
					autohide: true
				};

				toastStore.trigger(t);
			});
	}

	let classes = '';
</script>

<div
	id={nth.toString()}
	style={styles}
	class="relative card overflow-hidden transition-all {classes} hover:scale-105 shadow-md shadow-surface-400 dark:shadow-surface-500"
	on:click={() => {
		active = true;
	}}
	on:keypress={() => {
		active = true;
	}}
>
	{#if !active}
		<header
			in:fly={{ y: 2000, duration: 500 }}
			out:fade
			class="card-header overflow-hidden aspect-[21/12] -m-4 mb-0"
		>
			<img class="w-full" src={image} alt={name} />
		</header>
		<hr />
		<section in:fly={{ y: 2000, duration: 500 }} out:fade class="p-4 flex flex-col">
			<span class="text-3xl font-bold whitespace-nowrap">{name}</span>
			<span class="text-justify">
				{description}
			</span>
		</section>
	{:else}
		<div
			in:fly={{ y: -2000, duration: 500 }}
			out:fade
			class="top-0 absolute w-full items-center logo-cloud flex flex-col gap-0.5"
		>
			<!-- svelte-ignore a11y-missing-attribute -->
			<a on:keydown={copyEmail} on:click={copyEmail} class="logo-item cursor-pointer">
				<span><Icon src={Envelope} size="20px" /></span>
				<span>{email}</span>
			</a>
			<!-- svelte-ignore a11y-missing-attribute -->
			{#if phone}
				<a on:keydown={copyPhone} on:click={copyPhone} class="logo-item cursor-pointer">
					<span><Icon src={Phone} size="20px" /></span>
					<span>{phone}</span>
				</a>
			{/if}
			<p class="w-full text-center text-xs text-opacity-50">Kliknij aby skopiować</p>
		</div>
	{/if}
</div>
