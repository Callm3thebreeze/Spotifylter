import { useEffect, useRef, useState } from "react"


export function useSearch() {
    const [searchInput, setSearchInput] = useState('')
    const [error, setError] = useState(null)
    const isFirstInput = useRef(true)

    useEffect(() => {
        if (isFirstInput.current) {
            isFirstInput.current = searchInput === ''
            return
        }

        if (searchInput === '') {
            setError('Escriba el artista que desea buscar')
            return
        }

        setError(null)
    }, [searchInput])

    return { searchInput, setSearchInput, isFirstInput, error }
}