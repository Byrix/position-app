<svelte:head>
    <title>Home Page</title>
</svelte:head>

<div class="w-full flex flex-col h-full align-middle justify-center bg-rainbow">
    <h1 class="self-center text-text text-4xl">Welcome to PridePoints</h1>
    <p class="text-text self-center text-sm">By community, for community and in solidarity</p>

    <!-- svelte-ignore illegal-attribute-character -->
    <a
        href="/play"
        sveltekit:prefetch
        class="self-center w-[50%] h-[5%] mt-10">
        <div class="w-full h-full bg-lavender flex justify-center items-center rounded-3xl">
            <h1 class="text-base">Start your journey now!</h1>
        </div>
    </a>
</div>

<style>
    .bg-rainbow {
        background: linear-gradient(to right,
      #ffadad,
      #ffd6a5,
      #fdffb6,
      #caffbf,
      #9bf6ff,
      #a0c4ff,
      #bdb2ff,
      #ffc6ff);
    }
</style>
