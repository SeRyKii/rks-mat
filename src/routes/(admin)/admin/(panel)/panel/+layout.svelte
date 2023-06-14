<script lang="ts">
	import { AppRailAnchor, AppShell, Avatar } from '@skeletonlabs/skeleton';
	import { AppRail, AppRailTile, AppBar } from '@skeletonlabs/skeleton';
	import type { PageData } from './$types';

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

<AppShell>
	<svelte:fragment slot="header"
		><AppBar>
			<svelte:fragment slot="lead"
				><img class="w-16 h-16" src="/logo-medium.webp" alt="logo" /></svelte:fragment
			>
			<h1 class="text-center">RKS Mat Admin Panel</h1>
			<svelte:fragment slot="trail">
				<Avatar src={data.user.avatarUrl} initials={getInitials(data.user.username)} />
			</svelte:fragment>
		</AppBar></svelte:fragment
	>
	<svelte:fragment slot="sidebarLeft">
		<AppRail>
			<AppRailAnchor tag="a" href="/admin/panel/posts">Aktualności</AppRailAnchor>
			<AppRailAnchor tag="a" href="/admin/panel/achievements">Osiągniecia</AppRailAnchor>
			<AppRailAnchor tag="a" href="/admin/panel/tournaments">Turnieje</AppRailAnchor>
			<AppRailAnchor tag="a" href="/admin/panel">Home</AppRailAnchor>
			<AppRailAnchor tag="a" href="/admin/panel/tags">Tagi</AppRailAnchor>
		</AppRail>
	</svelte:fragment>

	<!-- Router Slot -->
	<div class="sm:mt-10"><slot /></div>
	<!-- ---- / ---- -->
</AppShell>
