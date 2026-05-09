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
				<div class="flex items-center space-x-6">
					{#if userEmail}
						{#if page.url.pathname !== '/dashboard'}
							<a href="/dashboard" class="text-gray-600 hover:text-brand-orange font-medium">Dashboard</a>
						{/if}
						{#if page.url.pathname !== '/friends'}
							<a href="/friends" class="text-gray-600 hover:text-brand-orange font-medium">Freunde</a>
						{/if}
						{#if !page.url.pathname.startsWith('/messages')}
							<a href="/messages" class="text-gray-600 hover:text-brand-orange font-medium">Nachrichten</a>
						{/if}
						<a href="/profile" class="text-gray-600 hover:text-brand-orange font-medium {page.url.pathname === '/profile' ? 'text-brand-orange' : ''}">Mein Profil</a>
					{:else}
						<a href="/" class="text-gray-600 hover:text-brand-orange font-medium">Login</a>
						<a href="/register" class="rounded-lg bg-brand-orange px-4 py-2 text-white shadow-sm hover:bg-orange-600 transition-colors">Registrieren</a>
					{/if}
				</div>
			</div>
		</div>
	</nav>

	<main class="mx-auto max-w-7xl p-4 sm:p-6 lg:p-8">
		{@render children()}
	</main>
</div>
