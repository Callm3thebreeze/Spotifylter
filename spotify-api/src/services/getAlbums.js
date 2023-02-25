export function getAlbums(artistId, fetchConfig) {

    try{
        return fetch('https://api.spotify.com/v1/artists/' + artistId + '/albums' + '?include_group=album&market=US&limit=50', fetchConfig)
        .then(res => res.json())
        .then(data => 
            data.items
            
        )

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