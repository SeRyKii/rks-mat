<script lang="ts">
	import { Paginator } from '@skeletonlabs/skeleton';
	import { onMount } from 'svelte';
	import type { PageData } from './$types';
	import { goto } from '$app/navigation';
	import type { TagsResponse } from '$lib/pb_types';

	export let data: PageData;

	let settings = {
		offset: 0,
		limit: 5,
		size: data.tags.totalItems,
		amounts: [5]
	};

	function load(pageNumber: number, filter: string) {
		fetch('/admin/panel/tags/loadMore', {
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
				paginatedTags = [...data.items];
				settings.size = parseInt(data.totalItems, 10);
			});
	}

	function onPageChange(e: CustomEvent): void {
		load(e.detail, '');
	}

	function newTag() {
		fetch('/admin/panel/tags/new', {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json'
			}
		})
			.then((res) => res.json())
			.then((data) => {
				goto(`/admin/panel/tags/${data.id}`);
			});
	}

	let paginatedTags: TagsResponse | any = [...data.tags.items];
</script>

<div class="w-full flex items-center justify-center">
	<div
		class="lg:w-3/4 p-5 bg-surface-100 dark:bg-surface-800 rounded-md flex flex-col items-center"
	>
		<h1>Tagi</h1>
		<div class="p-5 bg-surface-100 dark:bg-surface-800 rounded-md w-full">
			<nav class="list-nav">
				<!-- (optionally you can provde a label here) -->
				<ul>
					{#each paginatedTags as post}
						<li class="list-item">
							<a href={`/admin/panel/tags/${post.id}`}>
								<span class="badge bg-primary-500">-></span>
								<span class="flex-auto">{post.name}</span>
							</a>
						</li>
					{/each}
					<div class="w-full bg-white/25 h-[1px] rounded-lg" />
					<li class="list-item overflow-hidden relative">
						<button on:click={newTag}>
							<span class="badge bg-primary-500">+</span>
							<span class="flex-auto">Dodaj nowy tag</span>
						</button>
					</li>
				</ul>
			</nav>
		</div>
		<!-- divider -->
		<div class="w-full bg-white/25 h-[1px] rounded-lg my-4" />
		<Paginator bind:settings on:page={onPageChange} />
	</div>
</div>
