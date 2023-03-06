export async function getArtistId(searchInput, fetchConfig) {
    console.log('Search for ' + searchInput)
    try {
        const response = await fetch('https://api.spotify.com/v1/search?q=' + searchInput + '&type=artist', fetchConfig)
        const json = await response.json()
        const id = json.artists.items[0].id
        return id


    } catch (e) {
        throw new Error('Error searching id')
    }
}