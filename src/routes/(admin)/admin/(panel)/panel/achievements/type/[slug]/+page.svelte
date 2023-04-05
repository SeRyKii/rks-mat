<script lang="ts">
	import type { PageData } from './$types';

	import { onMount } from 'svelte';
	import { popup, toastStore, type PopupSettings } from '@skeletonlabs/skeleton';
	import { Autocomplete } from '@skeletonlabs/skeleton';
	import type { AutocompleteOption } from '@skeletonlabs/skeleton';

	export let data: PageData;

	let type = {
		id: data.type.id,
		title: data.type.title,
		color: data.type.color,
		emoji: data.type.emoji || ''
	};
	function onPopupDemoSelect(event: any): void {
		type.emoji = event.detail.value;
	}

	const emojiOptions: AutocompleteOption[] = [
		{
			label: 'medal za pierwsze miejsce',
			value: '🥇',
			keywords: ['pierwsze', 'pierwsze miejsce', 'medal', 'złoty']
		},
		{
			label: 'medal za drugie miejsce',
			value: '🥈',
			keywords: ['drugie', 'drugie miejsce', 'medal', 'srebrny']
		},
		{
			label: 'medal za trzecie miejsce',
			value: '🥉',
			keywords: ['trzecie', 'trzecie miejsce', 'medal', 'brązowy']
		},
		{
			label: 'puchar',
			value: '🏆',
			keywords: ['puchar']
		},
		{
			label: 'wyróżnienie',
			value: '🎖️',
			keywords: ['wyróżnienie']
		},
		{
			label: 'gwiazda',
			value: '⭐',
			keywords: ['gwiazda']
		},
		{
			label: 'kwiat',
			value: '🌷',
			keywords: ['kwiat']
		},
		{
			label: 'kolorowe serduszka',
			value: '💖',
			keywords: ['serduszka', 'serce']
		},
		{
			label: 'serce',
			value: '❤️',
			keywords: ['serce', 'czerwone serce', 'czerwone', 'czerwony']
		},
		{
			label: 'serce z błyskami',
			value: '💞',
			keywords: ['serce', 'serce z błyskami', 'błyski', 'błysk']
		},
		{
			label: 'podziękowanie',
			value: '🙏',
			keywords: ['podziękowanie', 'dziekuję']
		}
	];
	let popupSettings: PopupSettings = {
		event: 'focus',
		target: 'popupAutocomplete',
		placement: 'bottom'
	};

	function save() {
		fetch(`/admin/panel/achievements/type/save`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(type)
		})
			.then((res) => res.json())
			.then((res) => {
				if (res.message == 'Internal Error') {
					return toastStore.trigger({
						message:
							'Wystąpił błąd podczas zapisywania typu osiągnięcia, upewnij się, że pole emoji ma emoji',
						autohide: true,
						timeout: 4000
					});
				}
				toastStore.trigger({
					message: 'Typ osiągnięcia został zapisany.',
					autohide: true,
					timeout: 4000
				});
			});
	}
</script>

<div class="w-full flex justify-center">
	<div class="w-fit bg-surface-700 p-12 flex flex-col gap-5 items-center">
		<label class="label">
			<span>Tytuł:</span>
			<input type="text" class="input" bind:value={type.title} />
		</label>
		<label class="label flex flex-col items-center w-full">
			<div class="w-full text-left">Kolor:</div>
			<input class="input" type="color" bind:value={type.color} />
		</label>
		<label class="label">
			<span>Emoji</span>
			<input
				class="input autocomplete"
				type="search"
				name="autocomplete-search"
				bind:value={type.emoji}
				placeholder="Search..."
				use:popup={popupSettings}
			/>
			<div data-popup="popupAutocomplete" class="dark:bg-surface-900 p-5 rounded-mdbg-surface-200">
				<Autocomplete
					bind:input={type.emoji}
					options={emojiOptions}
					on:selection={onPopupDemoSelect}
				/>
			</div>
		</label>
		<!-- divider -->
		<div class="w-full h-px bg-white/25" />
		<button class="btn variant-ghost-primary rounded-none w-full" on:click={save}>Zapisz!</button>
	</div>
</div>
