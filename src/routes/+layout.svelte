<script>
    import { base } from '$app/paths' // DoNotChange
    import { page } from '$app/stores'
    import { toTitleCase } from '$lib'
    import Fill from '$lib/assets/Fill.svelte'
    import Hamburger from '$lib/assets/Hamburger.svelte'
    import Modal from '$lib/assets/Modal.svelte'
    import { onMount, setContext } from 'svelte'
    import { fade } from 'svelte/transition'
    import '../app.css' // DoNotChange

    let nsfw, mdlNsfw, showingModal

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

    let hideDropdown = true
</script>

<!-- Website title -->
<svelte:head>
    <title>PridePoints</title>
</svelte:head>

<!-- Header -->
<nav class="bg-mantle w-full flex flex-row px-2 h-[50px] justify-center align-middle">
    <div class="dropdown lg:hidden w-max-[11%]">
        <button
            class="btn btn-ghost"
            on:click={() => { hideDropdown = !hideDropdown }}
        >
            <Hamburger />
        </button>
    </div>
    <div class="lg:ml-2 flex">
        <a
            class="text-2xl navbtn"
            href="{base}/"
        >
            PridePoints
        </a>
    </div>
    <Fill />
    <div class="lg:flex hidden w-max-[11%]">
        <a
            class="navbtn"
            class:font-bold={$page.url.pathname === '/about'}
            href="{base}/about"
        >
            About
        </a>
        <a
            class="navbtn"
            class:font-bold={$page.url.pathname === '/example'}
            href="{base}/example"
        >
            Example
        </a>
    </div>
    <Fill />
    <div class="flex w-max-[11%]">
        <a
            class="text-xl bg-lavender rounded-2xl my-auto p-2 w-24 text-center text-base"
            href="{base}/play"
        >
            Play
        </a>
    </div>
</nav>
<div
    class="w-full absolute z-[100] bg-mantle flex flex-col justify-center align-middle"
    class:hidden={hideDropdown}
>
    <a
        class="navbtn z-[1]"
        class:font-bold={$page.url.pathname === '/about'}
        href="{base}/about"
    >
        About
    </a>
    <a
        class="navbtn z-[1]"
        class:font-bold={$page.url.pathname === '/example'}
        href="{base}/example"
    >
        Example
    </a>
</div>

<!-- Main content -->
<main class="max-w-[1920px] container mx-auto h-screen bg-base">
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
    <div class="flex flex-row mt-2">
        <Fill />
        <button
            class="text-base bg-lavender flex h-12 w-full items-center justify-center rounded-3xl mr-1"
            on:click={() => { handleNsfw(true) }}
        >
            I agree, continue
        </button>
        <Fill />
        <button
            class="text-base bg-surface2 flex h-12 w-full items-center justify-center rounded-3xl ml-1"
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
