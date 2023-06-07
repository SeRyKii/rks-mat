<script lang="ts">
	import edjsHTML from 'editorjs-html';

	export let blocks: any;
	// console.log(JSON.stringify(blocks));
	function linkTool(block: any) {
		return `<a href="${block.data.link}" target="_blank" rel="noopener noreferrer"><div class="p-5 w-full rounded-md bg-white text-black flex flex-col gap-2"><span class="font-bold">${block.data.meta.title}</span><span>${block.data.meta.description}</span><span class="font-sm text-black/50">${block.data.link}</span></div></a>`;
	}

	function attaches(block: any) {
		return `<a href="${
			block.data.file.url
		}" target="_blank" rel="noopener noreferrer" class="no-underline">
		<div class="p-5 px-3 w-fit rounded-md bg-transparent border flex flex-row items-center gap-2 no-underline transition-all duration-300 hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black">
			<span>
				<svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 24 24"><path fill="currentColor" d="M6 20q-.825 0-1.412-.587Q4 18.825 4 18v-3h2v3h12v-3h2v3q0 .825-.587 1.413Q18.825 20 18 20Zm6-4l-5-5l1.4-1.45l2.6 2.6V4h2v8.15l2.6-2.6L17 11Z"/></svg>
			</span>
			<span class="font-bold no-underline">${
				block.data.title ||
				block.data.file.url.split('/')[block.data.file.url.split('/').length - 1]
			}</span>
		</div></a>`;
	}

	function paragraph(block: any) {
		return `<p style="text-align: ${block.data.alignment}; margin: 0;">${block.data.text}</p>`;
	}

	function header(block: any) {
		return `<h${block.data.level} style="text-align: ${block.data.alignment};">${block.data.text}</h${block.data.level}>`;
	}

	function raw(block: any) {
		return block.data.html;
	}

	function table(block: any) {
		return `<table class="table-auto w-full">
		<thead>
			<tr>
				${block.data.content[0].map((item: any) => `<th class="px-4 py-2">${item}</th>`)}
			</tr>
		</thead>
		<tbody>
			${block.data.content.slice(1).map(
				(row: any) =>
					`<tr>
						${row.map((item: any) => `<td class="border px-4 py-2">${item}</td>`)}
					</tr>`
			)}
		</tbody>
	</table>`;
	}
	function image(block: any) {
		return `<img loading="lazy" src="${
			block.data.file.url
		}?thumb=1020x480" width="1020" height="480" alt="${block.data.caption || 'image'}" />`;
	}
	const edjsParser = edjsHTML({ linkTool, attaches, raw, table, paragraph, header, image });
</script>

<div id="html" class="prose-4xl prose-neutral dark:prose-invert bg-inherit flex flex-col">
	{#if blocks != null}
		{@html edjsParser.parse(blocks).join('')}
	{/if}
</div>
