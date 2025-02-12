<script>
    import { base } from '$app/paths'
    import { getMapBounds } from '$lib'
    import ActivityOptions from '$lib/assets/ActivityOptions.svelte'
    import Fill from '$lib/assets/Fill.svelte'
    import FormElement from '$lib/assets/FormElement.svelte'
    import Close from '$lib/assets/icons/Close.svelte'
    import Report from '$lib/assets/icons/Report.svelte'
    import Modal from '$lib/assets/Modal.svelte'
    import { error } from '@sveltejs/kit'
    import { getContext, onMount } from 'svelte'
    import Geolocation from 'svelte-geolocation'
    import {
        Layer,
        MapEvents,
        MapLibre,
        Marker,
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
    const markerTypes = ['Sauna', 'Place of Queer Significance', 'Nightlife', 'Beat', 'Shopfront', 'Church', 'Crime', 'Community Group', 'Hospital', 'Gym', 'Identity', 'Relationships', 'Community']
    let markerEvent
    let mdlReport, mdlReportSuccess, mdlMarkers, mdlQuest
    let map

    // NSFW filtering
    let nsfw, nsfwFilter
    nsfw = getContext('nsfw')
    if (!nsfw) { nsfwFilter = ['all', ['!=', ['get', 'Classification'], 'Beat'], ['!=', ['get', 'Classification'], 'Sauna']] }

    // Data loading
    let dataSource, bounds, routeData, poetry
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

        fetch('melbourne_cbd_walking.geojson').then((response) => {
            return response.json()
        }).then((data) => {
            routeData = data
        }).catch((error) => {
            console.error('Error loading GeoJSON:', error)
            throw error(500, error)
        })

        fetch('poem.json').then((resp) => {
            return resp.json()
        }).then((data) => {
            poetry = data
        }).catch((err) => {
            console.error(err)
            throw error(500, err)
        })
    })

    // Sidebar
    let feature
    let showSidebar = false
    let symbolClick
    function handleSymbolClick(event) {
        symbolClick = true
        if (!showSidebar) { showSidebar = true }
        // mdlMarkers.hideModal()
        truncate = true
        feature = event.detail.features[0]
    }

    // Map symbology
    function loadMapSymbols() {
        const images = ['sauna', 'landmarks', 'nightlife', 'beat', 'shopfront', 'church', 'crime', 'community', 'hospital', 'gym', 'identity', 'relationships', 'default']
        images.forEach(async (image) => {
            try {
                const img = await map.loadImage(`${base}/icon/${image}.png`)
                map.addImage(image, img.data)
            } catch (err) {
                console.error(`loadMapSymbols() | Error loading image | ${image}`)
                console.error(err)
            }
        })
    }

    // Add a new marker
    let formRef, formSubmitter
    let mrkName, mrkType, mrkAdd, mrkDesc
    let markers = []
    function addMarker() {
        const newMarker = {
            properties: {
                Name: mrkName,
                Address: mrkAdd,
                Story: mrkDesc,
                Classification: mrkType,
                Source: 'User added'
            },
            geometry: {
                lngLat: markerEvent.detail.lngLat
            }
        }

        markers = [...markers, newMarker]
        mdlMarkers.hideModal()
    }

    // Walking tour routes
    let lineLayerVisible = false // To toggle visibility
    // Function to toggle the line layer visibility
    function toggleLineLayer() {
        lineLayerVisible = !lineLayerVisible // Toggle the flag
        if (lineLayerVisible) { mdlQuest.showModal() }
        console.debug(lineLayerVisible)
    }
</script>

<div class="flex flex-row h-[100%] w-full cursor-default z-10">
    <MapLibre
        class="map flex-grow min-h-[500px] cursor-default"
        standardControls
        style="https://basemaps.cartocdn.com/gl/positron-gl-style/style.json"
        bind:bounds
        center={[144.946457, -37.840935]}
        zoom={14}
        bind:map={map}
        on:load={loadMapSymbols}
    >
        <!-- Data layer -->
        <Layer
            id="research"
            type="symbol"
            source={dataSource}
            layout={{
                'icon-image': ['match', ['get', 'Classification'], 'Sauna', 'sauna', 'Place of Queer Significance', 'landmark', 'Nightlife', 'nightlife', 'Beat', 'beat', 'Shopfront', 'shopfront', 'Church', 'church', 'Crime', 'crime', 'Community Group', 'community', 'Hospital', 'hospital', 'Gym', 'gym', // NOTHING
                    'Identity', 'identity', 'Relationships', 'relationship', 'Community', 'community', 'default'],
                'icon-size': 0.3
            }}
            filter={nsfwFilter}
            on:touchstart={handleSymbolClick}
            on:click={handleSymbolClick}
            interactive={true}
        >
            <Popup
                openOn="hover"
                let:data
            >
                {@const props = data?.properties}
                {#if props}
                    <div class="flex flex-col gap-2">
                        <p class="text-bold">{props.Name}</p>
                        <p>{props.Classification}</p>
                    </div>
                {/if}
            </Popup>
        </Layer>

        <MapEvents
            on:touchstart={(e) => {
                markerEvent = e
                mdlMarkers.showModal()
            }}
            on:click={(e) => {
                markerEvent = e
                if (symbolClick) { symbolClick = false } else { mdlMarkers.showModal() }
            }}
        />

        {#if lineLayerVisible}
            <Layer
                id="walking-layer"
                type="line"
                source={{
                    type: 'geojson',
                    data: routeData
                }}
                layout={{
                    'line-cap': 'round',
                    'line-join': 'round',
                    'visibility': 'visible',
                }}
                paint={{
                    'line-color': '#b100e8', // Purple line color for visibility
                    'line-width': 3
                }}
            />
        {/if}

        {#each markers as marker, i (i)}
            {@const geo = marker.geometry}
            {@const prop = marker.properties}
            <Marker
                lngLat={geo.lngLat}
                class="grid h-3 w-3 place-items-center rounded-2xl bg-lavender"
            >
                <Popup
                    openOn="hover"
                    offset={[0, -10]}
                >
                    <div class="text-lg font-bold">{prop.Name}</div>
                    <div>{prop.Story}</div>
                    <div>Click for more!</div>
                </Popup>
            </Marker>
        {/each}
    </MapLibre>

    {#if watchedPosition}
        {@const geo = watchedPosition.coords}
        <div class="absolute left-[60px] top-[6vh] bg-mantle text-text rounded flex flex-col p-2">
            <p>Longitude: {geo.longitude}</p>
            <p>Latitude: {geo.latitude}</p>
            <p>Accuracy: {geo.accuracy}m</p>
            <p>Speed: {geo.speed}</p>
        </div>
    {/if}
    <button
        on:touchstart={toggleLineLayer}
        on:click={toggleLineLayer}
        class="absolute bottom-10 left-2.5 bg-lavender hover:bg-mauve text-base font-bold py-2 px-4 rounded"
    >
        Start QueerQuest
    </button>

    {#if showSidebar && feature}
        <div class="flex flex-col text-text bg-base fixed inset-0 w-full h-full z-50 sm:static sm:min-w-[20%] sm:max-w-[25%] sm:h-auto sm:bg-base sm:p-2 sm:overflow-auto sm:overflow-y-auto">
            <div class="w-full flex flex-row">
                <button
                    on:touchstart={() => showSidebar = false}
                    on:click={() => showSidebar = false}
                >
                    <Close />
                </button>
                <Fill />
                <button
                    on:touchstart={() => mdlReport.showModal()}
                    on:click={() => mdlReport.showModal()}
                >
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
                                on:touchstart={() => { truncate = false }}
                                on:click={() => { truncate = false }}
                                class="text-sky">Read more...</button>
                        {:else}
                            {feature.properties.Story}
                            <button
                                on:touchstart={() => { truncate = true }}
                                on:click={() => truncate = true}
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
                    bind:poetry
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
            on:touchstart={() => {
                mdlReportSuccess.showModal()
                mdlReport.hideModal()
            }}
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
    <Modal
        id="addPoint"
        header="Add a new point!"
        bind:this={mdlMarkers}
    >
        <form
            id="new-marker"
            class="form items-center"
            bind:this={formRef}
        >
            <FormElement label="Enter the name">
                <input
                    type="text"
                    placeholder="Name"
                    class="input w-full max-w-xs"
                    bind:value={mrkName}
                />
            </FormElement>
            <FormElement label="Select the marker type">
                <select
                    class="select select-bordered w-full max-w-xs"
                    bind:value={mrkType}
                >
                    <option
                        disabled
                        selected>Pick one</option>
                    {#each markerTypes as type}
                        <option>{type}</option>
                    {/each}
                </select>
            </FormElement>
            <FormElement label="Enter the address">
                <input
                    type="text"
                    placeholder="Address"
                    class="input w-full max-w-xs"
                    bind:value={mrkAdd}
                />
            </FormElement>
            <FormElement label="What is the significance">
                <textarea
                    class="textarea textarea-bordered w-full max-w-xs"
                    placeholder="Description..."
                    bind:value={mrkDesc}
                />
            </FormElement>
            <button
                type="submit"
                class="btn bg-green text-base"
                bind:this={formSubmitter}
                on:touchstart={addMarker}
                on:click={addMarker}
            >
                Submit!
            </button>
        </form>
    </Modal>
    <Modal
        id="questStart"
        header="QueerQuest Unlocked!"
        bind:this={mdlQuest}
    >
        <p>Congratulations! You've started a QueerQuest. Make your way to the purple journey path and visit all of the locations to complete this quest. <br>Note: We create these quests using geospatial network analysis operations to find you the most efficient routes! </p>
    </Modal>
</div>
<div class="-z-50 hidden pointer-events-none">
    <Geolocation
        getPosition={watchPosition}
        options={options}
        watch={true}
        on:position={(e) => {
            watchedPosition = e.detail
        }}
    />
</div>
