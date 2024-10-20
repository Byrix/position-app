<script>
</script>

<style>
    .bg-base {
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

    .text-text {
        color: #333;
    }

    .text-xl {
        font-size: 2rem;
    }

    .text-sm {
        font-size: 0.875rem;
    }

    .purple-bg {
        background-color: #cdb4db;
    }

    .text-mantle {
        color: #fff;
    }

    .rounded-3xl {
        border-radius: 1.5rem;
    }

    .center {
        display: flex;
        justify-content: center;
        align-items: center;
    }
</style>

<svelte:head>
    <title>Home Page</title>
</svelte:head>

<div class="w-full bg-base flex flex-col h-full align-middle justify-center center">
    <h1 class="self-center text-text text-xl">Welcome to PridePoints</h1>
    <p class="text-text self-center text-sm">By community, for community and in solidarity</p>

    <!-- svelte-ignore illegal-attribute-character -->
    <a
        href="/play"
        sveltekit:prefetch
        class="self-center w-[50%] h-[5%] mt-10">
        <div class="w-full h-full purple-bg flex justify-center items-center rounded-3xl">
            <h1 class="text-mantle">Start your journey now!</h1>
        </div>
    </a>
</div>
