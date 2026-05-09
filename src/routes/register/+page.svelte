<script lang="ts">
	import { enhance } from '$app/forms';
	import { HOBBIES } from '$lib/constants';

	let selectedHobbies = $state<string[]>([]);

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
		<h1 class="mb-8 text-3xl font-bold text-gray-900">Registrierung</h1>

		<form method="POST" use:enhance class="space-y-6">
			<div class="grid grid-cols-1 gap-6 sm:grid-cols-2">
				<div>
					<label for="email" class="block text-sm font-medium text-gray-700">Email-Adresse</label>
					<input type="email" id="email" name="email" required class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-brand-blue focus:ring-brand-blue" />
				</div>
				<div>
					<label for="password" class="block text-sm font-medium text-gray-700">Passwort</label>
					<input type="password" id="password" name="password" required class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-brand-blue focus:ring-brand-blue" />
				</div>
				<div>
					<label for="gender" class="block text-sm font-medium text-gray-700">Geschlecht</label>
					<select id="gender" name="gender" class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-brand-blue focus:ring-brand-blue">
						<option>Männlich</option>
						<option>Weiblich</option>
						<option>Divers</option>
					</select>
				</div>
				<div>
					<label for="age" class="block text-sm font-medium text-gray-700">Alter</label>
					<input type="number" id="age" name="age" required class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-brand-blue focus:ring-brand-blue" />
				</div>
			</div>

			<div>
				<label class="block text-sm font-medium text-gray-700 mb-2">Deine Hobbys</label>
				<div class="flex flex-wrap gap-2">
					{#each HOBBIES as hobby}
						<button
							type="button"
							onclick={() => toggleHobby(hobby.name)}
							class="px-4 py-2 rounded-full border text-sm transition-colors {selectedHobbies.includes(hobby.name) ? 'bg-brand-blue text-white border-brand-blue' : 'bg-gray-50 text-gray-700 border-gray-200 hover:border-brand-blue'}"
						>
							{hobby.name}
						</button>
					{/each}
				</div>
				<input type="hidden" name="hobbies" value={JSON.stringify(selectedHobbies)} />
			</div>

			<div class="flex items-center">
				<input type="checkbox" id="notifications" name="notifications" class="h-4 w-4 rounded border-gray-300 text-brand-blue focus:ring-brand-blue" />
				<label for="notifications" class="ml-2 block text-sm text-gray-900">Benachrichtigungen aktivieren</label>
			</div>

			<div class="pt-6">
				<button type="submit" class="w-full rounded-xl bg-brand-blue py-4 text-lg font-semibold text-white shadow-md hover:bg-blue-700 transition-colors">
					Konto erstellen & Entdecken
				</button>
			</div>
		</form>
	</div>
</div>
