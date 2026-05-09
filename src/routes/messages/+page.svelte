<script lang="ts">
    import type { PageData } from './$types';
    import { page } from '$app/state';

    let { data }: { data: PageData } = $props();
    let activeTab = $state('private'); // 'private' or 'activity'

    const userEmail = data.userEmail;

    function getOtherParticipant(participants: string[]) {
        return participants.find(p => p !== userEmail) || 'Unbekannt';
    }
</script>

<div class="space-y-6 max-w-2xl mx-auto">
    <header>
        <h1 class="text-3xl font-bold text-gray-900">Nachrichten</h1>
    </header>

    <div class="flex border-b border-gray-200">
        <button 
            onclick={() => activeTab = 'private'}
            class="flex-1 py-3 text-center font-medium transition-colors {activeTab === 'private' ? 'text-brand-orange border-b-2 border-brand-orange' : 'text-gray-500 hover:text-gray-700'}"
        >
            Freunde
        </button>
        <button 
            onclick={() => activeTab = 'activity'}
            class="flex-1 py-3 text-center font-medium transition-colors {activeTab === 'activity' ? 'text-brand-orange border-b-2 border-brand-orange' : 'text-gray-500 hover:text-gray-700'}"
        >
            Aktivitäten
        </button>
    </div>

    <div class="space-y-4">
        {#if activeTab === 'private'}
            {#if data.privateChats.length === 0}
                <div class="bg-white rounded-xl p-8 text-center border border-dashed border-gray-300">
                    <p class="text-gray-500">Noch keine privaten Chats vorhanden.</p>
                    <a href="/friends" class="mt-4 inline-block text-brand-orange font-medium">Freunde finden</a>
                </div>
            {:else}
                {#each data.privateChats as chat}
                    <a href="/messages/{chat.id}" class="block bg-white rounded-xl p-4 shadow-sm border border-gray-100 hover:border-brand-orange transition-all group">
                        <div class="flex items-center space-x-4">
                            <div class="w-12 h-12 bg-orange-100 text-brand-orange rounded-full flex items-center justify-center font-bold">
                                {getOtherParticipant(chat.participants)[0].toUpperCase()}
                            </div>
                            <div class="flex-1 min-w-0">
                                <div class="flex justify-between items-start">
                                    <p class="text-sm font-semibold text-gray-900 truncate">
                                        {getOtherParticipant(chat.participants)}
                                    </p>
                                    {#if chat.lastMessage}
                                        <span class="text-xs text-gray-400">
                                            {new Date(chat.lastMessage.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                        </span>
                                    {/if}
                                </div>
                                <p class="text-sm text-gray-500 truncate">
                                    {chat.lastMessage?.text || 'Keine Nachrichten'}
                                </p>
                            </div>
                        </div>
                    </a>
                {/each}
            {/if}
        {:else}
            {#if data.activityChats.length === 0}
                <div class="bg-white rounded-xl p-8 text-center border border-dashed border-gray-300">
                    <p class="text-gray-500">Du bist noch bei keiner Aktivität angemeldet.</p>
                    <a href="/feed" class="mt-4 inline-block text-brand-orange font-medium">Aktivitäten entdecken</a>
                </div>
            {:else}
                {#each data.activityChats as chat}
                    <a href="/messages/group-{chat.id}" class="block bg-white rounded-xl p-4 shadow-sm border border-gray-100 hover:border-brand-orange transition-all group">
                        <div class="flex items-center space-x-4">
                            <div class="w-12 h-12 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center font-bold">
                                #
                            </div>
                            <div class="flex-1 min-w-0">
                                <p class="text-sm font-semibold text-gray-900 truncate">{chat.title}</p>
                                <p class="text-sm text-gray-500 truncate">Gruppen-Chat</p>
                            </div>
                        </div>
                    </a>
                {/each}
            {/if}
        {/if}
    </div>
</div>
