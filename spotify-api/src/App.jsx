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
    }

    const handleSubmit = (event) => {
        event.preventDefault()
        search()
    }


    return (
        <div className="App">

            <header>
                <h1 className='main-title'>Spotyfilter</h1>
                <form className='search-form' onSubmit={handleSubmit}>
                    <label className=''>
                        Busca aquí:
                    </label>
                    <input
                        value={searchInput}
                        onChange={e => setSearchInput(e.target.value)}
                    />
                    <button type="submit">
                        Buscar
                    </button>
                </form>
                
                
            </header>

            <main>
                <Albums albums={albums} />
            </main>

        </div>
    )
}

export default App
