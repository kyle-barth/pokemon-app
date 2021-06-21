<script context="module" lang="ts">
	export async function load({ page }) {
		const id: number = page.params.id;
		const url: string = `https://pokeapi.co/api/v2/pokemon/${id}`;
		const res = await fetch(url).then((res) => res.json());

		return { props: { pokemon: res } };
	}
</script>

<script lang="ts">
	export let pokemon;
</script>

<div class="flex flex-col items-center">
	<h1 class="text-4xl text-center my-8 uppercase">{pokemon.name}</h1>
	<p>
		Type: <strong>{pokemon.types[0].type.name}</strong>
		| Height: <strong>{pokemon.height}</strong>
		| Weight: <strong>{pokemon.weight}</strong>
	</p>
	<div class="flex">
		<img class="w-40 h-40" src={pokemon.sprites['front_default']} alt={pokemon.name} />
		<img class="w-40 h-40" src={pokemon.sprites['front_shiny']} alt={pokemon.name} />
	</div>
</div>
