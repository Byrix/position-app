<script>
    import { base } from '$app/paths' // DoNotChange
    import { page } from '$app/stores'
    import { toTitleCase } from '$lib'
    import Fill from '$lib/assets/Fill.svelte'
    import Modal from '$lib/assets/Modal.svelte'
    import { onMount, setContext } from 'svelte'
    import { fade } from 'svelte/transition'
    import '../app.css' // DoNotChange

    let nsfw, mdlNsfw, showingModal

    const navOptions = {
        home: '/',
        about: '/about',
        example: '/example',
        play: '/play'
    }

    onMount(() => {
        if (nsfw === undefined && mdlNsfw) {
            mdlNsfw.showModal()
            showingModal = true
        }
    })

    function handleNsfw(choice) {
        nsfw = choice
        showingModal = false
        mdlNsfw.hideModal()
        setContext('nsfw', nsfw)
    }
</script>

<!-- Website title -->
<svelte:head>
    <title>PridePoints</title>
</svelte:head>

<!-- Header -->
<div class="navbar bg-surface0 flex flex-row">
    {#each Object.entries(navOptions) as [name, path]}
        <a
            class="btn btn-ghost text-xl flex-grow text-text"
            class:font-bold={$page.url.pathname === path}
            href="{base}{path}"
        >
            {toTitleCase(name)}
        </a>
    {/each}
</div>

<!-- Main content -->
<main class="max-w-[1920px] container mx-auto h-screen">
    <slot reset />
</main>

{#if showingModal}
    <div
        class="fixed inset-0 bg-black bg-opacity-50"
        transition:fade={{ duration: 300 }}
    />
{/if}
<Modal
    id="ageCheck"
    header="Age Verification"
    close={false}
    bind:this={mdlNsfw}
>
    <p>Some locations explored in this app may not be suitable for users of all ages. By clicking the box below you agree that you are at least 18 years of age, or the age of majority in the jurisdiction you are accessing the app from, and consent to viewing sexually-related materials.</p>
    <div class="flex flex-row">
        <Fill />
        <button
            class="btn bg-lavender"
            on:click={() => { handleNsfw(true) }}
        >
            I agree, continue
        </button>
        <Fill />
        <button
            class="btn bg-lavender"
            on:click={() => { handleNsfw(false) }}
        >
            No, hide NSFW content
        </button>
        <Fill />
    </div>
</Modal>

<style>
    .navbar {
        background-color: var(--surface0);
        display: flex;
        flex-direction: row;
        padding: 0.2rem;
    }

    .btn {
        background: none;
        border: none;
        color: var(--text);
        cursor: pointer;
        font-size: 1.25rem;
        padding: 0.5rem 1rem;
        text-align: center;
        text-decoration: none;
        transition: background-color 0.3s ease;
    }

    .btn:hover {
        background-color: var(--surface1);
    }

    .container {
        margin: 0 auto;
        max-width: 1920px;
        padding: 0rem;
    }

    main {
        height: 100vh;
        overflow: auto;
    }
</style>
