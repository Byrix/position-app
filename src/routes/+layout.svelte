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

    .nsfw-prompt {
        background-color: var(--peach);
        max-width: 50%;
        max-height: 50%;
        padding: 1rem;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        z-index: 1;
    }
</style>

<script>
    import { base } from '$app/paths' // DoNotChange
    import { getCookie, toTitleCase } from '$lib'
    import '../app.css' // DoNotChange

    let nsfw, nsfwPrompt
    nsfw = getCookie(nsfw)
    if (!nsfw) { nsfwPrompt = true }

    const navOptions = {
        home: '/',
        about: '/about',
        example: '/example',
        play: '/play'
    }
</script>

<!-- Website title -->
<svelte:head>
    <title>Position App</title>
</svelte:head>

<!-- Header -->
<!-- HTML <a href="{base}/"></a> tag for routing -->
<div class="navbar bg-surface0 flex flex-row">
    {#each Object.entries(navOptions) as [name, path]}
        <a
            class="btn btn-ghost text-xl flex-grow text-text"
            href="{base}{path}"
        >
            {toTitleCase(name)}
        </a>
    {/each}
</div>

<!-- Main content -->
<!-- Content is inserted at <slot /> -->
<!-- DoNotChange -->
<main class="max-w-[1920px] container mx-auto h-screen">
    <!-- {#if nsfwPrompt}
        <div class="max-w-[50%] max-h-[50%] bg-peach z-1">
            NSFW Prompt here!
        </div>
    {/if} -->
    <slot reset />
</main>
