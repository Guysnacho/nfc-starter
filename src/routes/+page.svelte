<script lang="ts">
	import { SlideToggle } from '@skeletonlabs/skeleton';
	import { getToastStore } from '@skeletonlabs/skeleton';
	import { page } from '$app/stores';
	import { NDEFReader } from '../app';
	import { handleScan } from '$lib';

	const toastStore = getToastStore();

	let username = '';
	let password = '';
	let viewable = false;
	let loading = false;

	const serial = $page.url.searchParams.get('serial');

	console.log(serial ? `Serial: ${serial}` : 'No serial Recieved');
	// @ts-ignore
	const nfcPermissionStatus = await navigator.permissions.query({ name: "nfc" });

	const handleLogin = async () => {
		loading = true;
		if (!username || !password) {
			toastStore.trigger({
				message: 'Username or password is invalid'
			});
			return;
		// @ts-ignore
		} else if (nfcPermissionStatus !== "granted") {
			toastStore.trigger({
				message: 'Please allow nfc access'
			});
		}

		if ('NDEFReader' in window) {
			console.log('Ready');
			const ndef = new NDEFReader();
			await handleScan(ndef)
		} else {
			toastStore.trigger({
				message: 'Web NFC is not supported on this browser.'
			});
			return
		}

		console.log('Logging in');
		loading = false;
	};
</script>

<div class="container mx-auto h-screen flex justify-center">
	<div class="md:flex space-x-5 m-auto">
		<h2 class="h2 text-center my-auto">
			Welcome to <span class="italic text-secondary-700">company name here</span>
		</h2>

		<div class="space-y-6">
			<h2 class="h2">Login</h2>
			<div class="card variant-soft-surface rounded-md flex justify-center">
				<form class="m-5 space-y-4" on:submit={handleLogin}>
					<label class="label">
						<span>Username</span>
						<input
							disabled={loading}
							aria-disabled={loading}
							class="input pl-1"
							type="email"
							aria-label="username"
							inputmode="text"
							placeholder="user@email.com"
							value={username}
						/>
					</label>
					<label class="label space-y-2">
						<span>Password</span>
						<input
							disabled={loading}
							aria-disabled={loading}
							class="input pl-1"
							type={viewable ? 'text' : 'password'}
							aria-label="password"
							inputmode="decimal"
							placeholder="******"
							value={password}
						/>
						<SlideToggle
							size="sm"
							name="show-password"
							checked={viewable}
							on:click={() => (viewable = !viewable)}>Show Password</SlideToggle
						>
					</label>
					<button class="btn-md variant-ringed-secondary" id="submit" type="submit">Submit</button>
				</form>
			</div>
		</div>
	</div>
</div>
