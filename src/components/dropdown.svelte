<script lang="ts">
	import { fly } from 'svelte/transition';
	import { slide } from '../animations/slide';

	let dropdownPopoverShow = false;
	const showDropdown: () => boolean = () => (dropdownPopoverShow = true);
	const closeDropdown: () => boolean = () => (dropdownPopoverShow = false);

	export let label;
	export let dropdownOptions;
	export let selected;
</script>

<div class="flex items-center">
	<span class="pr-2">{label}:</span>

	<div on:mouseenter={showDropdown} on:mouseleave={closeDropdown} class="z-50">
		<input
			bind:value={selected}
			class="p-1 rounded bg-gray-200 text-gray-700 w-24 border-none text-center cursor-pointer font-extrabold"
			disabled
		/>
		▽
		{#if dropdownPopoverShow}
			<div
				in:fly={slide}
				out:fly={slide}
				class="absolute rounded shadow-lg bg-gray-200 text-gray-700 w-24 flex flex-col"
			>
				{#each dropdownOptions as dropdownOption}
					<button
						on:click={() => {
							selected = dropdownOption;
						}}
						class={`p-1 hover:bg-gray-50 rounded focus:outline-none ${
							dropdownOption === selected ? 'underline' : ''
						}`}
					>
						{dropdownOption}
					</button>
				{/each}
			</div>
		{/if}
	</div>
</div>
