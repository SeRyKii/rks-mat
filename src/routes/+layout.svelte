<script>
	import '@skeletonlabs/skeleton/themes/theme-rocket.css';
	import '@skeletonlabs/skeleton/styles/all.css';
	import '../app.postcss';
	import { Toast } from '@skeletonlabs/skeleton';
	import { computePosition, autoUpdate, flip, shift, offset, arrow } from '@floating-ui/dom';
	import { storePopup } from '@skeletonlabs/skeleton';
	storePopup.set({ computePosition, autoUpdate, flip, shift, offset, arrow });
	// import { autoModeWatcher } from '@skeletonlabs/skeleton';
</script>

<!-- <svelte:head
	>{@html `<script>${autoModeWatcher.toString()} autoModeWatcher();</script>`}</svelte:head
> -->
<svelte:head>
	<title>RKS "Mat"</title>
	<meta name="viewport" content="width=device-width, initial-scale=1" />
	<meta name="description" content="Klubowa strona klubu RKS 'Mat'" />
</svelte:head>

<Toast />

<slot />
