<script lang="ts">
	import { enhance } from '$app/forms';
	import { HOBBIES } from '$lib/constants';

	let { data, form } = $props();
	const { user } = $derived(data);

	let selectedHobbies = $state<string[]>([]);
	
	// Initialize selectedHobbies when user data is available
	$effect(() => {
		if (user && user.hobbies) {
			selectedHobbies = user.hobbies;
		}
	});

	function toggleHobby(hobby: string) {
		if (selectedHobbies.includes(hobby)) {
			selectedHobbies = selectedHobbies.filter(h => h !== hobby);
		} else {
			selectedHobbies = [...selectedHobbies, hobby];
		}
	}
</script>

<div class="mx-auto max-w-2xl py-12">
	<div class="rounded-2xl bg-white p-10 shadow-xl">
		<h1 class="mb-2 text-3xl font-bold text-gray-900">Mein Profil</h1>
		<p class="mb-8 text-gray-600">Verwalte deine persönlichen Angaben und Präferenzen.</p>

		{#if form?.success}
			<div class="mb-6 rounded-md bg-green-50 p-4 text-sm font-medium text-green-800">
				Profil erfolgreich aktualisiert!
			</div>
		{/if}

		<form method="POST" use:enhance class="space-y-6">
			<div class="space-y-4">
				<div>
					<label class="block text-sm font-medium text-gray-500">Email-Adresse (nicht änderbar)</label>
					<p class="mt-1 text-lg font-semibold text-gray-900">{user.email}</p>
				</div>

				<div class="grid grid-cols-1 gap-6 sm:grid-cols-2">
					<div>
						<label for="gender" class="block text-sm font-medium text-gray-700">Geschlecht</label>
						<select id="gender" name="gender" class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-brand-blue focus:ring-brand-blue" value={user.gender}>
							<option>Männlich</option>
							<option>Weiblich</option>
							<option>Divers</option>
						</select>
					</div>
					<div>
						<label for="age" class="block text-sm font-medium text-gray-700">Alter</label>
						<input type="number" id="age" name="age" class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-brand-blue focus:ring-brand-blue" value={user.age} />
					</div>
				</div>

				<div>
					<label class="block text-sm font-medium text-gray-700 mb-2">Deine Hobbys</label>
					<div class="flex flex-wrap gap-2">
						{#each HOBBIES as hobby}
							<button
								type="button"
								onclick={() => toggleHobby(hobby.name)}
								class="px-3 py-1.5 rounded-full border text-xs transition-colors {selectedHobbies.includes(hobby.name) ? 'bg-brand-blue text-white border-brand-blue' : 'bg-gray-50 text-gray-700 border-gray-200 hover:border-brand-blue'}"
							>
								{hobby.name}
							</button>
						{/each}
					</div>
					<input type="hidden" name="hobbies" value={JSON.stringify(selectedHobbies)} />
				</div>

				<div class="flex items-center pt-2">
					<input type="checkbox" id="notifications" name="notifications" class="h-4 w-4 rounded border-gray-300 text-brand-blue focus:ring-brand-blue" checked={user.notifications} />
					<label for="notifications" class="ml-2 block text-sm text-gray-900">Benachrichtigungen aktivieren</label>
				</div>
			</div>

			<div class="pt-6 border-t border-gray-100">
				<button type="submit" class="w-full rounded-xl bg-brand-blue py-3 text-lg font-semibold text-white shadow-md hover:bg-blue-700 transition-colors">
					Änderungen speichern
				</button>
			</div>
		</form>

		<div class="mt-12 pt-8 border-t border-gray-100 flex flex-col items-center">
			<p class="text-sm text-gray-500 mb-4">Möchtest du dich abmelden?</p>
			<form method="POST" action="/logout">
				<button type="submit" class="rounded-lg border-2 border-red-100 px-6 py-2 text-sm font-bold text-red-500 hover:bg-red-50 hover:border-red-200 transition-all">
					Abmelden
				</button>
			</form>
		</div>
	</div>
</div>
