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
