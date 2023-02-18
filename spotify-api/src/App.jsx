import reactLogo from './assets/react.svg'
import './App.css'
import { useState, useEffect  } from 'react'

const CLIENT_ID = '960e0d7780ea4aa3b5ad4ef0c0b3fad4'
const CLIENT_SECRET = 'cb93087cbf5b4fbea955c2dcc35cce43'
const TOKEN_URL = 'https://accounts.spotify.com/api/token'



function App() {
  const [searchInput, setSearchInput] = useState('')
  const [accessToken, setAccessToken] = useState('')
  const [albumsShowed, setAlbums] = useState([])

  useEffect(() => {
      //API Access Token
      var authParameters = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        body:'grant_type=client_credentials&client_id=' + CLIENT_ID + '&client_secret=' + CLIENT_SECRET
      }

      fetch(TOKEN_URL, authParameters)
        .then(res => res.json())
        .then(data => setAccessToken(data.access_token))
  }, [])

  //Search function
  async function search() {
    console.log('Search for ' + searchInput)

    // Get request using search to get the Artist ID
    var searchParameters = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + accessToken
      }
    }

    var artistID = await fetch('https://api.spotify.com/v1/search?q=' + searchInput + '&type=artist', searchParameters)
      .then(res => res.json())
      .then(data => {return data.artists.items[0].id})

      console.log('artist ID is ' + artistID);

      //Get request with artist ID grab all the albums from the artist

      var returnedAlbums = await fetch('https://api.spotify.com/v1/artists/' + artistID + '/albums' + '?include_group=album&market=US&limit=50', searchParameters)
      .then(res => res.json())
      .then(data => {
        console.log(data);
        setAlbums(data.items)
      })
  }

  return (
    <div className="App">
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
      {albumsShowed.map( (album, i) =>{

        console.log(album);
        return (
            <div className="album-card">
              <img src={album.images[0].url} alt="" />
                <p className="album-title">
                  {album.name}
                </p>
            </div>
        )
      })}
      </div>
    </div>
  )
}

export default App
