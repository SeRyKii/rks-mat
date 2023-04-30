<script lang="ts">
	export let isWrapped = false;
	export let href: string;
</script>

{#if isWrapped}
	<a {href} class="!no-underline !text-token">
		<slot />
	</a>
{:else}
	<!-- svelte-ignore a11y-missing-attribute -->
	<div>
		<slot />
	</div>
{/if}
