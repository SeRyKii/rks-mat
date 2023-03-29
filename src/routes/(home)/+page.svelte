<script>
	// @ts-nocheck

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

	// get first item with type "image" in .content

	onMount(() => {
		// paralax scrolling effect with scroling event
		// change --pos variable of bg element

		const bg = document.getElementById('bg');
		const pos = document.documentElement.style;
		const scroll = () => {
			pos.setProperty('--pos', `-${window.scrollY / 3}px`);
		};
		window.addEventListener('scroll', scroll);
	});
</script>

<div class="relative w-full h-[75vh] flex items-center dark:bg-surface-800">
	<div
		id="bg"
		class="absolute w-screen h-[75vh] dark:brightness-75"
		style="background-image: url('bg.jpg'); clip-path: ellipse(50% 100% at 100% 10%); background-repeat: no-repeat; background-attachment: fixed; background-position: 50% calc(50% + var(--pos));"
	/>
	<div class="flex flex-col ml-6 sm:ml-32  z-10 items-center gap-5">
		<span class="sm:text-6xl text-4xl">
			<b>Szachy - gimnastyka dla umysłu</b><br />Dołącz do Klubu Szachowego RKS "Mat"!
		</span>
		<a href="/kontakt" class="btn variant-filled-primary rounded-md px-5 py-4">Dołącz do klubu!</a>
	</div>
</div>
<div class="w-screen h-[75vh] px-12 text-center space-y-8">
	<div class="mt-36">
		<span class="text-6xl font-bold text-center">Aktualności</span>
	</div>
	<div class="grid grid-cols-1 sm:grid-cols-2 gap-5">
		{#each data.posts.items as post}
			<a class="card variant-filled-primary overflow-hidden" href={`/post/${post.id}`}>
				{#if post.content?.blocks?.filter((v) => v.type == 'image')[0].data.file.url != undefined}
					<header class="text-4xl card-header text-left aspect-[21/9] relative">
						<img
							class="w-full aspect-[21/9] absolute top-0 left-0 brightness-75"
							src={post.content?.blocks?.filter((v) => v.type == 'image')[0].data.file.url +
								'?thumb=1080x520'}
							alt=""
						/>
						<div class="relative z-10">
							{post.title}
						</div>
					</header>
				{:else}
					<header class="text-4xl card-header text-left relative pb-4">
						<div class="relative z-10">
							{post.title}
						</div>
					</header>
					<hr class="opacity-50" />
				{/if}
				<div
					class="overflow-hidden relative after:absolute after:w-full after:h-12 after:from-transparent after:to-white after:bg-gradient-to-b after:-bottom-5 after:left-0 "
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
						src={data.userAvatars.get(post.expand.users.id)}
						initials={getInitials(post.expand.users.username)}
						background="bg-transparent"
						border="border dark:border-white border-black"
						width="w-14"
					/>
					<div class="flex-auto flex justify-between items-center">
						<span>{post.expand.users.username}</span>
						<span
							>{`${new Date(post.created).getDate()}/${new Date(
								post.created
							).getMonth()}/${new Date(post.created).getFullYear()}`}</span
						>
					</div>
				</footer>
			</a>
		{/each}
	</div>
</div>
