<script lang="ts">
	import { AppShell, Avatar } from '@skeletonlabs/skeleton';
	import { AppBar } from '@skeletonlabs/skeleton';
	import type { PageData } from './$types';
	import { LightSwitch } from '@skeletonlabs/skeleton';

	export let data: PageData;

	function getInitials(name: string) {
		const names = name.split(' ');
		let initials = names[0].substring(0, 1).toUpperCase();
		if (names.length > 1) {
			initials += names[names.length - 1].substring(0, 1).toUpperCase();
		}
		return initials;
	}
</script>

<div class="absolute w-full z-20">
	<AppBar background="dark:bg-black/40">
		<svelte:fragment slot="lead">
			<span>Logo</span>
			<span>RKS "Mat"</span>
		</svelte:fragment>
		<svelte:fragment slot="trail">
			<a href="/">Strona główna</a>
			<LightSwitch />
		</svelte:fragment>
	</AppBar>
</div>
<slot />
<div class="dark:bg-surface-900 w-full h-36">Footer</div>
<!-- ---- / ---- -->
