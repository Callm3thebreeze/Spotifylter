export async function getAlbums(artistId, fetchConfig) {

    return fetch('https://api.spotify.com/v1/artists/' + artistId + '/albums' + '?include_group=album&market=US&limit=50', fetchConfig)
        .then(res => res.json())
        .then(data => data.items)
}