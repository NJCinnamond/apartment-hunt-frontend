interface GeocodingResult {
    lat: number;
    lng: number;
}

export async function geocodeAddress(address: string): Promise<GeocodingResult | null> {
    const MAPBOX_ACCESS_TOKEN = 'pk.eyJ1IjoibmpjaW5uYW1vbmQiLCJhIjoiY204cDk5NWtsMDh2cTJscHpzcGVxZHVnNiJ9.q71yKOo7G87RMu1g3VUIhA';
    const encodedAddress = encodeURIComponent(address + ', New York, NY');
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodedAddress}.json?access_token=${MAPBOX_ACCESS_TOKEN}&limit=1`;

    try {
        const response = await fetch(url);
        const data = await response.json();

        if (data.features && data.features.length > 0) {
            const [lng, lat] = data.features[0].center;
            return { lat, lng };
        }
        return null;
    } catch (error) {
        console.error('Geocoding error:', error);
        return null;
    }
} 