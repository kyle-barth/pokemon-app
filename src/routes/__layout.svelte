<script>
	import Nav from '../components/nav.svelte';
</script>

<svelte:head>
	<title>Pokémon App!</title>
</svelte:head>

<Nav />

<div class="max-w-6xl mx-auto px-4 sm:px-14">
	<slot />
</div>

<style lang="postcss">
	@tailwind base;
	@tailwind components;
	@tailwind utilities;
</style>
