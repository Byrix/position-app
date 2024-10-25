<script>
    export let id
    export let header = ''

    import Close from '$lib/assets/Close.svelte'

    let modal
    export function showModal() {
        modal.showModal()
    }
    export function hideModal() {
        modal.close()
    }
</script>

<dialog
    {id}
    class="modal bg-base text-text"
    bind:this={modal}
>
    <div class="modal-box flex flex-col m-3 w-[50vw] bg-base text-text">
        <div class="flex flex-row">
            <h2 class="font-bold text-lg">{header}</h2>
            <div class="flex-grow"></div>
            <form
                method="dialog"
                class="text-right"
            >
                <button><Close /></button>
            </form>
        </div>
        <div class="flex flex-col">
            <slot />
        </div>
    </div>
</dialog>
