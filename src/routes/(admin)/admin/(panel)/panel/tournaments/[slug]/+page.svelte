<script lang="ts">
	import { goto } from '$app/navigation';
	import BtnConfirm from '$lib/BtnConfirm.svelte';
	import { ArrowUpOnSquare, ArrowUpOnSquareStack, Icon } from 'svelte-hero-icons';
	import type { PageData } from './$types';
	import { FileDropzone, toastStore } from '@skeletonlabs/skeleton';
	import type { ToastSettings } from '@skeletonlabs/skeleton';

	export let data: PageData;

	let files: FileList;
	let filesForDelete: string[] = [];

	let filePreviews: { [key: string]: string } = {};

	function fileChangeHandler(event: Event) {
		for (let i = 0; i < files.length; i++) {
			const file = files[i];
			const reader = new FileReader();
			reader.onload = (e) => {
				filePreviews[file.name] = reader.result as string;
			};
			reader.readAsDataURL(file);
		}
	}

	function remove() {
		fetch('/admin/panel/tournaments/delete', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				id: data.tournaments.id
			})
		}).then(() => {
			window.location.href = '/admin/panel/tournaments';
		});
	}

	function save() {
		let formData = new FormData();
		for (let i = 0; i < (files ? files.length : 0); i++) {
			formData.append('files', files[i]);
		}
		formData.append('id', data.tournaments.id);
		formData.append('name', data.tournaments.name);
		formData.append('startDate', new Date(start).toISOString());
		formData.append('link', data.tournaments.link);
		formData.append('color', data.tournaments.color);
		formData.append('endDate', new Date(end).toISOString());
		for (let i = 0; i < filesForDelete.length || 0; i++) {
			formData.append('filesForDelete', filesForDelete[i]);
		}
		fetch('/admin/panel/tournaments/save', {
			method: 'POST',
			body: formData
		}).then((response) => {
			if (response.ok) {
				toastStore.trigger({
					message: 'Zapisano',
					background: 'bg-success-500',
					autohide: true,
					timeout: 2000
				} as ToastSettings);
				// reload window in svelte
				location.reload();
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

	let start = new Date(data.tournaments.startDate || '').toISOString().split('T')[0];
	let end = new Date(data.tournaments.endDate || '').toISOString().split('T')[0];
</script>

<div class="w-full flex justify-center">
	<div class="w-fit bg-surface-100 dark:bg-surface-700 p-12 flex flex-col gap-5 items-center">
		<label class="label">
			<span>Nazwa:</span>
			<input type="text" class="input" bind:value={data.tournaments.name} />
		</label>
		<label class="label">
			<span>Link:</span>
			<input type="text" class="input" bind:value={data.tournaments.link} />
		</label>
		<label class="label flex flex-row items-center gap-5">
			<span>Kolor:</span>
			<input type="color" class="input" bind:value={data.tournaments.color} />
		</label>
		<label class="label">
			<span>Data rozpoczęcia:</span>
			<input type="date" class="input" bind:value={start} />
		</label>
		<label class="label">
			<span>Data zakończenia:</span>
			<input type="date" class="input" bind:value={end} />
		</label>
		<div class="grid grid-cols-1 sm:grid-cols-2 gap-2">
			{#each data.photos.items as photo}
				<div
					on:keydown={(e) => {
						if (e.key === 'Enter') {
							if (filesForDelete.includes(photo.photo.split('/').pop() || '')) {
								filesForDelete = filesForDelete.filter(
									(item) => item !== photo.photo.split('/').pop()
								);
							} else {
								filesForDelete.push(photo.photo.split('/').pop() || '');
							}
						}
					}}
					on:click={() => {
						if (filesForDelete.includes(photo.photo.split('/').pop() || '')) {
							filesForDelete = filesForDelete.filter(
								(item) => item !== photo.photo.split('/').pop() || ''
							);
						} else {
							filesForDelete = [photo.photo.split('/').pop() || '', ...filesForDelete];
						}
					}}
					class="relative select-none overflow-hidden rounded-md after:absolute after:w-full after:h-full hover:after:opacity-100 after:transition-all after:top-0 after:left-0 after:flex after:items-center after:justify-center after:opacity-0 after:pointer-events-none {filesForDelete.includes(
						photo.photo.split('/').pop() || ''
					)
						? "after:bg-success-500/80 after:content-['Przywróć_zdjęcie']"
						: "after:bg-error-500/80 after:content-['Usuń_zdjęcie']"}"
				>
					<img
						src={photo.photo}
						alt=""
						class=" pointer-events-none h-24 aspect-[20/12] object-cover {filesForDelete.includes(
							photo.photo.split('/').pop() || ''
						)
							? 'opacity-75 brightness-75 grayscale'
							: ''}"
					/>
				</div>
			{/each}
			{#each Object.keys(filePreviews) as file}
				<div
					on:keydown={(e) => {
						if (e.key === 'Enter') {
							if (filesForDelete.includes(file)) {
								filesForDelete = filesForDelete.filter((item) => item !== file);
							} else {
								filesForDelete.push(file);
							}
						}
					}}
					on:click={() => {
						if (filesForDelete.includes(file)) {
							filesForDelete = filesForDelete.filter((item) => item !== file);
						} else {
							filesForDelete = [file, ...filesForDelete];
						}
					}}
					class="relative select-none overflow-hidden rounded-md after:absolute after:w-full after:h-full hover:after:opacity-100 after:transition-all after:top-0 after:left-0 after:flex after:items-center after:justify-center after:opacity-0 after:pointer-events-none {filesForDelete.includes(
						file
					)
						? "after:bg-success-500/80 after:content-['Przywróć_zdjęcie']"
						: "after:bg-error-500/80 after:content-['Usuń_zdjęcie']"}"
				>
					<img
						src={filePreviews[file]}
						alt=""
						class=" pointer-events-none h-24 aspect-[20/12] object-cover {filesForDelete.includes(
							file
						)
							? 'opacity-75 brightness-75 grayscale'
							: ''}"
					/>
				</div>
			{/each}
		</div>
		<FileDropzone
			accept="image/*"
			multiple={true}
			name="photos"
			bind:files
			on:change={fileChangeHandler}
		>
			<svelte:fragment slot="lead">
				<Icon src={ArrowUpOnSquareStack} size="32px" solid={true} />
			</svelte:fragment>
			<svelte:fragment slot="message">
				<span>Upuść pliki</span>
			</svelte:fragment>
			<svelte:fragment slot="meta">
				<span>Formaty akceptowane: PNG, JPG, JPEG, WEBP</span>
			</svelte:fragment>
		</FileDropzone>
		<hr class="w-full h-px bg-white/25" />
		<button class="btn variant-ghost-primary rounded-none w-full" on:click={save}>Zapisz!</button>
		<BtnConfirm
			confirmFunction={remove}
			confirmText="Czy na pewno?"
			text="Usuń"
			btnColor="primary"
			confirmColor="secondary-500"
			classes="w-full"
		/>
	</div>
</div>
