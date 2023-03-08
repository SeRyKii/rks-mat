<script lang="ts">
	import CustomPaginator from '$lib/CustomPaginator.svelte';
	import { onMount } from 'svelte';
	import type { PageData } from './$types';

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
		console.log(nth);
		if (nth != 0) {
			load(page.offset, `type = ${nth - 1}`);
		} else {
			load(page.offset, '');
		}
	}

	let paginatedPosts = [...data.posts.items];
</script>

<div class="w-full flex items-center justify-center mt-10">
	<div class="w-1/3 p-5 bg-surface-800 rounded-md">
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
									? 'success'
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
			</ul>
		</nav>
		<!-- divider -->
		<div class="w-full bg-white/25 h-[1px] rounded-lg my-4" />
		<CustomPaginator bind:settings={page} on:page={onPageChange} on:mode={onModeChange} />
	</div>
</div>
