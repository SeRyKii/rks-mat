<script lang="ts">
	import { onMount } from 'svelte';
	import { InputChip, toastStore } from '@skeletonlabs/skeleton';
	import BtnConfirm from '$lib/BtnConfirm.svelte';
	import Editor from '$lib/Editor.svelte';
	import { Autocomplete } from '@skeletonlabs/skeleton';

	export let data;

	let editor: any = {};

	const types = [
		{ id: 0, name: 'Opublikowane' },
		{ id: 1, name: 'Nie skończone' },
		{ id: 2, name: 'W śmietniku' }
	];

	function remove() {
		fetch('/admin/panel/posts/delete', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				id: data.post.id
			})
		}).then(() => {
			window.location.href = '/admin/panel/posts';
		});
	}

	function onChange() {
		editor.save().then((outputData: any) => {
			fetch('/admin/panel/posts/save', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({
					id: data.post.id,
					content: outputData,
					title: data.post.title,
					type: data.post.type,
					tags: list
				})
			});
			toastStore.trigger({
				message: 'Zapisano',
				background: 'bg-success-500',
				autohide: true,
				timeout: 1000
			});
		});
	}

	let tagOptions = data.allTags.map((tag) => {
		return {
			label: tag.name || '',
			value: tag.name
		};
	});

	let list = [...data.tags];

	function onInputChipSelect(e: CustomEvent) {
		//if (list.includes(e.detail.value) === true) {
		list = [...list, e.detail.value];
		inputChip = '';
		//}
	}

	let inputChip = '';
</script>

<div class="w-full flex justify-center">
	<div
		class=" bg-surface-200 dark:bg-surface-700 p-12 w-[836px] flex flex-col gap-5 items-center justify-center"
	>
		<div class="">
			<label class="label">
				<span>Tytuł:</span>
				<input type="text" class="input" bind:value={data.post.title} on:change={onChange} />
			</label>
			<label class="label text-left">
				<span>Status:</span><br />
				<select class="select w-fit" bind:value={data.post.type} on:change={onChange}>
					{#each types as type}
						<option value={type.id}>{type.name}</option>
					{/each}
				</select>
			</label>

			<!-- svelte-ignore a11y-label-has-associated-control -->
			<label class="label">
				<span>Tagi:</span>
				{list}
				<InputChip
					bind:input={inputChip}
					bind:value={list}
					name="chips"
					placeholder="Wpisz tagi:"
				/>
				<div class="card w-full max-w-sm max-h-48 p-4 overflow-y-auto">
					<Autocomplete
						bind:input={inputChip}
						options={tagOptions}
						denylist={list}
						on:selection={onInputChipSelect}
					/>
				</div>
			</label>
		</div>
		<!-- divider -->
		<div class="w-full h-px bg-white/25" />
		<Editor
			data={data.post.content}
			bind:editor
			on:error={(event) => {
				toastStore.trigger({
					message: `Błąd: ${event.detail}`
				});
			}}
		/>
		<hr />
		<button class="btn variant-ghost-primary w-1/2" on:click={onChange}>Zapisz</button>
		<BtnConfirm
			confirmFunction={remove}
			confirmText="Czy na pewno?"
			text="Usuń"
			btnColor="primary"
			classes="w-1/2"
		/>
	</div>
</div>
