<script>
    import { onMount } from 'svelte'

    let poetry
    let options = []
    let poem = []
    let selection = ''

    function getOptions() {
        return [poetry[`${selection}0`], poetry[`${selection}1`], poetry[`${selection}2`]]
    }
    function selectOption(opt, ind) {
        poem = [...poem, opt]
        selection += `${ind}`
        options = selection.length < 3 ? getOptions() : []
    }

    onMount(async () => {
        fetch('poem.json').then((resp) => {
            return resp.json()
        }).then((data) => {
            poetry = data
            options = getOptions()
        }).catch((err) => {
            console.error(err)
            throw error(500, err)
        })
    })
</script>

<div>
    {#each poem as line}
        <p>{line}</p>
    {/each}
</div>
<div class="flex flex-col mt-2">
    {#each options as option, i}

        <button
            class="w-full bottom-2"
            on:click={() => selectOption(option, i)}
        >
            <p><i>Option {i + 1}</i></p>
            {option}
        </button>
    {/each}
</div>
