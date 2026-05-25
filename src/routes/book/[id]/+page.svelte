<script lang="ts">
	import { enhance } from '$app/forms';
	let { data, form } = $props();
	const { activity, isJoined } = $derived(data);
</script>

<div class="mx-auto max-w-2xl py-12">
	<div class="rounded-2xl bg-white p-10 shadow-xl border border-gray-100">
		<div class="mb-10 text-center">
			<h1 class="text-3xl font-bold text-gray-900">
				{isJoined ? 'Deine Buchung verwalten' : 'Teilnahme bestätigen'}
			</h1>
		</div>

		{#if form?.error}
			<div class="mb-6 rounded-md bg-red-50 p-4 border border-red-200">
				<div class="flex">
					<div class="flex-shrink-0">
						<svg class="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
							<path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd" />
						</svg>
					</div>
					<div class="ml-3">
						<h3 class="text-sm font-medium text-red-800">{form.error}</h3>
					</div>
				</div>
			</div>
		{/if}

		<div class="space-y-6 rounded-3xl bg-gray-50 p-8 shadow-inner">
			<div class="flex justify-between items-start">
				<h2 class="text-2xl font-bold text-brand-orange">{activity.title}</h2>
				{#if isJoined}
					<span class="bg-green-100 text-green-700 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">Angemeldet</span>
				{/if}
			</div>

			<div class="space-y-4">
				<div class="flex items-center rounded-xl bg-white p-4 text-gray-700 shadow-sm border border-gray-100">
					<svg viewBox="0 0 24 24" class="mr-3 h-6 w-6 fill-current text-brand-orange"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/></svg>
					{activity.location}
				</div>
				<div class="flex items-center rounded-xl bg-white p-4 text-gray-700 shadow-sm border border-gray-100">
					<svg viewBox="0 0 24 24" class="mr-3 h-6 w-6 fill-current text-brand-orange"><path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm.5-13H11v6l5.25 3.15.75-1.23-4.5-2.67z"/></svg>
					{activity.time}
				</div>
				<div class="flex items-center rounded-xl bg-white p-4 text-gray-700 shadow-sm border border-gray-100">
					<svg viewBox="0 0 24 24" class="mr-3 h-6 w-6 fill-current text-brand-orange"><path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5s-3 1.34-3 3 1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z"/></svg>
					<div>
						<p class="font-bold">{parseInt(activity.participants.split('/')[1]) - activity.joinedUsers.length} Plätze frei</p>
						<p class="text-xs text-gray-500">({activity.joinedUsers.length} von {activity.participants.split('/')[1]} angemeldet)</p>
					</div>
				</div>
			</div>

			<!-- Google Maps Embed -->
			<div class="overflow-hidden rounded-2xl border border-gray-200 shadow-sm h-64 w-full">
				<iframe
					title="Google Maps"
					width="100%"
					height="100%"
					style="border:0"
					loading="lazy"
					allowfullscreen
					referrerpolicy="no-referrer-when-downgrade"
					src="https://www.google.com/maps?q={encodeURIComponent(activity.location)}&output=embed">
				</iframe>
			</div>

			<div class="flex gap-4 pt-6">
				<a
					href="/dashboard"
					class="flex-1 rounded-xl bg-white py-4 text-center font-bold text-gray-600 shadow-md hover:bg-gray-100 transition-all border border-gray-100"
				>
					{isJoined ? 'Zurück zum Dashboard' : 'Abbrechen'}
				</a>

				{#if isJoined}
					<form method="POST" action="?/cancel" use:enhance class="flex-1">
						<button
							type="submit"
							class="w-full rounded-xl bg-red-50 py-4 text-center font-bold text-red-500 shadow-md hover:bg-red-500 hover:text-white transition-all border-2 border-red-100 hover:border-red-500"
						>
							Buchung canceln
						</button>
					</form>
				{:else}
					<form method="POST" action="?/join" use:enhance class="flex-1">
						<button
							type="submit"
							class="w-full rounded-xl bg-brand-blue py-4 text-center font-bold text-white shadow-md hover:bg-blue-700 transition-colors"
						>
							Teilnahme bestätigen
						</button>
					</form>
				{/if}
			</div>
		</div>
	</div>
</div>
