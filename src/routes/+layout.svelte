<script lang="ts">
	import './layout.css';
	import favicon from '$lib/assets/favicon.svg';
	import { page } from '$app/state';

	let { data, children } = $props();
	const userEmail = $derived(data.userEmail);
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
	<title>Vibe Match</title>
</svelte:head>

<div class="min-h-screen bg-[#fcfdff] bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px]">
	<nav class="bg-white/80 backdrop-blur-md sticky top-0 z-50 border-b border-gray-100 shadow-sm">
		<div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
			<div class="flex h-16 justify-between items-center">
				<div class="flex items-center">
					<a href={userEmail ? "/dashboard" : "/"} class="text-2xl font-bold italic text-brand-orange">Vibe Match</a>
				</div>
				<div class="flex items-center space-x-2 sm:space-x-4">
					{#if userEmail}
						<a 
							href="/dashboard" 
							class="px-3 py-1.5 sm:px-4 sm:py-2 rounded-lg text-sm font-bold transition-all {page.url.pathname === '/dashboard' ? 'bg-brand-blue text-white shadow-md' : 'text-gray-600 hover:bg-gray-100'}"
						>
							Dashboard
						</a>
						<a 
							href="/friends" 
							class="px-3 py-1.5 sm:px-4 sm:py-2 rounded-lg text-sm font-bold transition-all {page.url.pathname === '/friends' ? 'bg-brand-blue text-white shadow-md' : 'text-gray-600 hover:bg-gray-100'}"
						>
							Freunde
						</a>
						<a 
							href="/messages" 
							class="px-3 py-1.5 sm:px-4 sm:py-2 rounded-lg text-sm font-bold transition-all {page.url.pathname.startsWith('/messages') ? 'bg-brand-blue text-white shadow-md' : 'text-gray-600 hover:bg-gray-100'}"
						>
							Nachrichten
						</a>
						<a 
							href="/profile" 
							class="px-3 py-1.5 sm:px-4 sm:py-2 rounded-lg text-sm font-bold transition-all {page.url.pathname === '/profile' ? 'bg-brand-blue text-white shadow-md' : 'text-gray-600 hover:bg-gray-100'}"
						>
							Profil
						</a>
					{:else}
						<a 
							href="/" 
							class="px-4 py-2 rounded-lg text-sm font-bold text-gray-600 hover:bg-gray-100 transition-all"
						>
							Login
						</a>
						<a 
							href="/register" 
							class="rounded-lg bg-brand-orange px-4 py-2 text-sm font-bold text-white shadow-sm hover:bg-orange-600 transition-all active:scale-95"
						>
							Registrieren
						</a>
					{/if}
				</div>
			</div>
		</div>
	</nav>

	<main class="mx-auto max-w-7xl p-4 sm:p-6 lg:p-8">
		{@render children()}
	</main>
</div>
