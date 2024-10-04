<!-- <script> tag includes JavaScript code -->
<script>
    import { onMount } from 'svelte'
    import Geolocation from 'svelte-geolocation'
    import {
        Control,
        ControlButton,
        ControlGroup,
        FillLayer,
        GeoJSON,
        GeolocateControl,
        hoverStateFilter,
        LineLayer,
        MapEvents,
        MapLibre,
        Marker,
        Popup
    } from 'svelte-maplibre' // DoNotChange

    /**
     * You can put functions you need for multiple components in a js file in
     * the lib folder, export them in lib/index.js and then import them like this
     */
    import { getMapBounds } from '$lib'

    /**
     * Declare variables
     * let decalres an immutable variable
     * const declares a constant
     *
     * Note the format of markers
     */

    const markers = [
        {
            lngLat: {
                lng: 144.98,
                lat: -37.805,
            },
            label: 'Marker 1',
            name: 'This is a marker'
        },
        {
            lngLat: {
                lng: 144.98,
                lat: -37.81,
            },
            label: 'Marker 2',
            name: 'This is a marker'
        },
        {
            lngLat: {
                lng: 144.96,
                lat: -37.81,
            },
            label: 'Marker 3',
            name: 'This is a marker'
        }
    ]

    // Extent of the map
    let bounds = getMapBounds(markers)

    // Geolocation API related
    const options = {
        enableHighAccuracy: true,
        timeout: Infinity, // milliseconds
        maximumAge: 0, // milliseconds, 0 disables cached positions
    }

    const watchPosition = true
    let watchedPosition, community, research

    /**
     * onMount is executed immediately after the component is mounted, it can be
     * used to load large datasets or to execute code required after the page
     * has been loaded
     *
     * async/await indicate an asynchronous function (i.e., program is paused
     * when a line marked with await starts and resumes when it is resolved)
     *
     * Asset files (e.g., data files, images) can be put in static folder
     *
     * Another way to load data files is to use a URL to the file hosted
     * on a remote server. Try this by replacing 'melbourne.geojson' with
     * 'https://raw.githubusercontent.com/codeforgermany/click_that_hood/main/public/data/melbourne.geojson'
     */
    onMount(async () => {
        const resp_comm = await fetch('community_geocoded.geojson')
        community = await resp_comm.json()
        const resp_research = await fetch('research_geocoded.geojson')
        research = await resp_research.json()
    })
</script>

<!-- Everything after <script> will be HTML for rendering -->

<!-- This section demonstrates how to get the current user location -->
<div class="flex flex-col h-[100%] w-full">
    <Geolocation
        getPosition={watchPosition}
        options={options}
        watch={true}
        on:position={(e) => {
            watchedPosition = e.detail
        }}
    />

    <!-- This section demonstrates how to make a web map using MapLibre -->
    <!-- More basemap options -->
    <!-- "https://basemaps.cartocdn.com/gl/positron-gl-style/style.json" -->
    <!-- "https://tiles.basemaps.cartocdn.com/gl/dark-matter-gl-style/style.json" -->
    <!-- "https://tiles.basemaps.cartocdn.com/gl/voyager-gl-style/style.json" -->
    <MapLibre
        class="map flex-grow min-h-[500px]"
        standardControls
        style="https://basemaps.cartocdn.com/gl/positron-gl-style/style.json"
        bind:bounds
        bind:center={watchedPosition}
        zoom={14}
        scrollZoom={false}
        dragPan={false}
    >
        <!-- Custom control buttons -->
        <Control class="flex flex-col gap-y-2">
            <!-- <ControlGroup>
                <ControlButton
                    on:click={() => {
                        bounds = getMapBounds(markers)
                    }}
                >
                    Fit
                </ControlButton>
            </ControlGroup> -->
            <ControlGroup>
                <GeolocateControl
                    trackUserLocation={true}
                    positionOptions={options}>
                </GeolocateControl>
            </ControlGroup>
        </Control>

        <GeoJSON
            id="geojsonData"
            data={research}
            promoteId="Address"
        >
            <FillLayer
                paint={{
                    'fill-color': hoverStateFilter('purple', 'yellow'),
                    'fill-opacity': 0.3,
                }}
                beforeLayerType="symbol"
                manageHoverState
            >
                <Popup
                    openOn="hover"
                    let:data
                >
                    {@const props = data?.properties}
                    {#if props}
                        <div class="flex flex-col gap-2">
                            <p>{props.name}</p>
                        </div>
                    {/if}
                </Popup>
            </FillLayer>
            <LineLayer
                layout={{ 'line-cap': 'round', 'line-join': 'round' }}
                paint={{ 'line-color': 'purple', 'line-width': 3 }}
                beforeLayerType="symbol"
            />
        </GeoJSON>

        <!-- Displaying markers, this is reactive -->
        <!-- For-each loop syntax -->
        <!-- markers is an object, lngLat, label, name are the fields in the object -->
        <!-- i is the index, () indicates the unique ID for each item, duplicate IDs will lead to errors -->
        {#each markers as { lngLat, label, name }, i (i)}
            <Marker
                {lngLat}
                class="grid h-8 w-14 place-items-center rounded-md border
                    border-gray-00 bg-red-200 text-black shadow-2xl
                    focus:outline-2 focus:outline-black"
            >
                <span>
                    {label}
                </span>

                <Popup
                    openOn="hover"
                    offset={[0, -10]}>
                    <div class="text-lg font-bold">{name}</div>
                </Popup>
            </Marker>
        {/each}
    </MapLibre>
</div>

<!-- Optionally, you can have a <style> tag for CSS at the end, but with TailwindCSS it is usually not necessary -->
