/**
 * Compute map bounds based on a geojson point feature set
 * @param features Point features to compute the bounds of
 * @returns Map bounds
 */
export function getMapBounds(features) {
    const lats = features.map(feature => feature.geometry.coordinates[1])
    const lngs = features.map(feature => feature.geometry.coordinates[0])
    const latMin = Math.min(...lats)
    const latMax = Math.max(...lats)
    const lngMin = Math.min(...lngs)
    const lngMax = Math.max(...lngs)
    return [lngMin, latMin, lngMax, latMax]
}
/**
 * Compute map centre based on a geojson point feature set
 * @param features Geojson point features to compute the centre of
 * @returns Map centre
 */
export function getMapCentre(features) {
    const lats = features.map(feature => feature.geometry.coordinates[1])
    const lngs = features.map(feature => feature.geometry.coordinates[0])
    const latMin = Math.min(...lats)
    const latMax = Math.max(...lats)
    const lngMin = Math.min(...lngs)
    const lngMax = Math.max(...lngs)
    return { lng: (lngMin + lngMax) / 2, lat: (latMin + latMax) / 2 }
}

/**
 * Converts text to title case
 * @param str the text to convert
 * @returns txt in title case form
 */
export function toTitleCase(str) {
    return str.replace(/\w\S*/g, (txt) => {
        return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase()
    })
}

/**
 * Compute map centre based on a list of markers
 * @param markers Map markers to compute the centre of
 * @returns Map centre
 */
export function getMapCentreOld(markers) {
    const lats = markers.map(marker => marker.lngLat.lat)
    const lngs = markers.map(marker => marker.lngLat.lng)
    const latMin = Math.min(...lats)
    const latMax = Math.max(...lats)
    const lngMin = Math.min(...lngs)
    const lngMax = Math.max(...lngs)
    return { lng: (lngMin + lngMax) / 2, lat: (latMin + latMax) / 2 }
}

/**
 * Compute map bounds based on a list of markers
 * @param markers Map markers to compute the bounds of
 * @returns Map bounds
 */
export function getMapBoundsOld(markers) {
    const lats = markers.map(marker => marker.lngLat.lat)
    const lngs = markers.map(marker => marker.lngLat.lng)
    const latMin = Math.min(...lats)
    const latMax = Math.max(...lats)
    const lngMin = Math.min(...lngs)
    const lngMax = Math.max(...lngs)
    return [lngMin, latMin, lngMax, latMax]
}

/**
 * Compute the distance between two markers
 * @param coordA First set of coordinates in [lng, lat] format
 * @param coordB Second set of coordinates in the same format
 * @returns Distance between the two markers
 */
export function getDistance(coordA, coordB) {
    try {
        const R = 6371e3 // Earth's radius in metres
        const phi1 = coordA[1] * Math.PI / 180 // phi, lambda in radians
        const phi2 = coordB[1] * Math.PI / 180
        const dPhi = (coordB[1] - coordA[1]) * Math.PI / 180
        const dLambda = (coordB[0] - coordA[0]) * Math.PI / 180

        const a = Math.sin(dPhi / 2) * Math.sin(dPhi / 2)
            + Math.cos(phi1) * Math.cos(phi2)
            * Math.sin(dLambda / 2) * Math.sin(dLambda / 2)
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))

        const distance = R * c // in metres

        return distance
    } catch (err) {
        console.error(err)
        return 100
    }
}
