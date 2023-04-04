<script lang="ts">
	import { Paginator } from '@skeletonlabs/skeleton';
	import { onMount } from 'svelte';
	import type { PageData } from './$types';

	export let data: PageData;

	let page = {
		offset: 0,
		limit: 5,
		size: data.achievements.totalItems,
		amounts: [5]
	};

	function load(pageNumber: number, filter: string) {
		fetch('/admin/panel/achievements/loadMore', {
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
				paginatedAchievements = [...data.items];
				page.size = parseInt(data.totalItems, 10);
			});
	}

	function onPageChange(e: CustomEvent): void {
		load(e.detail, '');
	}

	let paginatedAchievements = [...data.achievements.items];
</script>

<div class="w-full flex items-center justify-center mt-10">
	<div class="w-1/3 p-5 bg-surface-800 rounded-md">
		<nav class="list-nav">
			<!-- (optionally you can provde a label here) -->
			<ul>
				{#each paginatedAchievements as achievement}
					<li
						class="list-item overflow-hidden relative after:bg-yellow-400/50 after:absolute after:w-full after:h-1 after:left-0 after:z-10 after:bottom-0 rounded-xl"
					>
						<a href={`/admin/panel/achievements/${achievement.id}`}>
							<span class="badge bg-primary-500">-></span>
							<span class="flex-auto">{achievement.place} {achievement.description}</span>
						</a>
					</li>
				{/each}
			</ul>
		</nav>
		<!-- divider -->
		<div class="w-full bg-white/25 h-[1px] rounded-lg my-4" />
		<Paginator bind:settings={page} on:page={onPageChange} />
	</div>
</div>
