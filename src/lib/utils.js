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
