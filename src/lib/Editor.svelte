<script lang="ts">
	import '$lib/editor.css';
	// event dispatcher
	import { createEventDispatcher, onMount } from 'svelte';

	const dispatch = createEventDispatcher();
	export let editor = null;
	export let data;

	onMount(async () => {
		// importing like modules didnt work
		const EditorJS = (await import('@editorjs/editorjs')).default;
		const List = (await import('@editorjs/list')).default;
		const ImageTool = (await import('@editorjs/image')).default;
		const Quote = (await import('@editorjs/quote')).default;
		const Header = (await import('editorjs-header-with-alignment')).default;
		const Paragraph = (await import('editorjs-paragraph-with-alignment')).default;
		const LinkTool = (await import('@editorjs/link')).default;
		const AttachesTool = (await import('@editorjs/attaches')).default;
		const RawTool = (await import('@editorjs/raw')).default;
		const Table = (await import('@editorjs/table')).default;
		const Hyperlink = (await import('editorjs-hyperlink')).default;
		const DragDrop = (await import('editorjs-drag-drop')).default;
		const ColorPlugin = (await import('editorjs-text-color-plugin')).default;
		const EditorJSStyle = (await import('editorjs-style')).default;
		const Undo = (await import('editorjs-undo')).default;
		const FontSize = (await import('editorjs-inline-font-size-tool')).default;

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

<div class="w-full bg-surface-200 dark:bg-surface-600 p-5" id="editorjs" />
