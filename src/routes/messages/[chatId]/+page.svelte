<script lang="ts">
    import type { PageData } from './$types';
    import { enhance } from '$app/forms';
    import { tick } from 'svelte';

    let { data }: { data: PageData } = $props();
    const userEmail = data.userEmail;
    
    let chatContainer: HTMLElement;
    let messageText = $state('');

    function scrollToBottom() {
        if (chatContainer) {
            chatContainer.scrollTop = chatContainer.scrollHeight;
        }
    }

    $effect(() => {
        if (data.chat.messages) {
            tick().then(scrollToBottom);
        }
    });

    function getOtherParticipant() {
        return data.chat.participants.find(p => p !== userEmail) || 'Unbekannt';
    }

    const title = data.chat.type === 'group' ? data.chat.title : getOtherParticipant();
</script>

<div class="flex flex-col h-[calc(100vh-12rem)] max-w-2xl mx-auto bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
    <header class="bg-white border-b border-gray-100 p-4 flex items-center space-x-4">
        <a href="/messages" class="text-gray-400 hover:text-brand-orange">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
            </svg>
        </a>
        <div class="w-10 h-10 {data.chat.type === 'group' ? 'bg-blue-100 text-blue-600' : 'bg-orange-100 text-brand-orange'} rounded-full flex items-center justify-center font-bold">
            {title[0].toUpperCase()}
        </div>
        <div>
            <h1 class="font-bold text-gray-900">{title}</h1>
            <p class="text-xs text-gray-500">{data.chat.type === 'group' ? 'Gruppen-Chat' : 'Privater Chat'}</p>
        </div>
    </header>

    <div 
        bind:this={chatContainer}
        class="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50/50"
    >
        {#if data.chat.messages.length === 0}
            <div class="text-center py-8">
                <p class="text-gray-400 text-sm">Noch keine Nachrichten. Schreib etwas!</p>
            </div>
        {/if}

        {#each data.chat.messages as msg}
            <div class="flex {msg.sender === userEmail ? 'justify-end' : 'justify-start'}">
                <div class="max-w-[80%] space-y-1">
                    {#if data.chat.type === 'group' && msg.sender !== userEmail}
                        <p class="text-[10px] text-gray-400 ml-2">{msg.sender}</p>
                    {/if}
                    <div class="px-4 py-2 rounded-2xl text-sm {msg.sender === userEmail ? 'bg-brand-orange text-white rounded-tr-none' : 'bg-white text-gray-800 border border-gray-100 rounded-tl-none'}">
                        {msg.text}
                    </div>
                    <p class="text-[10px] text-gray-400 {msg.sender === userEmail ? 'text-right mr-1' : 'ml-1'}">
                        {new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </p>
                </div>
            </div>
        {/each}
    </div>

    <footer class="p-4 bg-white border-t border-gray-100">
        <form 
            method="POST" 
            action="?/send" 
            use:enhance={() => {
                return async ({ update }) => {
                    messageText = '';
                    await update();
                    scrollToBottom();
                };
            }}
            class="flex items-center space-x-2"
        >
            <input 
                type="text" 
                name="text" 
                bind:value={messageText}
                placeholder="Nachricht schreiben..."
                class="flex-1 bg-gray-100 border-none rounded-full px-4 py-2 text-sm focus:ring-2 focus:ring-brand-orange transition-all"
                autocomplete="off"
            />
            <button 
                type="submit" 
                disabled={!messageText}
                class="bg-brand-orange text-white p-2 rounded-full hover:bg-orange-600 disabled:opacity-50 transition-colors"
            >
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
                </svg>
            </button>
        </form>
    </footer>
</div>
