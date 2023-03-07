<script>
	import { enhance } from '$app/forms';
	import { Toast, toastStore } from '@skeletonlabs/skeleton';

	let loading = false;

	const submitLogin = () => {
		loading = true;
		// @ts-ignore
		return async ({ result, update }) => {
			switch (result.type) {
				case 'success':
					await update();
					break;
				case 'error':
					toastStore.trigger({
						message: result.error.message,
						autohide: true,
						timeout: 5000
					});
					break;
				default:
					await update();
			}
			loading = false;
		};
	};
</script>

<div class="w-full h-full flex items-center justify-center">
	<div class="w-1/3 bg-surface-700 p-5 rounded-md ">
		<h1 class="text-center mb-5">Admin Login</h1>
		<form class="space-y-4" action="?/login" method="POST" use:enhance={submitLogin}>
			<label class="label">
				<span>Email/Nazwa</span>
				<input
					type="text"
					class="input"
					placeholder="email@example.com"
					name="email"
					disabled={loading}
				/>
			</label>
			<label class="label">
				<span>Hasło</span>
				<input
					type="password"
					class="input"
					placeholder="password"
					name="password"
					autocomplete="current-password"
					disabled={loading}
				/>
			</label>
			<button class="btn variant-filled-primary w-full rounded-sm" disabled={loading}
				><span>L</span><span>Zaloguj</span></button
			>
		</form>
	</div>
</div>
