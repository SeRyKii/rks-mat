<script lang="ts">
	import PostCard from './PostCard.svelte';

	let showMoreButton = false;
	export let data: any;
	function mouseenter() {
		showMoreButton = true;
		const btn = document.getElementById('btn-show-more') as HTMLElement;
		btn.style.opacity = '1';
		btn.style.bottom = '5rem';
		btn.style.scale = '1';

		// transform scale(0) to scale(1)

		btn.style.transform = 'scale(1)';
	}
	function mouseleave() {
		showMoreButton = false;
		const btn = document.getElementById('btn-show-more') as HTMLElement;
		btn.style.opacity = '0';
		btn.style.bottom = '0';
		// transform scale(1) to scale(0)
		btn.style.transform = 'scale(0)';
	}
</script>

<div class="w-screen min-h-[75vh] text-center space-y-8">
	<div class="mt-36 w-full">
		<span class="text-6xl font-bold text-center">Aktualności</span>
	</div>
	<div
		class="relative after:absolute after:w-full after:h-96 after:z-10 after:from-transparent dark:after:to-surface-900 after:to-surface-50 after:bg-gradient-to-b after:bottom-0 after:left-0 after:pointer-events-none"
	>
		<div
			class="grid grid-cols-1 lg:grid-cols-2 justify-items-center gap-5 overflow-hidden h-[60vh]"
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
				class={`btn variant-ghost-secondary absolute z-20 transition-all duration-300 ease-in-out md:opacity-0 scale-100 bottom-20 md:bottom-0`}
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
