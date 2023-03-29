<script>
	import '@skeletonlabs/skeleton/themes/theme-crimson.css';
	import '@skeletonlabs/skeleton/styles/all.css';
	import '../app.postcss';
	import { Toast } from '@skeletonlabs/skeleton';
	// import { autoModeWatcher } from '@skeletonlabs/skeleton';
</script>

<!-- <svelte:head
	>{@html `<script>${autoModeWatcher.toString()} autoModeWatcher();</script>`}</svelte:head
> -->

<Toast />

<slot />
