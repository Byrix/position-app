<script>
</script>

<svelte:head>
    <title>Home Page</title>
</svelte:head>

<div class="w-full bg-base flex flex-col h-full align-middle justify-center center">
    <h1 class="self-center text-text text-xl">Discover your story today!</h1>
    <p class="text-text self-center text-sm">Join millions of others world wide!</p>

    <!-- svelte-ignore illegal-attribute-character -->
    <a
        href="/play"
        sveltekit:prefetch
        class="self-center w-[50%] h-[5%] mt-10">
        <div class="w-full h-full bg-green flex justify-center items-center rounded-3xl">
            <h1 class="text-mantle">Play now!</h1>
        </div>
    </a>
</div>
