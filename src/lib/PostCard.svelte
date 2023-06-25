<script lang="ts">
	import PostContentViewer from '$lib/PostContentViewer.svelte';
	import type { PostsResponse, UsersResponse } from '$lib/pb_types';
	import { Avatar } from '@skeletonlabs/skeleton';
	import dayjs from 'dayjs';
	// import polish locale
	import 'dayjs/locale/pl';
	// relatice time
	import relativeTime from 'dayjs/plugin/relativeTime';
	import { onMount } from 'svelte';
	// initialize locale
	dayjs.locale('pl');
	// initialize plugin
	dayjs.extend(relativeTime);
	function getInitials(name: string): string {
		const names = name.split(' ');
		let initials = names[0].substring(0, 1).toUpperCase();
		if (names.length > 1) {
			initials += names[names.length - 1].substring(0, 1).toUpperCase();
		}
		return initials;
	}

	export let post: PostsResponse<{ blocks: any[] }, { users: UsersResponse }>;
	export let avatars: Map<string, string>;
</script>

<a class="card variant-filled-primary overflow-hidden h-fit w-3/4" href={`/posts/${post.id}`}>
	<header
		class="text-5xl card-header pb-4 text-left h-fit relative bg-surface-200 dark:bg-surface-900"
	>
		{#if post.content?.blocks?.filter((v) => v.type == 'image')[0]?.data.file.url != undefined}
			<img
				class="w-full aspect-[21/9] absolute top-0 left-0 brightness-75"
				src={post.content?.blocks?.filter((v) => v.type == 'image')[0].data.file.url +
					'?thumb=560x240'}
				alt=""
				loading="lazy"
			/>
		{/if}
		<span class="relative z-10 flex items-center h-full text-token">
			{post.title}
		</span>
	</header>
	<hr class="opacity-50" />
	<div
		class="overflow-hidden relative after:absolute after:w-full after:h-64 after:from-transparent after:to-surface-100 dark:after:to-surface-900 after:bg-gradient-to-b after:-bottom-48 after:left-0"
	>
		<div class="bg-inherit max-h-36 overflow-hidden p-4">
			<PostContentViewer blocks={post.content} />
		</div>
	</div>
	<hr class="opacity-50 bg-white" />
	<footer
		class="p-4 flex justify-start items-center space-x-4 dark:bg-surface-900 bg-surface-200 text-black dark:text-white"
	>
		<Avatar
			src={avatars.get(post.expand?.users.id || '') + '?thumb=260x260'}
			initials={getInitials(post.expand?.users.username || '')}
			background="bg-transparent"
			border="border dark:border-white border-black"
			width="w-14"
		/>
		<div class="flex-auto flex justify-between items-center">
			<span>{post.expand?.users.username}</span>
			<span>{dayjs(post.created).fromNow(false)}</span>
		</div>
	</footer>
</a>
