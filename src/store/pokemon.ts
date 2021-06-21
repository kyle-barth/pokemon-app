import { writable } from 'svelte/store';

export interface Pokemon {
	id: number;
	name: string;
	url: string;
	image: string;
	shiny_image: string;
}

export const pokemon = writable<Pokemon[]>([]);

export const getPokemon = (num, offset) =>
	fetch(`https://pokeapi.co/api/v2/pokemon?limit=${num}&offset=${offset}`)
		.then((res) => res.json())
		.then((res) => {
			pokemon.set(
				res.results.map((x, i) => ({
					id: i + 1 + offset,
					name: x.name,
					url: x.url,
					image: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${
						i + 1 + offset
					}.png`,
					shiny_image: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/${
						i + 1 + offset
					}.png`
				}))
			);
		});
