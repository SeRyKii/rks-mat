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
	import Hyperlink from 'editorjs-hyperlink';
	import DragDrop from 'editorjs-drag-drop';
	import ColorPlugin from 'editorjs-text-color-plugin';
	import EditorJSStyle from 'editorjs-style';
	import Undo from 'editorjs-undo';
	import FontSize from 'editorjs-inline-font-size-tool';

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
					fontSize: FontSize,
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
					table: Table,
					hyperlink: {
						class: Hyperlink,
						config: {
							shortcut: 'CMD+L',
							target: '_blank',
							rel: 'nofollow',
							availableTargets: ['_blank', '_self'],
							availableRels: ['author', 'noreferrer'],
							validate: false
						}
					},
					// style: {
					// 	class: EditorJSStyle
					// },
					Color: {
						class: ColorPlugin, // if load from CDN, please try: window.ColorPlugin
						config: {
							colorCollections: [
								'#EC7878',
								'#9C27B0',
								'#673AB7',
								'#3F51B5',
								'#0070FF',
								'#03A9F4',
								'#00BCD4',
								'#4CAF50',
								'#8BC34A',
								'#CDDC39',
								'#FFF'
							],
							defaultColor: '#FF1300',
							type: 'text',
							customPicker: true // add a button to allow selecting any colour
						}
					}
				},
				data: data,
				onReady: () => {
					new DragDrop(editor);
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

<div class="w-full bg-surface-600 p-5" id="editorjs" />
