export async function searchAlbums(artistId, fetchConfig) {
    if (artistId === '') return null

    try{
        const response = await fetch('https://api.spotify.com/v1/artists/' + artistId + '/albums' + '?include_group=album&market=US&limit=50', fetchConfig)
        const json = await response.json()
        const albums = json.items
        return albums

        //Ejemplo de mapeo del objeto obtenido
        // const mappedAlbums = albums?.map(album => ({
        //     x: album.id,
        //     y: album.name,
        //     j: album.images,
        // }))
        // return {albums: mappedAlbums}
    } catch (e) {
        throw new Error('Error searching albums')
    }
}

