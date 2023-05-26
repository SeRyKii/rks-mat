<script lang="ts">
	import { Paginator } from '@skeletonlabs/skeleton';
	import { onMount } from 'svelte';
	import type { PageData } from './$types';
	import { goto } from '$app/navigation';
	import type { TournamentsResponse } from '$lib/pb_types';

	export let data: PageData;

	let settings = {
		offset: 0,
		limit: 5,
		size: data.tournaments.totalItems,
		amounts: [5]
	};

	function load(pageNumber: number, filter: string) {
		fetch('/admin/panel/tournaments/loadMore', {
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
				settings.size = parseInt(data.totalItems, 10);
			});
	}

	function onPageChange(e: CustomEvent): void {
		load(e.detail, '');
	}

	function newPost() {
		fetch('/admin/panel/tournaments/new', {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json'
			}
		})
			.then((res) => res.json())
			.then((data) => {
				goto(`/admin/panel/tournaments/${data.id}`);
			});
	}

	let paginatedPosts: TournamentsResponse | any = [...data.tournaments.items];

	$: paginatedPosts.forEach((post: any) => {
		// assign type depending on start date and end date
		// 0 = ongoing, 1 = upcoming, 2 = past
		const now = new Date();
		const startDate = new Date(post.startDate || '');
		const endDate = new Date(post.endDate || '');

		if (startDate > now) {
			post.type = 1;
		} else if (startDate < now && endDate > now) {
			post.type = 0;
		} else {
			post.type = 2;
		}
	});
</script>

<div class="w-full flex items-center justify-center">
	<div
		class="lg:w-3/4 p-5 bg-surface-100 dark:bg-surface-800 rounded-md flex flex-col items-center"
	>
		<h1>Turnieje</h1>
		<div class="p-5 bg-surface-100 dark:bg-surface-800 rounded-md w-full">
			<nav class="list-nav">
				<!-- (optionally you can provde a label here) -->
				<ul>
					{#each paginatedPosts as post}
						<li class="list-item">
							<a href={`/admin/panel/tournaments/${post.id}`}>
								<span class="badge bg-primary-500">-></span>
								<span class="flex-auto">{post.name}</span>
								<span
									class="chip transition-none variant-filled-{post.type == 0
										? 'success'
										: post.type == 1
										? 'secondary'
										: 'error'}"
									>{post.type == 0 ? 'w trakcie' : post.type == 1 ? 'planowane' : 'skończone'}</span
								>
							</a>
						</li>
					{/each}
					<div class="w-full bg-white/25 h-[1px] rounded-lg" />
					<li class="list-item overflow-hidden relative">
						<button on:click={newPost}>
							<span class="badge bg-primary-500">+</span>
							<span class="flex-auto">Dodaj nowy turniej</span>
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
