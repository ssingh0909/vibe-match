<script lang="ts">
	import { fade, fly } from 'svelte/transition';
	let { data } = $props();
	
	const { activities, full, categories, userHobbies } = data;
	
	let currentIndex = $state(0);
	let viewMode = $state('swipe'); // 'swipe' or 'list'
	let selectedCategory = $state('Alle');

	const filteredActivities = $derived(
		selectedCategory === 'Alle' 
			? activities 
			: activities.filter(a => a.category === selectedCategory)
	);

	const currentActivity = $derived(filteredActivities[currentIndex]);
	
	const listSections = $derived([
		{ title: 'Passend zu deinen Interessen', activities: filteredActivities.filter(a => a.interestScore > 0) },
		{ title: 'Andere Aktivitäten', activities: filteredActivities.filter(a => a.interestScore === 0) }
	]);

	function next() {
		if (currentIndex < filteredActivities.length) {
			currentIndex++;
		}
	}

	function handleKeydown(event: KeyboardEvent) {
		if (viewMode === 'swipe') {
			if (event.key === 'ArrowLeft') next();
			if (event.key === 'ArrowRight' && currentActivity) {
				window.location.href = `/book/${currentActivity.id}`;
			}
		}
	}

	function selectCategory(cat: string) {
		selectedCategory = cat;
		currentIndex = 0;
	}
</script>

<svelte:window onkeydown={handleKeydown} />

<div class="space-y-6">
	<!-- Control Bar -->
	<div class="flex flex-col sm:flex-row justify-between items-center gap-4 bg-white/60 p-4 rounded-2xl backdrop-blur-sm border border-white/40 shadow-sm">
		<div class="text-center sm:text-left">
			<h1 class="text-2xl font-bold text-gray-900">Aktivitäten entdecken</h1>
			<p class="text-xs text-gray-500 italic">Standort: ZHAW SML (Winterthur)</p>
		</div>

		<div class="flex bg-gray-100 p-1 rounded-xl">
			<button 
				onclick={() => viewMode = 'swipe'}
				class="px-6 py-2 rounded-lg text-sm font-bold transition-all {viewMode === 'swipe' ? 'bg-white text-brand-orange shadow-sm' : 'text-gray-500 hover:text-gray-700'}"
			>
				Swipe Mode
			</button>
			<button 
				onclick={() => viewMode = 'list'}
				class="px-6 py-2 rounded-lg text-sm font-bold transition-all {viewMode === 'list' ? 'bg-white text-brand-orange shadow-sm' : 'text-gray-500 hover:text-gray-700'}"
			>
				Listenansicht
			</button>
		</div>
	</div>

	<!-- Category Filter -->
	<div class="flex flex-wrap gap-2 overflow-x-auto pb-2 scrollbar-hide">
		<button 
			onclick={() => selectCategory('Alle')}
			class="px-4 py-2 rounded-full text-sm font-bold transition-all whitespace-nowrap {selectedCategory === 'Alle' ? 'bg-brand-orange text-white' : 'bg-white text-gray-600 border border-gray-100'}"
		>
			Alle
		</button>
		{#each categories as category}
			<button 
				onclick={() => selectCategory(category)}
				class="px-4 py-2 rounded-full text-sm font-bold transition-all whitespace-nowrap {selectedCategory === category ? 'bg-brand-orange text-white' : 'bg-white text-gray-600 border border-gray-100'}"
			>
				{category}
			</button>
		{/each}
	</div>

	{#if viewMode === 'swipe'}
		<!-- SWIPE VIEW -->
		<div class="relative flex flex-col items-center justify-center min-h-[600px] py-6">
			{#if currentIndex < filteredActivities.length && currentActivity}
				<div class="relative w-full max-w-md h-[650px] perspective-1000">
					{#key currentActivity.id}
						<div 
							in:fade={{ duration: 200 }} 
							out:fly={{ x: -200, duration: 300 }}
							class="absolute inset-0 bg-white rounded-3xl shadow-2xl overflow-hidden flex flex-col border border-gray-100"
						>
							<div class="relative h-1/2 w-full">
								<img src={currentActivity.image} alt={currentActivity.title} class="h-full w-full object-cover" />
								<div class="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent"></div>
								
								{#if currentActivity.interestScore > 0}
									<div class="absolute top-4 left-4 rounded-full bg-brand-orange px-3 py-1 text-[10px] font-bold text-white shadow-lg animate-pulse">
										DEIN VIBE! ✨
									</div>
								{/if}

								<div class="absolute bottom-6 left-6 right-6 text-white text-left">
									<h2 class="text-3xl font-extrabold mb-1 leading-tight">{currentActivity.title}</h2>
									<div class="flex items-center text-sm font-medium opacity-90">
										<svg viewBox="0 0 24 24" class="mr-1 h-4 w-4 fill-current text-white"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/></svg>
										{currentActivity.location} ({currentActivity.distance} km)
									</div>
								</div>
							</div>
							<div class="flex-1 flex flex-col">
								<div class="p-6 space-y-4">
									<div class="flex justify-between items-center">
										<div class="flex items-center text-gray-700">
											<svg viewBox="0 0 24 24" class="mr-3 h-5 w-5 fill-current text-brand-orange"><path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm.5-13H11v6l5.25 3.15.75-1.23-4.5-2.67z"/></svg>
											<span class="font-semibold">{currentActivity.time}</span>
										</div>
										<span class="text-[10px] font-bold text-gray-400 uppercase tracking-widest">{currentActivity.category}</span>
									</div>
									<div class="flex items-center text-gray-700">
										<svg viewBox="0 0 24 24" class="mr-3 h-5 w-5 fill-current text-brand-orange"><path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5s-3 1.34-3 3 1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z"/></svg>
										<span>{currentActivity.joinedCount} / {currentActivity.maxParticipants} angemeldet</span>
									</div>
								</div>
								<div class="flex-1 bg-gray-100 border-t border-gray-100">
									<iframe
										title="Location Preview"
										width="100%"
										height="100%"
										style="border:0"
										loading="lazy"
										src="https://www.google.com/maps?q={encodeURIComponent(currentActivity.location)}&output=embed">
									</iframe>
								</div>
							</div>
						</div>
					{/key}
				</div>

				<!-- Swipe Controls -->
				<div class="mt-8 flex items-center justify-center gap-12">
					<button onclick={next} class="flex h-16 w-16 items-center justify-center rounded-full bg-white shadow-lg border-2 border-gray-50 text-red-500 hover:border-red-200 transition-all active:scale-90">
						<svg viewBox="0 0 24 24" class="h-8 w-8 fill-current"><path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/></svg>
					</button>
					<a href="/book/{currentActivity.id}" class="flex h-16 w-16 items-center justify-center rounded-full bg-brand-blue shadow-lg text-white hover:bg-blue-600 transition-all active:scale-90">
						<svg viewBox="0 0 24 24" class="h-8 w-8 fill-current"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg>
					</a>
				</div>
				<div class="mt-6 text-xs text-gray-400 font-bold uppercase tracking-widest">
					{currentIndex + 1} / {filteredActivities.length} verfügbar
				</div>
			{:else}
				<div class="text-center p-12 bg-white rounded-3xl shadow-xl max-w-md w-full border border-gray-100" in:fade>
					<h2 class="text-2xl font-bold text-gray-800 mb-2">Fertig!</h2>
					<p class="text-gray-500 mb-8">Keine weiteren Aktivitäten in dieser Kategorie gefunden.</p>
					<button onclick={() => currentIndex = 0} class="rounded-xl bg-brand-orange px-8 py-3 font-bold text-white shadow-md">Nochmal von vorne</button>
				</div>
			{/if}
		</div>

	{:else}
		<!-- LIST VIEW -->
		<div class="space-y-12" in:fade>
			{#each listSections as section}
				{#if section.activities.length > 0}
					<section class="space-y-6">
						<h2 class="text-xl font-bold text-gray-800 border-b-2 border-brand-orange w-max pr-8 pb-1">{section.title}</h2>
						<div class="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
							{#each section.activities as activity}
								<div class="group bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow">
									<div class="relative h-32 w-full">
										<img src={activity.image} alt={activity.title} class="h-full w-full object-cover" />
										<div class="absolute top-2 right-2 flex flex-col gap-1">
											<div class="rounded-full bg-white/90 px-2 py-0.5 text-[10px] font-bold text-brand-orange shadow-sm">
												{activity.distance} km
											</div>
											{#if activity.interestScore > 0}
												<div class="rounded-full bg-brand-orange px-2 py-0.5 text-[10px] font-bold text-white shadow-sm">
													DEIN VIBE! ✨
												</div>
											{/if}
										</div>
									</div>
									<div class="p-4">
										<div class="flex justify-between items-start mb-2">
											<h3 class="font-bold text-gray-900 truncate flex-1">{activity.title}</h3>
											<span class="text-[9px] font-bold text-gray-400 uppercase ml-2">{activity.category}</span>
										</div>
										<p class="text-xs text-gray-500 mb-3">{activity.time}</p>
										<a href="/book/{activity.id}" class="block w-full text-center py-2 bg-brand-blue text-white rounded-lg text-xs font-bold hover:bg-blue-600 transition-colors">Details & Buchen</a>
									</div>
								</div>
							{/each}
						</div>
					</section>
				{/if}
			{/each}

			{#if full.length > 0 && selectedCategory === 'Alle'}
				<section class="space-y-6 pt-8 opacity-60">
					<h2 class="text-xl font-bold text-gray-400 italic">Ausgebucht</h2>
					<div class="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
						{#each full as activity}
							<div class="bg-gray-50 rounded-2xl border border-gray-200 overflow-hidden grayscale">
								<div class="h-32 w-full bg-gray-200">
									<img src={activity.image} alt={activity.title} class="h-full w-full object-cover opacity-50" />
								</div>
								<div class="p-4">
									<h3 class="font-bold text-gray-400 truncate mb-2">{activity.title}</h3>
									<button disabled class="w-full text-center py-2 bg-gray-300 text-gray-500 rounded-lg text-xs font-bold cursor-not-allowed">Vollbesetzt</button>
								</div>
							</div>
						{/each}
					</div>
				</section>
			{/if}
		</div>
	{/if}
</div>

<style>
	.perspective-1000 {
		perspective: 1000px;
	}
	.scrollbar-hide::-webkit-scrollbar {
		display: none;
	}
	.scrollbar-hide {
		-ms-overflow-style: none;
		scrollbar-width: none;
	}
</style>
