<script lang="ts">
	import { Paginator } from '@skeletonlabs/skeleton';
	import { onMount } from 'svelte';
	import type { PageData } from './$types';

	export let data: PageData;

	let achievementSettings = {
		offset: 0,
		limit: 5,
		size: data.achievements.totalItems,
		amounts: [5]
	};
	function achievementLoad(pageNumber: number, filter: string) {
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
				achievementSettings.size = parseInt(data.totalItems, 10);
			});
	}

	function onAchievementPageChange(e: CustomEvent): void {
		achievementLoad(e.detail, '');
	}

	let paginatedAchievements = [...data.achievements.items];
</script>

<div class="w-full flex items-center justify-center">
	<div
		class="bg-surface-100 dark:bg-surface-800 items-center gap-5 flex flex-col w-fit p-5 rounded-md"
	>
		<h1>Typy osiągnieć</h1>
		<div class="p-5 bg-surface-100 dark:bg-surface-800 rounded-md">
			<nav class="list-nav">
				<!-- (optionally you can provde a label here) -->
				<ul>
					{#each paginatedAchievements as achievement}
						<li
							class="list-item overflow-hidden relative after:bg-[var(--bg)] after:absolute after:h-full after:w-2 after:left-0 after:z-10 after:top-0 rounded-xl"
							style={`--bg: ${achievement.color}`}
						>
							<a href={`/admin/panel/achievements/${achievement.id}`}>
								<span class="badge bg-primary-500">-></span>
								<span class="flex-auto">{achievement.emoji} {achievement.description}</span>
							</a>
						</li>
					{/each}
					<div class="w-full bg-white/25 h-[1px] rounded-lg !my-4" />
					<li class="list-item overflow-hidden relative">
						<a href={`/admin/panel/achievements/new`}>
							<span class="badge bg-primary-500">+</span>
							<span class="flex-auto">Dodaj nowy typ</span>
						</a>
					</li>
				</ul>
			</nav>
			<!-- divider -->
			<div class="w-full bg-white/25 h-[1px] rounded-lg my-4" />
			<Paginator bind:settings={achievementSettings} on:page={onAchievementPageChange} />
		</div>
	</div>
</div>
