<script lang="ts">
	import { Paginator } from '@skeletonlabs/skeleton';
	import type { PageData } from './$types';
	import dayjs from 'dayjs';
	import 'dayjs/locale/pl';

	export let data: PageData;

	let settings = {
		offset: 0,
		limit: 10,
		size: data.posts.totalItems,
		amounts: [5, 10, 20]
	};

	let paginatedSource: any = [...data.posts.items];

	$: paginatedSource = data.posts.items.slice(
		settings.offset * settings.limit,
		settings.offset * settings.limit + settings.limit
	);

	function onPageChange(e: CustomEvent): void {
		fetch('/posts/loadMore', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				page: e.detail,
				limit: settings.limit,
				filter: ''
			})
		})
			.then((res) => res.json())
			.then((data) => {
				paginatedSource = [...data.items];
			});
	}

	function onAmountChange(e: CustomEvent): void {
		fetch('/posts/loadMore', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				page: settings.offset,
				filter: '',
				limit: e.detail
			})
		})
			.then((res) => res.json())
			.then((data) => {
				paginatedSource = [...data.items];
				settings.size = parseInt(data.totalItems, 10);
			});
	}
</script>

<div class="mt-36 flex items-center w-full justify-center">
	<div class="w-full sm:w-3/4">
		<div>
			<input type="text" class="input" placeholder="Szukaj..." />
		</div>
		<div class="p-5 space-y-3">
			{#each paginatedSource as post}
				<div class="w-full p-2 py-5 bg-surface-100-800-token">
					{post.title}
				</div>
			{/each}
		</div>
		<Paginator bind:settings on:onAmountChange={onAmountChange} on:onPageChange={onPageChange} />
	</div>
</div>
