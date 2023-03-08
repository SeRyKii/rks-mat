<script>
	// @ts-nocheck

	import EditorJS from '@editorjs/editorjs';
	import List from '@editorjs/list';
	import ImageTool from '@editorjs/image';
	import Quote from '@editorjs/quote';
	import Header from 'editorjs-header-with-alignment';
	import Paragraph from 'editorjs-paragraph-with-alignment';
	import LinkTool from '@editorjs/link';
	import AttachesTool from '@editorjs/attaches';
	import RawTool from '@editorjs/raw';
	import Table from '@editorjs/table';
	import Carousel from 'Carousel';
	import Undo from 'editorjs-undo';

	import '$lib/editor.css';
	// event dispatcher
	import { createEventDispatcher, onMount } from 'svelte';

	const dispatch = createEventDispatcher();
	export let editor = null;
	export let data;

	onMount(() => {
		try {
			editor = new EditorJS({
				/**
				 * Id of Element that should contain Editor instance
				 */
				holder: 'editorjs',
				tools: {
					quote: Quote,
					header: Header,
					paragraph: {
						class: Paragraph,
						inlineToolbar: true
					},
					list: {
						class: List,
						inlineToolbar: true,
						config: {
							defaultStyle: 'unordered'
						}
					},
					image: {
						class: ImageTool,
						config: {
							endpoints: {
								byFile: '/admin/panel/posts/saveImage/file', // Your backend file uploader endpoint
								byUrl: '/admin/panel/posts/saveImage/url' // Your endpoint that provides uploading by Url
							}
						}
					},
					linkTool: {
						class: LinkTool,
						config: {
							endpoint: '/admin/panel/posts/dataFetch' // Your backend endpoint for url data fetching,
						}
					},
					attaches: {
						class: AttachesTool,
						config: {
							endpoint: '/admin/panel/posts/saveImage/file'
						}
					},
					raw: RawTool,
					table: Table
				},
				data: data,
				onReady: () => {
					new Undo({ editor });
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
