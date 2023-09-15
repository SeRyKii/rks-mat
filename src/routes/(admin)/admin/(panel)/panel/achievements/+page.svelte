<script lang="ts">
	import { Paginator } from '@skeletonlabs/skeleton';
	import { onMount } from 'svelte';
	import type { PageData } from './$types';
	import { goto } from '$app/navigation';

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

	function newAchievement() {
		fetch('/admin/panel/achievements/new', {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json'
			}
		})
			.then((res) => res.json())
			.then((data) => {
				goto(`/admin/panel/achievements/${data.id}`);
			});
	}

	let paginatedAchievements = [...data.achievements.items];
</script>

<div class="w-full flex items-center justify-center">
	<div
		class="bg-surface-200 dark:bg-surface-900 items-center gap-5 flex flex-col w-fit p-5 rounded-md"
	>
		<h1>Typy osiągnieć</h1>
		<div class="p-5 bg-surface-200 dark:bg-surface-900 rounded-md w-full">
			<nav class="list-nav">
				<!-- (optionally you can provde a label here) -->
				<ul>
					{#each paginatedAchievements as achievement}
						<li
							class="w-full list-item overflow-hidden relative after:bg-[var(--bg)] after:absolute after:h-full after:w-2 after:left-0 after:z-10 after:top-0 rounded-xl"
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
						<button on:click={newAchievement}>
							<span class="badge bg-primary-500">+</span>
							<span class="flex-auto">Dodaj nowe osiągnięcie</span>
						</button>
					</li>
				</ul>
			</nav>
			<!-- divider -->
			<div class="w-full bg-white/25 h-[1px] rounded-lg my-4" />
			<Paginator bind:settings={achievementSettings} on:page={onAchievementPageChange} />
		</div>
	</div>
</div>
