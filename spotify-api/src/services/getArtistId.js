export async function getArtistId(searchInput, fetchConfig) {
    console.log('Search for ' + searchInput)
    return fetch('https://api.spotify.com/v1/search?q=' + searchInput + '&type=artist', fetchConfig)
        .then(res => res.json())
        .then(data => data.artists.items[0].id )
}