import './App.css'
import { useState, useEffect } from 'react'
import { getAccessToken } from './services/getAccessToken'
import { getArtistId } from './services/getArtistId'
import { Albums } from './components/Albums.jsx'
import { useAlbums } from './hooks/useAlbums'

function App() {

    const [searchInput, setSearchInput] = useState('')
    const [accessToken, setAccessToken] = useState('')
    const [artistId, setArtistId] = useState('')
    const fetchConfig = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + accessToken
        }
    }
    const {albums, getAlbums, loading} = useAlbums({ fetchConfig })

    useEffect(() => {
        (async () => {
            const updatedAccessToken = await getAccessToken();
            setAccessToken(updatedAccessToken);
        })();
    }, [])

    async function search() {
        const updatedId = await getArtistId(searchInput, fetchConfig)
        setArtistId(updatedId)
        getAlbums(searchInput, updatedId)
    }

    const handleSubmit = async (event) => {
        event.preventDefault()
        await search()
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
            {
                loading ? <p>Cargando...</p> : <Albums albums={albums} />
            }
            </main>

        </div>
    )
}

export default App
