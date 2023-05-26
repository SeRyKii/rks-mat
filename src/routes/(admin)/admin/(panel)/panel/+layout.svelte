<script lang="ts">
	import { AppShell, Avatar } from '@skeletonlabs/skeleton';
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
			<AppRailTile tag="a" href="/admin/panel">Home</AppRailTile>
			<AppRailTile tag="a" href="/admin/panel/posts">Posts</AppRailTile>
			<AppRailTile tag="a" href="/admin/panel/achievements">Osiągniecia</AppRailTile>
			<AppRailTile tag="a" href="/admin/panel/tournaments">Turnieje</AppRailTile>
			<AppRailTile tag="a" href="/admin/panel/tags">Tagi</AppRailTile>
		</AppRail>
	</svelte:fragment>

	<!-- Router Slot -->
	<div class="sm:mt-10"><slot /></div>
	<!-- ---- / ---- -->
</AppShell>
