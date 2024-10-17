<script>
    import { base } from '$app/paths' // DoNotChange
    import { getCookie } from '$lib'
    import '../app.css' // DoNotChange

    let nsfw, nsfwPrompt
    nsfw = getCookie(nsfw)
    if (!nsfw) { nsfwPrompt = true }
</script>

<!-- Website title -->
<svelte:head>
    <title>Position App</title>
</svelte:head>

<!-- Header -->
<!-- HTML <a href="{base}/"></a> tag for routing -->
<div class="navbar bg-base-300 flex flex-row">
    <a
        class="btn btn-ghost text-xl flex-grow ml-5"
        href="{base}/"
    >
        Home
    </a>
    <a
        class="btn btn-ghost text-xl flex-grow"
        href="{base}/about"
    >
        About
    </a>
    <a
        class="btn btn-ghost text-xl flex-grow"
        href="{base}/example">
        Example
    </a>
    <a
        class="btn btn-ghost text-xl ml-auto mr-5"
        href="{base}/play">
        Play
    </a>
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
