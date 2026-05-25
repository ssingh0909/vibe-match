<script lang="ts">
    import type { PageData } from './$types';
    import { enhance } from '$app/forms';

    let { data }: { data: PageData } = $props();
</script>

<div class="space-y-8">
    <header class="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
            <h1 class="text-3xl font-bold text-gray-900">Deine Freunde</h1>
            <p class="text-gray-500">Verwalte deine Kontakte und finde neue Leute.</p>
        </div>
        
        <form class="flex" method="GET">
            <input 
                type="text" 
                name="q" 
                value={data.searchQuery || ''}
                placeholder="Nutzer suchen..." 
                class="rounded-l-lg border-gray-300 focus:border-brand-blue focus:ring-brand-blue text-sm"
            />
            <button class="bg-brand-blue text-white px-4 py-2 rounded-r-lg text-sm font-bold shadow-sm">
                Suchen
            </button>
        </form>
    </header>

    <section class="space-y-4">
        <h2 class="text-xl font-semibold text-gray-800">Meine Freunde ({data.friends.length})</h2>
        {#if data.friends.length === 0}
            <div class="bg-white rounded-xl p-8 text-center border border-dashed border-gray-300">
                <p class="text-gray-500">Du hast noch keine Freunde hinzugefügt.</p>
            </div>
        {:else}
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {#each data.friends as friend}
                    <div class="bg-white rounded-xl p-4 shadow-sm border border-gray-100 flex items-center space-x-4">
                        {#if friend.imageUrl}
                            <img src={friend.imageUrl} alt="Profile" class="w-12 h-12 rounded-full object-cover border border-gray-100" />
                        {:else}
                            <div class="w-12 h-12 bg-orange-100 text-brand-orange rounded-full flex items-center justify-center font-bold">
                                {friend.email[0].toUpperCase()}
                            </div>
                        {/if}
                        <div class="flex-1 min-w-0">
                            <p class="text-sm font-medium text-gray-900 truncate">{friend.email}</p>
                            <p class="text-xs text-gray-500">{friend.age} Jahre • {friend.gender}</p>
                        </div>
                        <a href="/messages?with={friend.email}" class="p-2 text-gray-400 hover:text-brand-orange transition-colors">
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                            </svg>
                        </a>
                    </div>
                {/each}
            </div>
        {/if}
    </section>

    <section class="space-y-4">
        <h2 class="text-xl font-semibold text-gray-800">
            {data.searchQuery ? 'Suchergebnisse' : 'Vorschläge'}
        </h2>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {#each data.potentialFriends as user}
                <div class="bg-white rounded-xl p-4 shadow-sm border border-gray-100 flex items-center space-x-4">
                    {#if user.imageUrl}
                        <img src={user.imageUrl} alt="Profile" class="w-12 h-12 rounded-full object-cover border border-gray-100" />
                    {:else}
                        <div class="w-12 h-12 bg-gray-100 text-gray-500 rounded-full flex items-center justify-center font-bold">
                            {user.email[0].toUpperCase()}
                        </div>
                    {/if}
                    <div class="flex-1 min-w-0">
                        <p class="text-sm font-medium text-gray-900 truncate">{user.email}</p>
                        <p class="text-xs text-gray-500">{user.age} Jahre • {user.gender}</p>
                    </div>
                    <form method="POST" action="?/addFriend" use:enhance>
                        <input type="hidden" name="friendEmail" value={user.email} />
                        <button type="submit" class="p-2 text-gray-400 hover:text-green-500 transition-colors">
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
                            </svg>
                        </button>
                    </form>
                </div>
            {:else}
                <p class="text-sm text-gray-500 italic">Keine Nutzer gefunden.</p>
            {/each}
        </div>
    </section>
</div>
