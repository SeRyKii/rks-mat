<script>
	// @ts-nocheck

	import PostContentViewer from '$lib/PostContentViewer.svelte';
	import { Avatar } from '@skeletonlabs/skeleton';
	import { onMount } from 'svelte';

	function getInitials(name) {
		const names = name.split(' ');
		let initials = names[0].substring(0, 1).toUpperCase();
		if (names.length > 1) {
			initials += names[names.length - 1].substring(0, 1).toUpperCase();
		}
		return initials;
	}

	export let post;
	export let avatars;
</script>

<a class="card variant-filled-primary overflow-hidden h-fit w-3/4" href={`/post/${post.id}`}>
	<header class="text-5xl card-header pb-4 text-left aspect-[21/9] relative w-full">
		{#if post.content?.blocks?.filter((v) => v.type == 'image')[0]?.data.file.url != undefined}
			<img
				class="w-full aspect-[21/9] absolute top-0 left-0 brightness-75"
				src={post.content?.blocks?.filter((v) => v.type == 'image')[0].data.file.url +
					'?thumb=560x240'}
				alt=""
				loading="lazy"
			/>
		{/if}
		<span class="relative z-10 flex items-center h-full">
			{post.title}
		</span>
	</header>
	<hr class="opacity-50" />
	<div
		class="overflow-hidden relative after:absolute after:w-full after:h-64 after:from-transparent after:to-white after:bg-gradient-to-b after:-bottom-48 after:left-0 "
	>
		<div class="bg-inherit max-h-56 overflow-hidden ">
			<PostContentViewer blocks={post.content} />
		</div>
	</div>
	<hr class="opacity-50 bg-white" />
	<footer
		class="p-4 flex justify-start items-center space-x-4 dark:bg-surface-800 bg-surface-100 text-black dark:text-white"
	>
		<Avatar
			src={avatars.get(post.expand.users.id) + '?thumb=260x260'}
			initials={getInitials(post.expand.users.username)}
			background="bg-transparent"
			border="border dark:border-white border-black"
			width="w-14"
		/>
		<div class="flex-auto flex justify-between items-center">
			<span>{post.expand.users.username}</span>
			<span
				>{`${new Date(post.created).getDate()}/${new Date(post.created).getMonth()}/${new Date(
					post.created
				).getFullYear()}`}</span
			>
		</div>
	</footer>
</a>
