<script lang="ts">
	import { enhance } from '$app/forms';
	let location = $state('');
</script>

<div class="mx-auto max-w-3xl py-12">
	<div class="rounded-2xl bg-white p-10 shadow-xl">
		<div class="mb-8 flex items-center justify-between">
			<h1 class="text-3xl font-bold text-gray-900">Neue Aktivität erstellen</h1>
			<a href="/feed" class="text-brand-blue hover:underline">Zurück zum Feed</a>
		</div>

		<form method="POST" use:enhance class="space-y-6">
			<div class="grid grid-cols-1 gap-6 md:grid-cols-2">
				<div class="col-span-2">
					<label for="title" class="block text-sm font-medium text-gray-700">Titel der Aktivität</label>
					<input type="text" id="title" name="title" required class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-brand-blue focus:ring-brand-blue" placeholder="z.B. Badminton am Abend" />
				</div>

				<div>
					<label for="location" class="block text-sm font-medium text-gray-700">Ort</label>
					<input 
						type="text" 
						id="location" 
						name="location" 
						bind:value={location}
						required 
						class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-brand-blue focus:ring-brand-blue" 
						placeholder="z.B. Zürich Hardplatz" 
					/>
				</div>

				<div>
					<label for="time" class="block text-sm font-medium text-gray-700">Datum & Zeit</label>
					<input type="text" id="time" name="time" required class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-brand-blue focus:ring-brand-blue" placeholder="z.B. Heute, 19:45 Uhr" />
				</div>

				<div class="col-span-2">
					<label class="block text-sm font-medium text-gray-700 mb-2">Vorschau des Standorts</label>
					<div class="overflow-hidden rounded-xl border border-gray-200 bg-gray-50 h-48 w-full flex items-center justify-center text-gray-400">
						{#if location}
							<iframe
								title="Google Maps Preview"
								width="100%"
								height="100%"
								style="border:0"
								loading="lazy"
								src="https://www.google.com/maps?q={encodeURIComponent(location)}&output=embed">
							</iframe>
						{:else}
							<div class="text-center p-4">
								<svg viewBox="0 0 24 24" class="mx-auto h-8 w-8 mb-2 fill-current opacity-20"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/></svg>
								<p class="text-sm">Gib einen Ort ein, um die Vorschau zu sehen.</p>
							</div>
						{/if}
					</div>
				</div>

				<div>
					<label for="participants" class="block text-sm font-medium text-gray-700">Teilnehmer (z.B. 0/8)</label>
					<input type="text" id="participants" name="participants" required class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-brand-blue focus:ring-brand-blue" placeholder="0/8" />
				</div>

				<div>
					<label for="image" class="block text-sm font-medium text-gray-700">Bild-URL (Unsplash o.ä.)</label>
					<input type="url" id="image" name="image" required class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-brand-blue focus:ring-brand-blue" placeholder="https://images.unsplash.com/..." />
				</div>
			</div>

			<div class="pt-6">
				<button type="submit" class="w-full rounded-xl bg-brand-orange py-4 text-lg font-semibold text-white shadow-md hover:bg-orange-600 transition-colors">
					Aktivität veröffentlichen
				</button>
			</div>
		</form>
	</div>
</div>
