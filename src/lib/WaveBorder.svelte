<script lang="ts">
	import { wavify } from '$lib/wavify';
	import { onMount } from 'svelte';
	import { noAnimations } from '$lib/stores';
	export let waveColors: string[];
	export let rotate = false;
	export let classes = 'w-full h-full';

	let rotationClass = '';
	if (rotate) {
		rotationClass = 'rotate-180';
	} else {
		rotationClass = '';
	}

	let wave: SVGPathElement;
	let wave1: SVGPathElement;
	let wave2: SVGPathElement;

	let waveInstance1: any;
	let waveInstance2: any;
	let waveInstance3: any;

	onMount(() => {
		waveInstance1 = wavify(wave, {
			height: 10,
			bones: 3,
			amplitude: 30,
			color: 'transparent',
			speed: 0.35
		});
		waveInstance2 = wavify(wave1, {
			height: 40,
			bones: 4,
			amplitude: 20,
			color: 'transparent',
			speed: 0.3
		});
		waveInstance3 = wavify(wave2, {
			height: 50,
			bones: 4,
			amplitude: 20,
			color: 'transparent',
			speed: 0.25
		});
	});
</script>

<svg class="{classes} {rotationClass}" version="1.1" xmlns="http://www.w3.org/2000/svg"
	><defs /><path class="{waveColors[0]} z-30" bind:this={wave} d="" /><path
		class="{waveColors[1]} z-20"
		bind:this={wave1}
		d=""
	/><path class="{waveColors[2]} z-10" bind:this={wave2} d="" /></svg
>
