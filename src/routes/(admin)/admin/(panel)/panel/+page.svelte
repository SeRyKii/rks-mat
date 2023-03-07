<script lang="ts">
	import type { PageData } from './$types';
	import { ProgressRadial } from '@skeletonlabs/skeleton';
	export let data: PageData;
	console.log(data);
</script>

<div class="w-full flex justify-center items-center h-full">
	<div
		class="grid grid-rows-4 grid-cols-1 sm:grid-cols-2 sm:grid-rows-2 w-2/3 h-full items-center justify-items-center gap-6 mt-12"
	>
		<div class="card card-hover w-fit p-5 space-y-5 h-fit flex flex-col items-center">
			<h1 class="text-4xl">Odwiedziny:</h1>
			<div class="w-[220px] h-[220px]">
				<ProgressRadial value={data.analyticsCount.nth} meter="stroke-primary-600">
					{data.analyticsCount.nth}
				</ProgressRadial>
			</div>
		</div>
		<div class="card card-hover w-fit p-5 space-y-5 h-fit flex flex-col items-center">
			<h1 class="text-4xl">Odwiedzający:</h1>
			<div class="w-[220px] h-[220px]">
				<ProgressRadial value={data.analyticsUniqueCount.nth} meter="stroke-primary-600">
					{data.analyticsUniqueCount.nth}
				</ProgressRadial>
			</div>
		</div>
		<!-- unfinished posts -->
		<div class="card card-hover w-fit p-5 h-fit flex flex-col items-center">
			<h1 class="text-4xl">Nieukończone posty:</h1>
			<!--  -->
			<div class="w-full bg-white/25 h-[1px] rounded-lg my-4" />
			<nav class="list-nav w-full">
				<!-- (optionally you can provde a label here) -->
				<ul class="">
					{#each data.unfinishedPosts.items as post}
						<li>
							<a href={`/admin/panel/posts/${post.id}`}>
								<span class="badge bg-primary-500">-></span>
								<span class="flex-auto">{post.title}</span>
							</a>
						</li>
					{/each}
					<!-- ... -->
				</ul>
			</nav>
		</div>
		<!-- Quick nav -->
		<div class="card card-hover w-fit p-5 h-fit flex flex-col items-center">
			<h1 class="text-4xl">Szybki dostęp:</h1>
			<!--  -->
			<div class="w-full bg-white/25 h-[1px] rounded-lg my-4" />
			<nav class="list-nav w-full">
				<!-- (optionally you can provde a label here) -->
				<ul class="">
					<li>
						<a href="/admin/panel/posts">
							<span class="badge bg-primary-500">-></span>
							<span class="flex-auto">Posty</span>
							<span class="font-bold">{data.postsCount.nth}</span>
						</a>
					</li>
					<li>
						<a href="/admin/panel/posts/new">
							<span class="badge bg-primary-500">-></span>
							<span class="flex-auto">Nowy post</span>
						</a>
					</li>
					<li>
						<a href="/admin/panel/posts/drafts">
							<span class="badge bg-primary-500">-></span>
							<span class="flex-auto">Szkice</span>
							<span class="font-bold">{data.postsDraft.nth}</span>
						</a>
					</li>
					<li>
						<a href="/admin/panel/posts/trash">
							<span class="badge bg-primary-500">-></span>
							<span class="flex-auto">Kosz</span>
							<span class="font-bold">{data.postsDeleted.nth}</span>
						</a>
					</li>
					<li>
						<a href="/admin/panel/newAdmin">
							<span class="badge bg-primary-500">-></span>
							<span class="flex-auto">Nowy admin</span>
						</a>
					</li>
					<!-- ... -->
				</ul>
			</nav>
		</div>
	</div>
</div>
