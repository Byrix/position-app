<script>
    import { getMapBounds } from '$lib'
    import ActivityOptions from '$lib/assets/ActivityOptions.svelte'
    import Close from '$lib/assets/Close.svelte'
    import Fill from '$lib/assets/Fill.svelte'
    import Modal from '$lib/assets/Modal.svelte'
    import Report from '$lib/assets/Report.svelte'
    import { error } from '@sveltejs/kit'
    import { getContext, onMount } from 'svelte'
    import Geolocation from 'svelte-geolocation'
    import {
        Control,
        ControlGroup,
        GeolocateControl,
        Layer,
        MapLibre,
        Popup
    } from 'svelte-maplibre'

    // Geolocation API related
    const options = {
        enableHighAccuracy: true,
        timeout: Infinity, // milliseconds
        maximumAge: 0, // milliseconds, 0 disables cached positions
    }
    const watchPosition = true
    let watchedPosition

    // Misc
    let truncate
    const txtMaxLen = 150

    // NSFW filtering
    let nsfw, nsfwFilter
    nsfw = getContext('nsfw')
    if (!nsfw) { nsfwFilter = ['all', ['!=', ['get', 'Classification'], 'Beat'], ['!=', ['get', 'Classification'], 'Sauna']] }

    // Data loading
    let dataSource, bounds
    onMount(async () => {
        fetch('data.geojson').then((resp) => {
            return resp.json()
        }).then((data) => {
            dataSource = { type: 'geojson', data }
            bounds = getMapBounds(data.features)
        }).catch((err) => {
            console.error(err)
            throw error(500, err)
        })
    })

    // Sidebar
    let feature
    let showSidebar = false
    function handleSymbolClick(event) {
        if (!showSidebar) { showSidebar = true }
        truncate = true
        feature = event.detail.features[0]
    }

    // Map symbology
    let map
    function loadMapSymbols() {
        const images = ['sauna', 'landmarks', 'nightlife', 'beat', 'shopfront', 'church', 'crime', 'community', 'hospital', 'gym', 'identity', 'relationships', 'default']
        images.forEach(async (image) => {
            try {
                const img = await map.loadImage(`/icon/${image}.png`)
                map.addImage(image, img.data)
            } catch (err) {
                console.err(`loadMapSymbols() | Error loading image | ${image}`)
                console.err(err)
            }
        })
    }

    // Modals
    let mdlReport, mdlReportSuccess
</script>

<div class="flex flex-row h-[100%] w-full cursor-default">
    <Geolocation
        getPosition={watchPosition}
        options={options}
        watch={true}
        on:position={(e) => {
            watchedPosition = e.detail
        }}
    />

    <!-- https://basemaps.cartocdn.com/gl/positron-gl-style/style.json -->
    <MapLibre
        class="map flex-grow min-h-[500px] cursor-default"
        standardControls
        style="https://basemaps.cartocdn.com/gl/positron-gl-style/style.json"
        bind:bounds
        bind:center={watchedPosition}
        zoom={14}
        bind:map={map}
        on:load={loadMapSymbols}
    >
        <!-- Custom control buttons -->
        <!-- <Control class="flex flex-col gap-y-2">
            <ControlGroup>
                <GeolocateControl
                    trackUserLocation={true}
                    positionOptions={options}>
                </GeolocateControl>
            </ControlGroup>
        </Control> -->

        <!-- Data layer -->
        <Layer
            id="research"
            type="symbol"
            source={dataSource}
            layout={{
                'icon-image': ['match', ['get', 'Classification'], 'Sauna', 'sauna', 'Place of Queer Significance', 'landmark', 'Nightlife', 'nightlife', 'Beat', 'beat', 'Shopfront', 'shopfront', 'Church', 'church', 'Crime', 'crime', 'Community Group', 'community', 'Hospital', 'hospital', 'Gym', 'gym', // NOTHING
                    'Identity', 'identity', 'Relationships', 'relationship', 'Community', 'community', 'default'],
                'icon-size': 0.2
            }}
            filter={nsfwFilter}
            on:click={handleSymbolClick}
        >
            <!-- <Layer
            id="research"
            type="circle"
            source={dataSource}
            paint={{
                'circle-radius': 5,
                'circle-color': 'red'
            }}
            filter={nsfwFilter}
            on:click={handleSymbolClick}
        > -->
            <Popup
                openOn="hover"
                let:data
            >
                {@const props = data?.properties}
                {#if props}
                    <div class="flex flex-col gap-2">
                        <p>{props.Name}</p>
                        <p>{props.Classification}</p>
                    </div>
                {/if}
                Click for more!
            </Popup>
        </Layer>
    </MapLibre>

    {#if showSidebar && feature}
        <div class="flex flex-col text-text bg-base fixed inset-0 w-full h-full z-50 sm:static sm:min-w-[20%] sm:max-w-[25%] sm:h-auto sm:bg-base sm:p-2 sm:overflow-auto sm:overflow-y-auto">
            <div class="w-full flex flex-row">
                <button on:click={() => showSidebar = false}>
                    <Close />
                </button>
                <Fill />
                <button on:click={() => mdlReport.showModal()}>
                    <Report />
                </button>
            </div>
            <div>
                <h5 class="text-lg"><b>{feature.properties.Name}</b></h5>
                <span class="text-xs py-2">{feature.properties.Classification}</span><br>
                <span class="text-xs italic">{feature.properties.Address}</span>
                <p class="py-2">
                    {#if feature.properties.Story.length > txtMaxLen}
                        {#if truncate}
                            {feature.properties.Story.slice(0, txtMaxLen)}
                            <button
                                on:click={() => { truncate = false }}
                                class="text-sky">Read more...</button>
                        {:else}
                            {feature.properties.Story}
                            <button
                                on:click={() => { truncate = true }}
                                class="text-sky">Read less...</button>
                        {/if}
                    {:else}
                        {feature.properties.Story}
                    {/if}
                </p>
            </div>
            <div class="mt-3 mb-3 border-t-2 border-b-2">
                <h3>Write a poem with someone!</h3>
                <ActivityOptions
                    bind:watchedPosition
                    bind:feature
                />
            </div>
            <Fill />
            <div class="text-xs text-subtext1">
                Source: {feature.properties.Source}
            </div>
        </div>
    {/if}

    <Modal
        id="report"
        header="Report a location"
        bind:this={mdlReport}
    >
        <p>Seen something wrong? Please fill out the following with any information you have that is relevant and our team will review shortly!</p>
        <textarea
            class="textarea mt-2 bg-mantle text-text"
            placeholder="Please report your issue here."
        />
        <button
            class="btn text-base bg-lavender mt-2"
            on:click={() => {
                mdlReportSuccess.showModal()
                mdlReport.hideModal()
            }}
        >
            Submit
        </button>
    </Modal>
    <Modal
        id="report-success"
        header="Thank you!"
        bind:this={mdlReportSuccess}
    >
        <p>Thank you for your report! Our team will review it shortly and take any actions we determine neccersary. Thank you for helping to make PridePoints a welcome and inclusive space for all!! </p>
    </Modal>
</div>
