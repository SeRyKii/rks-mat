<script lang="ts">
	import type { PageData } from './$types';

	import { onMount } from 'svelte';
	import { toastStore } from '@skeletonlabs/skeleton';
	import Editor from '$lib/Editor.svelte';

	export let data: PageData;

	let editor: any = {};

	function onChange(event: CustomEvent) {
		editor.save().then((outputData: any) => {
			fetch('/admin/panel/posts/save', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({
					id: data.post.id,
					content: outputData
				})
			});
			toastStore.trigger({
				message: 'Zapisano',
				autohide: true,
				timeout: 1000
			});
		});
	}
</script>

<div class="w-full flex justify-center">
	<div class="w-fit bg-surface-100 dark:bg-surface-700 p-12 flex flex-col gap-5 items-center">
		<label class="label">
			<span>Tytuł:</span>
			<input type="text" class="input" bind:value={data.post.title} />
		</label>
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

		<button class="btn variant-ghost-primary rounded-none w-full">Zapisz!</button>
	</div>
</div>
