import './App.css'
import { useState, useEffect} from 'react'
import { getAccessToken } from './services/getAccessToken'
import { getArtistId } from './services/getArtistId'
import { Albums } from './components/Albums.jsx'
import { useAlbums } from './hooks/useAlbums'
import { useSearch } from './hooks/useSearch'

function App() {

    const { searchInput, setSearchInput, isFirstInput, error } = useSearch()
    const [ accessToken, setAccessToken ] = useState('')
    const fetchConfig = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + accessToken
        }
    }
    const { albums, getAlbums, loading } = useAlbums({ fetchConfig })
    
    useEffect(() => {
        (async () => {
            const updatedAccessToken = await getAccessToken();
            setAccessToken(updatedAccessToken);
        })();
    }, [])

    async function search() {
        const artistId = await getArtistId(searchInput, fetchConfig)
        getAlbums(searchInput, artistId)
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
                {error && <p style={{ color: 'orange' }}>{error}</p>}
            </header>

            {
                isFirstInput.current ? 
                <main> <h1>Hora de buscar musicote</h1> </main> 
                : <main> { loading ? <h1>Cargando...</h1> : <Albums albums={albums} /> } </main>
            }           

        </div>
    )
}

export default App
