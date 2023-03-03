<script lang="ts">
	import SvelteMarkdown from 'svelte-markdown';
	import type { PageData } from './$types';
	export let data: PageData;
</script>

<div class="w-full flex flex-col">
	{#each data.posts as post}
		<div class="w-full flex flex-col">
			<h1 class="text-2xl font-bold">{post.title}</h1>
			<div class="prose prose-xl prose-stone dark:prose-invert">
				<SvelteMarkdown source={post.field} />
			</div>
		</div>
	{/each}
</div>
