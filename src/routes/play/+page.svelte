<script>
    import { getMapBounds } from '$lib'
    import { error } from '@sveltejs/kit'
    import { onMount } from 'svelte'
    import Geolocation from 'svelte-geolocation'
    import {
        Control,
        ControlGroup,
        GeolocateControl,
        Layer,
        MapLibre
    } from 'svelte-maplibre'

    // Geolocation API related
    const options = {
        enableHighAccuracy: true,
        timeout: Infinity, // milliseconds
        maximumAge: 0, // milliseconds, 0 disables cached positions
    }

    const watchPosition = true
    let watchedPosition, dataSource, bounds

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
</script>

<div class="flex flex-col h-[100%] w-full">
    <Geolocation
        getPosition={watchPosition}
        options={options}
        watch={true}
        on:position={(e) => {
            watchedPosition = e.detail
        }}
    />

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
        />
    </MapLibre>
</div>
