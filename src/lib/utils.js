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
 * Gets the value of a cookie
 * @param name the name of the cookie to get the value of
 * @returns the value of cookie
 */
export function getCookie(name) {
    const nameEQ = `${name}=`
    const cookies = document.cookie.split(';')
    for (let i = 0; i < cookies.length; i++) {
        let c = cookies[i]
        while (c.charAt(0) === ' ') { c = c.substring(1, c.length) }
        if (c.indexOf(nameEQ) === 0) { return c.substring(nameEQ.length, c.length) }
    }
    return null
}
/**
 * Sets the value of a cookie
 * @param name the name of the cookie to update
 * @param value the new value
 * @param expiry the number of days until it expires
 */
export function setCookie(name, value, expiry) {
    let expires = ''
    if (expiry) {
        const date = new Date()
        date.setTime(date.getTime() + (expiry * 24 * 60 * 60 * 1000))
        expires = `; expires=${date.toUTCString()}`
    }
    document.cookie = `${name}=${value || ''}${expires}; path=/`
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
