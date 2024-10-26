<script>
    export let label
</script>

<label class="form-control w-full max-w-xs">
    <div class="label">
        <span class="label-text">{label}</span>
    </div>
    <slot />
</label>
