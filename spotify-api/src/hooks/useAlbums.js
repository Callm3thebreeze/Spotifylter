import { useState } from "react";
import { searchAlbums } from "../services/searchAlbums";

export function useAlbums({search, id, fetchConfig}) {
    const [albums, setAlbums] = useState([])

    const getAlbums = async () => {
        console.log({search, id, fetchConfig})
        const newAlbums = await searchAlbums(id, fetchConfig)
        setAlbums(newAlbums)
    }
        
    return { albums, getAlbums }
}