<script>
	import { page } from '$app/stores';
</script>

<div class="w-full h-full flex flex-col items-center -mt-20">
	<div class="w-10/12 sm:w-6/12 h-fit" style="">
		<img
			class="relative w-full aspect-[6/7] dark:brightness-75 brightness-100"
			src="/game.gif"
			alt=""
		/>
		<div
			class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center px-3 sm:px-8 w-full gap-2"
		>
			<!-- Różne teksty dla kodu 404 i 500 #page.status -->
			<h1 class="text-4xl sm:text-6xl font-bold text-center">{$page.status}</h1>
			{#if $page.status === 404}
				<h2 class="text-2xl sm:text-4xl font-bold text-center">Nie znaleziono strony</h2>
				<p class="text-center">Przepraszamy, ale nie znaleziono strony, której szukasz.</p>
			{:else if $page.status === 500}
				<h2 class="text-2xl sm:text-4xl font-bold text-center">Błąd serwera</h2>
				<p class="text-center">Przepraszamy, ale wystąpił błąd serwera.</p>
			{:else}
				<h2 class="text-2xl sm:text-4xl font-bold text-center">Nieznany błąd</h2>
				<p class="text-center">Przepraszamy, ale wystąpił nieznany błąd.</p>
			{/if}
			<a href="/" class="btn variant-filled-primary">Wróć do strony głównej</a>
		</div>
	</div>
</div>
