<script lang="ts">
	import { goto } from '$app/navigation';
	import BtnConfirm from '$lib/BtnConfirm.svelte';
	import type { PageData } from './$types';
	import { toastStore } from '@skeletonlabs/skeleton';
	import type { ToastSettings } from '@skeletonlabs/skeleton';

	export let data: PageData;

	function remove() {
		fetch('/admin/panel/achievements/delete', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				id: data.achievement.id
			})
		}).then(() => {
			window.location.href = '/admin/panel/achievements';
		});
	}

	function save() {
		fetch('/admin/panel/achievements/save', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				id: data.achievement.id,
				description: data.achievement.description,
				emoji: data.achievement.emoji,
				color: data.achievement.color,
				post: data.achievement.post
			})
		}).then((response) => {
			if (response.ok) {
				toastStore.trigger({
					message: 'Zapisano',
					background: 'bg-success-500',
					autohide: true,
					timeout: 2000
				} as ToastSettings);
				// setTimeout(() => {
				// 	goto('/admin/panel/achievements');
				// }, 2000);
			} else {
				toastStore.trigger({
					message: 'Wystąpił błąd',
					background: 'bg-error-500',
					autohide: true,
					timeout: 2000
				} as ToastSettings);
			}
		});
	}
</script>

<div class="w-full flex justify-center">
	<div class="w-fit bg-surface-200 dark:bg-surface-700 p-12 flex flex-col gap-5 items-center">
		<label class="label">
			<span>Opis:</span>
			<input type="text" class="input" bind:value={data.achievement.description} />
		</label>
		<label class="label">
			<span>Emoji:</span>
			<input type="text" class="input" bind:value={data.achievement.emoji} />
		</label>
		<label class="label flex flex-row items-center gap-5">
			<span>Kolor:</span>
			<input type="color" class="input" bind:value={data.achievement.color} />
		</label>
		<label class="label">
			<span>Post:</span>
			<select class="input" bind:value={data.achievement.post}>
				<option value="">Brak</option>
				{#if data.connectedPost}
					<option value={data.connectedPost?.id}>{data.connectedPost?.title}</option>
				{/if}
				{#each data.posts.items as post}
					<option value={post.id}>{post.title}</option>
				{/each}
			</select>
		</label>
		<!-- divider -->
		<div class="w-full h-px bg-white/25" />
		<button class="btn variant-ghost-primary rounded-none w-full" on:click={save}>Zapisz!</button>
		<BtnConfirm
			confirmFunction={remove}
			confirmText="Czy na pewno?"
			text="Usuń"
			btnColor="primary"
			classes="w-full"
		/>
	</div>
</div>
