<script>
    import { page } from '$app/stores'
</script>

<div class="w-full text-center">
    <h1>{$page.status} {$page.error.message}</h1>
    <p>Apologies for the inconvinence. Please try again later. </p>
</div>
