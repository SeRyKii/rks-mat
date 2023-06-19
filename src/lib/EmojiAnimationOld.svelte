<script lang="ts">
	import { inview } from 'svelte-inview';
	import { gsap } from 'gsap';
	export let emojis: string[] = [];
	export let classes = '';

	const CONFIG = {
		xMultiplier: 6,
		yMultiplier: 3,
		scaleMultiplier: 0.5,
		opacityMultiplier: 1,
		minDist: 0.92,
		maxDist: 0.98,
		minScale: 1,
		maxScale: 3,
		minOpacity: 0,
		maxOpacity: 1
	};

	let y = 0;
	let initialY = 0;
	let inView = false;
	let inViewRatio: IntersectionObserverEntry['intersectionRatio'] = 0;
	let boundingRect: DOMRect | undefined;

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

			let props = { x, y, scale, opacity, ease: 'power1.inOut' };

			gsap.set(elem, props);
		}
	}

	$: y, handleScroll();
</script>

<svelte:window bind:scrollY={y} />

<div
	use:inview={{ rootMargin: '0px', threshold: 0 }}
	on:inview_change={handleInView}
	class="relative {classes}"
>
	<slot />
	<div class="absolute w-fit h-fit z-10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
		{#each emojis as emoji, i}
			<div
				class="text-4xl absolute {inView ? 'block' : 'hidden'}"
				style="--ratio: {inViewRatio};"
				bind:this={emojiElements[i].elem}
			>
				{emoji}
			</div>
		{/each}
	</div>
</div>
