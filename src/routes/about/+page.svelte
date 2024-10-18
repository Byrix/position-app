<script>
    import Art from '$lib/assets/art.svelte'
    import Beat from '$lib/assets/beat.svelte'
    import Church from '$lib/assets/church.svelte'
</script>

<div class="w-full text-center">
    <p>This is an about page</p>
    <p>
        I am testing my icon
        <span style="display: inline-block; vertical-align: middle;">
            <Art />
        </span>
        to see if I can print it inline!
        <span style="display: inline-block; vertical-align: middle;">
            <Beat />
        </span>
        <span style="display: inline-block; vertical-align: middle;">
            <Church />
        </span>
    </p>
</div>
