export interface Generation {
	id: number;
	name: string;
	length: number;
}

export const getGenerations = async () => {
	const numberOfGens = await fetch('https://pokeapi.co/api/v2/generation/')
		.then((res) => res.json())
		.then((res) => res.count);

	return await Promise.all(new Array(numberOfGens).fill('').map((x, i) => getGenDetails(i + 1)));
};

const getGenDetails = (id: number) =>
	fetch(`https://pokeapi.co/api/v2/generation/${id}`)
		.then((res) => res.json())
		.then((res) => ({
			id,
			name: res.main_region.name,
			length: res.pokemon_species.length
		}));
