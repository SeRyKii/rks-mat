<script lang="ts">
	import '@skeletonlabs/skeleton/themes/theme-crimson.css';
	import { posts } from '$lib/stores';
	import { autoModeWatcher } from '@skeletonlabs/skeleton';
	import { Drawer, drawerStore } from '@skeletonlabs/skeleton';
	import '@skeletonlabs/skeleton/styles/all.css';
	import '../app.postcss';
	import { Toast } from '@skeletonlabs/skeleton';
	import { computePosition, autoUpdate, flip, shift, offset, arrow } from '@floating-ui/dom';
	import { storePopup } from '@skeletonlabs/skeleton';
	import { CalendarDays, Home, Icon, Newspaper, Phone, Photo, UserGroup } from 'svelte-hero-icons';
	storePopup.set({ computePosition, autoUpdate, flip, shift, offset, arrow });
	// import { autoModeWatcher } from '@skeletonlabs/skeleton';
</script>

<svelte:head>
	{@html `<script>${autoModeWatcher.toString()} autoModeWatcher();</script>`}
	<meta name="viewport" content="width=device-width, initial-scale=1" />
</svelte:head>

<!-- for some reason body goes down with the margin-top of child -->

<Toast />
<Drawer position="right">
	<div class="flex flex-col p-5 gap-1">
		<a href="/" class="w-full flex flex-row gap-1 items-center justify-center btn variant-ghost">
			<Icon src={Home} size="24px" class="text-token" />
			<span class="text-md text-token">Strona Główna</span>
		</a>
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
			<span>Aktualności</span>
		</a>
		<a
			href="/gallery"
			class="w-full flex flex-row gap-1 items-center justify-center btn variant-ghost"
			><span><Icon src={Photo} size="24px" /></span><span>Galeria</span></a
		>
		<a
			href="/about"
			class="w-full flex flex-row gap-1 items-center justify-center btn variant-ghost"
		>
			<span><Icon size="24px" src={UserGroup} /></span>
			<span>O nas</span>
		</a>
		<a href="/contact" class="w-full btn variant-filled-primary">
			<span><Icon size="24px" src={Phone} /></span>
			<span>Kontakt</span>
		</a>

		<hr class="my-4" />
		<h1 class="text-xl font-bold text-center">Aktualności</h1>
		{#each $posts as post}
			<a href={`/posts/${post.id}`} class="btn variant-soft-surface">
				<span>{post.title}</span>
			</a>
		{/each}
	</div>
</Drawer>

<slot />
