function ListOfAlbums({ albums }) {
  console.log(albums)
  return (
    <div className="albums-container">
      { 
        albums.map( album  => (
          <div className="album-card" key={album.id}>
            <img className="album-image" src={album.images[0].url} alt={album.name} />
              <p className="album-title">
                {album.name}
              </p>
          </div>
        ))
      }
    </div>
  )
}
  
function NoAlbumsResults () {
  return (
    <h1>No hay resultados para esta búsqueda</h1>
  )
}

export function Albums ({ albums }) {
  const hasAlbums = albums?.length > 0
  
  return (
    hasAlbums
      ? <ListOfAlbums albums={albums} />
      : <NoAlbumsResults />
  )
}