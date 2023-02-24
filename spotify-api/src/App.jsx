import './App.css'
import { useState, useEffect } from 'react'
import { getAccessToken } from './services/getAccessToken'
import { getArtistId } from './services/getArtistId'
import { getAlbums } from './services/getAlbums'
import { Albums } from './components/Albums.jsx'

function App() {
    const [searchInput, setSearchInput] = useState('')
    const [accessToken, setAccessToken] = useState('')
    const [albums, setAlbums] = useState([])
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
        console.log(albums)
    }


    return (
        <div className="App">

            <header>
                <h1 className='main-title'>Spotyfilter</h1>
                <label className='search-input'>
                    Busca aquí:
                    <input
                        value={searchInput}
                        onChange={e => setSearchInput(e.target.value)}
                        onKeyDown={e => {
                            if (e.key == 'Enter') {
                                search();
                            }
                        }}
                    />
                    <button type="submit" onClick={() => { search() }}>
                        Buscar
                    </button>
                </label>
            </header>

            <main>
                <Albums albums={albums} />
            </main>

        </div>
    )
}

export default App
