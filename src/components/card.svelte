<script lang="ts">
	import { onMount } from 'svelte';
	import { fly } from 'svelte/transition';

	import { slide } from '../animations/slide';
	import type { Pokemon } from '../store/pokemon';
	export let pokemon: Pokemon;
	export let shinyToggle: boolean;

	let mounted: boolean = false;
	onMount(() => {
		mounted = true;
	});

	function preload() {
		return new Promise(function (resolve) {
			let img = new Image();
			img.onload = resolve;
			img.src = pokemon.image;

			let imgShiny = new Image();
			imgShiny.onload = resolve;
			imgShiny.src = pokemon.shiny_image;
		});
	}
</script>

{#if mounted}
	{#await preload() then _}
		<a
			class="p-4 h-52 text-center rounded-md flex flex-col items-center bg-gray-500 hover:bg-gray-400"
			href={`/pokemon/${pokemon.id}`}
		>
			<div class="h-3/4 flex items-center justify-center">
				{#if shinyToggle}
					<img class="h-32 w-32" src={pokemon.shiny_image} in:fly={slide} alt={pokemon.name} />
				{:else}
					<img class="h-32 w-32" src={pokemon.image} in:fly={slide} alt={pokemon.name} />
				{/if}
			</div>

			<h2
				class="uppercase text-l font-extrabold bg-gray-700 p-2 rounded-lg h-1/4 flex justify-center"
			>
				{pokemon.id}. {pokemon.name}
			</h2>
		</a>
	{/await}
{/if}

<style>
	img {
		color: transparent;
	}
</style>
