import { useCallback, useRef, useState } from "react";
import { searchAlbums } from "../services/searchAlbums";

export function useAlbums({ fetchConfig }) {
    const [albums, setAlbums] = useState([])
    const [loading, setLoading] = useState(false)
    const previousSearch = useRef(null)
    

    const getAlbums = useCallback( async (search, id) => {
        if (search === previousSearch.current) return

        setLoading(true)
        previousSearch.current = search
        const newAlbums = await searchAlbums(id, fetchConfig)
        setAlbums(newAlbums)
        setLoading(false)
    }, [])
        
    return { albums, getAlbums, loading}
}