<script lang="ts">
	import { inview } from 'svelte-inview';
	import { onMount } from 'svelte';
	import { gsap } from 'gsap';
	export let emojis: string[] = [];
	export let classes = '';
	export let resizeXMultiplier = 1;
	export let resizeYMultipler = 1;

	function handleResize() {
		const vw = Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0);
		const vh = Math.max(document.documentElement.clientHeight || 0, window.innerHeight || 0);

		switch (true) {
			case vw < 640:
				CONFIG.xMultiplier = 2;
				CONFIG.scaleMultiplier = 0.3;
				CONFIG.maxScale = 1.5;
				break;
			case vw < 864:
				CONFIG.xMultiplier = 2.5;
				CONFIG.scaleMultiplier = 0.4;
				CONFIG.maxScale = 1.7;
				break;
			case vw < 1024:
				CONFIG.xMultiplier = 3;
				CONFIG.scaleMultiplier = 0.4;
				CONFIG.maxScale = 1.8;
				break;
			default:
				CONFIG.xMultiplier = 5;
				CONFIG.yMultiplier = 4;
				CONFIG.scaleMultiplier = 0.5;
				CONFIG.maxScale = 2;
				break;
		}
		CONFIG.xMultiplier = CONFIG.xMultiplier * resizeXMultiplier;
		CONFIG.yMultiplier = CONFIG.yMultiplier * resizeYMultipler;
		CONFIG.minDist = 0.92 + vw / 2000;
		CONFIG.maxDist = 0.98 + vw / 2000;
	}

	onMount(() => {
		window.addEventListener('resize', handleResize);
		handleResize();
	});

	const CONFIG = {
		xMultiplier: 5,
		yMultiplier: 4,
		scaleMultiplier: 0.5,
		opacityMultiplier: 1,
		minDist: 0.92,
		maxDist: 0.94,
		minScale: 1,
		maxScale: 2,
		minOpacity: 0,
		maxOpacity: 1,
		rotationMultiplier: 2
	};

	let y = 0;
	let initialY = 0;
	let inView = false;
	let inViewRatio: IntersectionObserverEntry['intersectionRatio'] = 0;
	let boundingRect: DOMRect | undefined;
	let emojiWrapper: HTMLDivElement | null = null;

	let emojiElements: { elem: HTMLDivElement | null; rot: number; dist: number }[] = [];
	for (let i = 0; i < emojis.length; i++) {
		// emojiElements.push({
		// 	elem: null,
		// 	rot: (i / emojis.length) * Math.PI * 2,
		// 	dist: Math.random() * (CONFIG.maxDist - CONFIG.minDist) + CONFIG.minDist
		// });
		// make it shorter on y axis and longer on x axis
		const rot = (i / emojis.length) * Math.PI * 2;
		const dist = Math.random() * (CONFIG.maxDist - CONFIG.minDist) + CONFIG.minDist;

		emojiElements.push({
			elem: null,
			rot,
			dist
		});
	}

	function handleInView(e: CustomEvent<{ inView: boolean; entry: IntersectionObserverEntry }>) {
		inView = e.detail.inView;
		boundingRect = e.detail.entry.boundingClientRect;
		if (inView) {
			initialY = y;
		}
	}

	function handleScroll() {
		requestAnimationFrame(()  => {
			if (!inView || !boundingRect) return;

			const deltaY = Math.abs(y - initialY);
		// scroll progress goes from 0 to 1 depending on how far the user has scrolled and the viewport height
		const scrollProgress = deltaY / boundingRect.height;

		// progress goes from 0 to 1 fast in 0 to 0.4 scroll progress, stays at 1 from 0.4 to 0.6 scroll progress, and goes from 1 to 0 in 0.6 to 1 scroll progress
		let progress = 0;
		if (scrollProgress < 0.4) {
			progress = scrollProgress / 0.4;
		} else if (scrollProgress < 2) {
			progress = 1;
		} else {
			progress = 1 - (scrollProgress - 2) / 0.4;
		}

		inViewRatio = progress;

		let wrapperRotation = Math.PI * scrollProgress * CONFIG.rotationMultiplier;

		gsap.set(emojiWrapper, { rotation: wrapperRotation, ease: 'power1.inOut' });

		for (let i = 0; i < emojiElements.length; i++) {
			const elem = emojiElements[i].elem;
			if (!elem) continue;

			const rot = emojiElements[i].rot;
			const dist = emojiElements[i].dist;

			const x = Math.cos(rot) * dist * progress * CONFIG.xMultiplier * 100;
			const y = Math.sin(rot) * dist * progress * CONFIG.yMultiplier * 100;
			const scale =
				CONFIG.maxScale - progress * (CONFIG.maxScale - CONFIG.minScale) * CONFIG.scaleMultiplier;
			const opacity =
				CONFIG.minOpacity +
				progress * (CONFIG.maxOpacity - CONFIG.minOpacity) * CONFIG.opacityMultiplier;

			let props = { x, y, scale, opacity, rotation: (rot * 180) / Math.PI, ease: 'power1.inOut' };

			gsap.set(elem, props);
		}
	})
	}

</script>

<svelte:window bind:scrollY={y} on:scroll={handleScroll} />

<div
	use:inview={{ rootMargin: '0px', threshold: 0 }}
	on:inview_change={handleInView}
	class="relative {classes}"
>
	<slot />
	<div
		class="absolute w-fit h-fit -z-20 block top-1/2 left-1/2 select-none pointer-events-none -translate-x-1/2 -translate-y-1/2"
		bind:this={emojiWrapper}
	>
		{#each emojis as emoji, i}
			<div
				class="text-4xl absolute {inView ? 'block' : 'hidden'} {classes}"
				style="--ratio: {inViewRatio};"
				bind:this={emojiElements[i].elem}
			>
				{emoji}
			</div>
		{/each}
	</div>
</div>
