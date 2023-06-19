<script lang="ts">
	import { goto } from '$app/navigation';
	import BtnConfirm from '$lib/BtnConfirm.svelte';
	import type { PageData } from './$types';
	import { toastStore } from '@skeletonlabs/skeleton';
	import type { ToastSettings } from '@skeletonlabs/skeleton';

	export let data: PageData;

	function remove() {
		fetch('/admin/panel/tags/delete', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				id: data.tags.id
			})
		}).then(() => {
			window.location.href = '/admin/panel/tags';
		});
	}

	function save() {
		fetch('/admin/panel/tags/save', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				id: data.tags.id,
				name: data.tags.name
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
</script>

<div class="w-full flex justify-center">
	<div class="w-fit bg-surface-200 dark:bg-surface-700 p-12 flex flex-col gap-5 items-center">
		<label class="label">
			<span>Nazwa:</span>
			<input type="text" class="input" bind:value={data.tags.name} />
		</label>
		<!-- divider -->
		<div class="w-full h-px bg-white/25" />
		<button class="btn variant-ghost-primary rounded-none w-full" on:click={save}>Zapisz!</button>
		<BtnConfirm
			confirmFunction={remove}
			confirmText="Czy na pewno?"
			text="Usuń"
			btnColor="primary"
			confirmColor="secondary-500"
			classes="w-full"
		/>
	</div>
</div>
