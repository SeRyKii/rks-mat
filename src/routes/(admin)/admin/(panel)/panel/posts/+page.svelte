<script lang="ts">
	import CustomPaginator from '$lib/CustomPaginator.svelte';
	import { onMount } from 'svelte';
	import type { PageData } from './$types';
	import { goto } from '$app/navigation';

	export let data: PageData;

	let page = {
		offset: 0,
		limit: 5,
		size: data.posts.totalItems,
		amounts: [5],
		modes: ['wszystko', 'opublikowane', 'nie skończone', 'w śmietniku']
	};

	function load(pageNumber: number, filter: string) {
		fetch('/admin/panel/posts/loadMore', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				page: pageNumber + 1,
				filter
			})
		})
			.then((res) => res.json())
			.then((data) => {
				paginatedPosts = [...data.items];
				page.size = parseInt(data.totalItems, 10);
			});
	}

	function onPageChange(e: CustomEvent): void {
		load(e.detail, '');
	}

	function onModeChange(e: CustomEvent): void {
		let nth = page.modes.indexOf(e.detail);
		if (nth != 0) {
			load(page.offset, `type = ${nth - 1}`);
		} else {
			load(page.offset, '');
		}
	}

	function newPost() {
		fetch('/admin/panel/posts/new', {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json'
			}
		})
			.then((res) => res.json())
			.then((data) => {
				goto(`/admin/panel/posts/${data.id}`);
			});
	}

	let paginatedPosts = [...data.posts.items];
</script>

<div class="w-full flex items-center justify-center">
	<div
		class="lg:w-3/4 p-5 bg-surface-200 dark:bg-surface-900 rounded-md flex flex-col items-center"
	>
		<h1>Aktualności</h1>
		<div class="p-5 bg-surface-200 dark:bg-surface-900 rounded-md w-full">
			<nav class="list-nav">
				<!-- (optionally you can provde a label here) -->
				<ul>
					{#each paginatedPosts as post}
						<li class="list-item">
							<a href={`/admin/panel/posts/${post.id}`}>
								<span class="badge bg-primary-500">-></span>
								<span class="flex-auto">{post.title}</span>
								<span
									class="chip transition-none variant-filled-{post.type == 0
										? 'primary'
										: post.type == 1
										? 'secondary'
										: 'error'}"
									>{post.type == 0
										? 'opublikowane'
										: post.type == 1
										? 'nie skończone'
										: 'w śmietniku'}</span
								>
							</a>
						</li>
					{/each}
					<div class="w-full bg-white/25 h-[1px] rounded-lg" />
					<li class="list-item overflow-hidden relative">
						<button on:click={newPost}>
							<span class="badge bg-primary-500">+</span>
							<span class="flex-auto">Dodaj nowy post</span>
						</button>
					</li>
				</ul>
			</nav>
		</div>
		<!-- divider -->
		<div class="w-full bg-white/25 h-[1px] rounded-lg my-4" />
		<CustomPaginator bind:settings={page} on:page={onPageChange} on:mode={onModeChange} />
	</div>
</div>
