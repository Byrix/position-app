<script>
    import { getDistance } from '$lib'

    export let watchedPosition
    export let feature
    export let poetry

    $: actEl = getDistance([watchedPosition?.coords.longitude, watchedPosition?.coords.latitude], feature.geometry.coordinates) < 10

    let options = []
    let poem = []
    let selection = ''

    const getOptions = () => [poetry[`${selection}0`], poetry[`${selection}1`], poetry[`${selection}2`]]
    function selectOption(opt, ind) {
        poem = [...poem, opt]
        selection += `${ind}`
        options = selection.length < 3 ? getOptions() : []
    }
</script>

<div>
    {#each poem as line}
        <p>{line}</p>
    {/each}
</div>
<div class="flex flex-col mt-2">
    {#if actEl}
        {#each options as option, i}
            <button
                class="w-full bottom-2"
                on:click={() => selectOption(option, i)}
            >
                <p><i>Option {i + 1}</i></p>
                {option}
            </button>
        {/each}
    {:else}
        <p class="text-maroon">
            <b>You should take a closer look!</b><br>
            You must be within 10m to play the activities!
        </p>
    {/if}
</div>
