<script lang="ts">
	export let confirmFunction: () => void;
	export let confirmText = 'Czy na pewno?';
	export let text = 'Usuń';
	export let btnColor = 'primary';
	export let classes = '';
	let confirm = false;

	function confirmAction() {
		if (confirm == true) {
			confirmFunction();
		} else {
			confirm = true;
		}
	}
</script>

<button
	style="--after-content: '{confirmText}';"
	class="relative after:text-black after:h-full after:w-full after:top-0 btn variant-filled-{btnColor} after:absolute after:-left-full after:transition-all after:pt-2 overflow-hidden after:bg-secondary-500 {confirm
		? 'after:translate-x-full'
		: ''} {classes}"
	on:click={confirmAction}>{text}</button
>

<style>
	button::after {
		content: var(--after-content);
	}
</style>
