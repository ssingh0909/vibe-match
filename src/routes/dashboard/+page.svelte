<script lang="ts">
	let { data } = $props();
	const { userEmail, bookings } = $derived(data);
</script>

<div class="space-y-12 py-6">
	<div class="rounded-3xl bg-brand-orange p-10 text-white shadow-xl flex flex-col items-center text-center">
		<h1 class="text-4xl font-bold">Hallo, {userEmail.split('@')[0]}! 👋</h1>
		<p class="mt-2 text-lg opacity-90">Willkommen zurück auf deinem Vibe Match Dashboard.</p>
		
		<div class="mt-8 flex flex-col sm:flex-row gap-4 justify-center w-full">
			<a href="/feed" class="w-full sm:w-64 rounded-xl bg-white px-6 py-4 text-center font-bold text-brand-orange shadow-md hover:bg-gray-100 transition-colors">
				Aktivitäten entdecken
			</a>
			<a href="/admin/add-activity" class="w-full sm:w-64 rounded-xl border-2 border-white px-6 py-4 text-center font-bold text-white hover:bg-white hover:text-brand-orange transition-all">
				Neue Aktivität erstellen
			</a>
		</div>
	</div>

	<section>
		<div class="mb-6 flex items-center justify-between">
			<h2 class="text-2xl font-bold text-gray-900">Deine nächsten Buchungen</h2>
			<span class="rounded-full bg-gray-200 px-3 py-1 text-sm font-medium text-gray-600">{bookings.length} Aktivität(en)</span>
		</div>

		{#if bookings.length === 0}
			<div class="flex flex-col items-center justify-center rounded-3xl border-2 border-dashed border-gray-300 bg-white p-16 text-center text-gray-400">
				<div class="mb-4 rounded-full bg-gray-100 p-6">
					<svg viewBox="0 0 24 24" class="h-12 w-12 fill-current opacity-30"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/></svg>
				</div>
				<p class="text-xl font-medium">Du hast noch keine Aktivitäten gebucht.</p>
				<p class="mt-2">Schau im Feed vorbei und finde deinen nächsten Vibe!</p>
				<a href="/feed" class="mt-6 font-bold text-brand-blue hover:underline">Zum Feed →</a>
			</div>
		{:else}
			<div class="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
				{#each bookings as booking}
					<div class="flex items-center space-x-4 rounded-2xl bg-white p-4 shadow-md transition-shadow hover:shadow-lg border border-gray-100">
						<img src={booking.image} alt={booking.title} class="h-20 w-20 rounded-xl object-cover" />
						<div class="flex-1 min-w-0">
							<h3 class="font-bold text-gray-900 truncate">{booking.title}</h3>
							<p class="text-sm text-gray-500 truncate">{booking.location}</p>
							<p class="text-xs font-medium text-brand-orange mt-1">{booking.time}</p>
						</div>
						<a href="/book/{booking.id}" class="rounded-full bg-gray-100 p-2 text-gray-400 hover:text-brand-blue">
							<svg viewBox="0 0 24 24" class="h-5 w-5 fill-current"><path d="M12 4l-1.41 1.41L16.17 11H4v2h12.17l-5.58 5.59L12 20l8-8z"/></svg>
						</a>
					</div>
				{/each}
			</div>
		{/if}
	</section>
</div>
