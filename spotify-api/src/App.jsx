import './App.css'
import { useState, useEffect  } from 'react'
import { getAccessToken } from './services/getAccessToken'
import { getArtistId } from './services/getArtistId'
import { getAlbums } from './services/getAlbums'

function App() {
  const [searchInput, setSearchInput] = useState('')
  const [accessToken, setAccessToken] = useState('')
  const [albumsShowed, setAlbums] = useState([])
  const fetchConfig = {
    method: 'GET',
    headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + accessToken
    }
  }

  useEffect(() => {
      (async () => {
        const updatedAccessToken = await getAccessToken();
        setAccessToken(updatedAccessToken);
      })();
  }, [])

  async function search() {
    const updatedArtistID = await getArtistId(searchInput, fetchConfig)
    const returnedAlbums = await getAlbums(updatedArtistID, fetchConfig)
    setAlbums(returnedAlbums)
  }

  return (
    <div className="App">
      <h1 className='main-title'>Spotyfilter</h1>
      <label className='search-input'>
        Busca aquí:
        <input 
          value={searchInput} 
          onChange={e => setSearchInput(e.target.value)} 
          onKeyDown={ e => {
            if(e.key=='Enter') {
              search();
            }
          }}
          />
          <button onClick={() => { search()}}>
            Buscar
          </button>
      </label>
      <div className="albums-container">
      {albumsShowed.length > 0 && albumsShowed.map( (album, i) =>{

        return (
            <div className="album-card" key={album.id}>
              <img className="album-image" src={album.images[0].url} alt="" />
                <p className="album-title">
                  {album.name}
                </p>
            </div>
        )
      })}
      {albumsShowed.length === 0 && <h1>No hay resultados para esta búsqueda</h1>}
      </div>
    </div>
  )
}

export default App
