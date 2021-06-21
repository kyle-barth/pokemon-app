<script context="module" lang="ts">
	import { getPokemon } from '../store/pokemon';
	import { getGenerations } from '../store/generations';
	import type { Generation } from '../store/generations';

	export async function load() {
		await getPokemon(25, 0);
		let pokemonGens: Generation[] = await getGenerations();
		await Promise.all([getPokemon(25, 0), getGenerations()])

		return {
			props: {
				pokemonGens
			}
		};
	}
</script>

<script lang="ts">
	import { pokemon as pokemonStore } from '../store/pokemon';

	import Card from '../components/card.svelte';
	import Toggle from '../components/toggle.svelte';
	import Dropdown from '../components/dropdown.svelte';
	import Spacer from '../components/spacer.svelte';

	// Shiny toggle
	let shinyToggle = false;
	let searchTerm = '';

	// Generations Dropdown
	export let pokemonGens: Generation[];
	let genDropdownOptions = ['All', ...pokemonGens.map((g) => g.name)];
	let genSelected = genDropdownOptions[0];

	// Page Results Dropdown
	let pageResultsDropdownOptions = [25, 50, 150, 300, 1000];
	let pageResultsSelected = pageResultsDropdownOptions[0];

	// Load / apply filters
	let filteredPokemon = [];
	$: {
		const _ = pokemonGens.filter((x) => x.name === genSelected)[0];
		if (_) {
			const offset = pokemonGens.slice(0, pokemonGens.indexOf(_)).reduce((pv, cv) => {
				return pv + cv.length;
			}, 0);

			load(pageResultsSelected, offset, searchTerm);
		} else {
			load(pageResultsSelected, 0, searchTerm);
		}
	}

	const load = async (num, offset, search) => {
		await getPokemon(num, offset);
		filter(search);
	};
	const filter = (search) =>
		(filteredPokemon = $pokemonStore
			.filter((p) => p.name.includes(search))
			.slice(0, pageResultsSelected));
</script>

<h1 class="text-6xl font-extrabold text-center">Pokémon App</h1>
<p class="text-sm font-bold text-center mb-8">
	Visit <a href="https://kit.svelte.dev">kit.svelte.dev</a> to read the documentation
</p>

<input
	class="w-full rounded-md text-lg p-4 border-2 border-gray-200 text-gray-800 mb-8"
	bind:value={searchTerm}
	placeholder="Search Pokemon"
/>

<div class="mb-8 flex justify-end items-center">
	<Toggle bind:checked={shinyToggle} id="shiny" text="shiny" />
	<Spacer />
	<Dropdown label="Gen" dropdownOptions={genDropdownOptions} bind:selected={genSelected} />
	<Spacer />
	<Dropdown
		label="Results"
		dropdownOptions={pageResultsDropdownOptions}
		bind:selected={pageResultsSelected}
	/>
</div>

<div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
	{#each filteredPokemon as pokemon}
		<Card {shinyToggle} {pokemon} />
	{/each}
</div>
