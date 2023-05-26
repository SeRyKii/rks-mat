<script lang="ts">
	import { goto } from '$app/navigation';
	import type { PageData } from './$types';
	import { toastStore } from '@skeletonlabs/skeleton';
	import type { ToastSettings } from '@skeletonlabs/skeleton';

	export let data: PageData;

	function save() {
		fetch('/admin/panel/tournaments/save', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				id: data.tournaments.id,
				name: data.tournaments.name,
				startDate: new Date(start).toISOString(),
				link: data.tournaments.link,
				color: data.tournaments.color,
				endDate: new Date(end).toISOString()
			})
		}).then((response) => {
			if (response.ok) {
				toastStore.trigger({
					message: 'Zapisano',
					background: 'bg-success-500',
					autohide: true,
					timeout: 2000
				} as ToastSettings);
				// setTimeout(() => {
				// 	goto('/admin/panel/achievements');
				// }, 2000);
			} else {
				toastStore.trigger({
					message: 'Wystąpił błąd',
					background: 'bg-error-500',
					autohide: true,
					timeout: 2000
				} as ToastSettings);
			}
		});
	}

	let start = new Date(data.tournaments.startDate || '').toISOString().split('T')[0];
	let end = new Date(data.tournaments.endDate || '').toISOString().split('T')[0];
</script>

<div class="w-full flex justify-center">
	<div class="w-fit bg-surface-100 dark:bg-surface-700 p-12 flex flex-col gap-5 items-center">
		<label class="label">
			<span>Nazwa:</span>
			<input type="text" class="input" bind:value={data.tournaments.name} />
		</label>
		<label class="label">
			<span>Link:</span>
			<input type="text" class="input" bind:value={data.tournaments.link} />
		</label>
		<label class="label flex flex-row items-center gap-5">
			<span>Kolor:</span>
			<input type="color" class="input" bind:value={data.tournaments.color} />
		</label>
		<label class="label">
			<span>Data rozpoczęcia:</span>
			<input type="date" class="input" bind:value={start} />
		</label>
		<label class="label">
			<span>Data zakończenia:</span>
			<input type="date" class="input" bind:value={end} />
		</label>
		<!-- divider -->
		<div class="w-full h-px bg-white/25" />
		<button class="btn variant-ghost-primary rounded-none w-full" on:click={save}>Zapisz!</button>
	</div>
</div>
