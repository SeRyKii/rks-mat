<script lang="ts">
	import type { PageData } from './$types';

	import { onMount } from 'svelte';
	import { toastStore } from '@skeletonlabs/skeleton';
	import Editor from '$lib/Editor.svelte';

	export let data: PageData;

	let editor: any = {};

	const types = [
		{ id: 0, name: 'Opublikowane' },
		{ id: 1, name: 'Nie skończone' },
		{ id: 2, name: 'W śmietniku' }
	];
	function onChange() {
		editor.save().then((outputData: any) => {
			fetch('/admin/panel/posts/save', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({
					id: data.post.id,
					content: outputData,
					title: data.post.title,
					type: data.post.type
				})
			});
			toastStore.trigger({
				message: 'Zapisano',
				background: 'bg-success-500',
				autohide: true,
				timeout: 1000
			});
		});
	}
</script>

<div class="w-full flex justify-center">
	<div class=" bg-surface-100 dark:bg-surface-700 p-12 w-[836px] flex flex-col gap-5 items-center">
		<label class="label">
			<span>Tytuł:</span>
			<input type="text" class="input" bind:value={data.post.title} on:change={onChange} />
		</label>
		<select class="select w-fit" bind:value={data.post.type} on:change={onChange}>
			{#each types as type}
				<option value={type.id}>{type.name}</option>
			{/each}
		</select>
		<!-- divider -->
		<div class="w-full h-px bg-white/25" />
		<Editor
			data={data.post.content}
			bind:editor
			on:error={(event) => {
				toastStore.trigger({
					message: `Błąd: ${event.detail}`
				});
			}}
			on:change={onChange}
		/>
		<hr />
		<button class="btn variant-ghost-primary w-1/2" on:click={onChange}>Zapisz</button>
	</div>
</div>
