<script>
    import { getCookie, getMapBounds } from '$lib'
    import { error } from '@sveltejs/kit'
    import { onMount } from 'svelte'
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

    // NSFW filtering
    let nsfw, nsfwFilter
    nsfw = getCookie('nsfw')
    nsfw = true // TODO debug only to remove
    if (!nsfw) { nsfwFilter = ['!=', ['get', 'Classification'], 'Beat'] }

    // Data loading
    let dataSource, bounds, dark
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

        dark = await (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches)
    })

    // Sidebar
    let feature
    let showSidebar = false
    function handleSymbolClick(event) {
        if (!showSidebar) { showSidebar = true }
        feature = event.detail.features[0]
        console.log(feature)
    }
</script>

<div class="flex flex-col h-[100%] w-full cursor-default">
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
        style={dark ? 'https://tiles.basemaps.cartocdn.com/gl/dark-matter-gl-style/style.json' : 'https://basemaps.cartocdn.com/gl/positron-gl-style/style.json'}
        bind:bounds
        bind:center={watchedPosition}
        zoom={14}
        dragPan={false}
    >
        <!-- Custom control buttons -->
        <Control class="flex flex-col gap-y-2">
            <ControlGroup>
                <GeolocateControl
                    trackUserLocation={true}
                    positionOptions={options}>
                </GeolocateControl>
            </ControlGroup>
        </Control>

        <!-- Data layer -->
        <Layer
            id="research"
            type="circle"
            source={dataSource}
            paint={{
                'circle-radius': 5,
                'circle-color': 'red'
            }}
            filter={nsfwFilter}
            on:click={handleSymbolClick}
        >
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
            </Popup>
        </Layer>
    </MapLibre>

    {#if showSidebar && feature}
        <div>
            <div>Header</div>
            <div>Body</div>
            <div>Activity</div>
            <div>Footer</div>
        </div>
    {/if}
</div>
