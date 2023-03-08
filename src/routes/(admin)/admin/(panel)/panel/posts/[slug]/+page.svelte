<script lang="ts">
	import type { PageData } from './$types';

	import { onMount } from 'svelte';
	import { toastStore } from '@skeletonlabs/skeleton';
	import Editor from '$lib/Editor.svelte';

	export let data: PageData;

	let editor: any = {};
	let tools = {};

	function onChange(event: CustomEvent) {
		console.log('test');
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

<div>
	<h1>{data.post.title}</h1>
	<Editor
		data={data.post.content}
		bind:tools
		bind:editor
		on:error={(event) => {
			toastStore.trigger({
				message: `Błąd: ${event.detail}`
			});
		}}
		on:change={onChange}
	/>
	<div>
		<button>Zapisz!</button>
		<button>Opublikuj!</button>
	</div>
</div>
