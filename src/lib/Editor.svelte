<script lang="ts">
	import EditorJS from '@editorjs/editorjs';
	import type { OutputData } from '@editorjs/editorjs';
	import '$lib/editor.css';
	// event dispatcher
	import { createEventDispatcher, onMount } from 'svelte';

	const dispatch = createEventDispatcher();
	export let editor: any = null;
	export let data: any;
	export let tools: any;

	onMount(() => {
		try {
			editor = new EditorJS({
				/**
				 * Id of Element that should contain Editor instance
				 */
				holder: 'editorjs',
				tools: tools,
				data: data,
				onReady: () => {
					dispatch('ready');
				},
				onChange: (api, event) => {
					dispatch('change', { api, event });
				}
			});
		} catch (e) {
			dispatch('error', e);
		}
	});
</script>

<div id="editorjs" />
