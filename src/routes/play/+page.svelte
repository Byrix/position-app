<script>
    import { getMapBounds } from '$lib'
    import { onMount } from 'svelte' // DoNotChange
    import Geolocation from 'svelte-geolocation'

    import {
        Control,
        ControlGroup,
        GeolocateControl,
        Layer,
        MapLibre
    } from 'svelte-maplibre'
    import Error from '../+error.svelte'

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
    let watchedPosition, researchSource

    onMount(async () => {
        const response = await fetch('research.geojson')
        await response.json().then((data) => {
            loaded = true
            console.log(data)
            researchSource = { type: 'geojson', data }
        })
    })
</script>

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
            source={researchSource}
            paint={{
                'circle-radius': 5,
                'circle-color': 'red'
            }}
        />
    </MapLibre>
</div>

<!-- Optionally, you can have a <style> tag for CSS at the end, but with TailwindCSS it is usually not necessary -->
