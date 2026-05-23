<script lang="ts">
	import { enhance } from '$app/forms';
	let { form } = $props();
</script>

<div class="flex min-h-[calc(100vh-12rem)] flex-col items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
	<div class="w-full max-w-md space-y-8 rounded-2xl bg-white p-10 shadow-xl">
		<div class="text-center">
			<div class="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-brand-orange text-white">
				<svg viewBox="0 0 24 24" class="h-10 w-10 fill-current">
					<path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
				</svg>
			</div>
			<h2 class="mt-6 text-3xl font-extrabold text-gray-900 italic">Vibe Match</h2>
			<p class="mt-2 text-sm text-gray-600">Finde deinen Vibe und triff neue Leute.</p>
		</div>

		{#if form?.error}
			<div class="rounded-md bg-red-50 p-4">
				<div class="flex">
					<div class="ml-3">
						<h3 class="text-sm font-medium text-red-800">{form.error}</h3>
						<div class="mt-2 text-sm text-red-700">
							<p>Noch kein Konto? <a href="/register" class="font-bold underline">Jetzt registrieren</a></p>
						</div>
					</div>
				</div>
			</div>
		{/if}

		<form class="mt-8 space-y-6" method="POST" use:enhance>
			<div class="-space-y-px rounded-md shadow-sm">
				<div>
					<label for="email-address" class="sr-only">Email-Adresse</label>
					<input
						id="email-address"
						name="email"
						type="email"
						autocomplete="email"
						required
						class="relative block w-full appearance-none rounded-none rounded-t-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-brand-blue focus:outline-none focus:ring-brand-blue sm:text-sm"
						placeholder="Email-Adresse"
					/>
				</div>
				<div>
					<label for="password" class="sr-only">Passwort</label>
					<input
						id="password"
						name="password"
						type="password"
						autocomplete="current-password"
						required
						class="relative block w-full appearance-none rounded-none rounded-b-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-brand-blue focus:outline-none focus:ring-brand-blue sm:text-sm"
						placeholder="Passwort"
					/>
				</div>
			</div>

			<div>
				<button
					type="submit"
					class="group relative flex w-full justify-center rounded-md border border-transparent bg-brand-blue py-2 px-4 text-sm font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-brand-blue focus:ring-offset-2"
				>
					Anmelden
				</button>
			</div>
		</form>

		<div class="text-center pt-6 border-t border-gray-100">
			<p class="text-xs text-gray-500 mb-3">Noch kein Mitglied?</p>
			<a 
				href="/register" 
				class="inline-block w-full rounded-xl border-2 border-brand-blue/20 bg-blue-50/50 px-6 py-3 text-sm font-bold text-brand-blue hover:bg-brand-blue hover:text-white transition-all active:scale-95 shadow-sm"
			>
				Konto erstellen
			</a>
		</div>
	</div>
</div>
