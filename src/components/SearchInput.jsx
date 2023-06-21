import { useDeferredValue } from "react"
import { useEffect } from "react"
import { useRef } from "react"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { searchKeywords, searchMovies } from "../api/Api"
import { MovieList } from "./MovieList"

export const SearchInput = () => {
    const navigate = useNavigate()
    const [query, setQuery] = useState("")
    const [keywords, setKeywords] = useState([])
    const [movies, setMovies] = useState([])
    const [loading, setLoading] = useState(false)
    const inputRef = useRef()

    const onClickCloseIcon = () => {
        navigate("/")
    }

    const deferredQuery = useDeferredValue(query)

    useEffect(() => {
        setLoading(true)
        searchKeywords({ query: deferredQuery })
            .then(data => {
                const { page, results, total_pages } = data;
                setKeywords(results)
                setLoading(false)
            })
            .catch(() => setLoading(false))
        searchMovies({ query: deferredQuery })
            .then(data => {
                const { results } = data
                setMovies(results)
                setLoading(false)
            })
            .catch(() => setLoading(false))
    }, [deferredQuery])

    useEffect(() => {
        inputRef.current.focus()
    }, [])

    const onClickKeyword = (keyword) => {
        navigate(`/?keyword=${keyword.id}`, { state: { keyword }})
    }

    const renderFoundKeywords = keywords.map(keyword => (
        <button key={keyword.id} className="btn btn-sm btn-secondary m-1 py-0" onClick={() => onClickKeyword(keyword)}>
            <small>{ keyword.name }</small>
        </button>
    ))

    return (
        <div className="d-flex flex-column gap-3 position-relative">
            <div className="position-relative search-input-container rounded-4 overflow-hidden position-sticky top-0 shadow">
                <div className="position-absolute start-0 top-0 bottom-0 d-flex justify-content-center align-items-center ps-2">
                    <i className="bi bi-search text-secondary"></i>
                </div>
                <input
                    type="text"
                    className="form-control text-light bg-transparent rounded-4 border-0 py-2"
                    placeholder="Title or keywords"
                    size={20}
                    onChange={e => setQuery(e.target.value)}
                    value={query}
                    ref={inputRef}
                />
                <div className="position-absolute end-0 top-0 bottom-0 d-flex justify-content-center align-items-center px-2">
                    <i onClick={onClickCloseIcon} className="bi bi-x text-danger fs-3" role="button"></i>
                </div>
            </div>
            { loading && <div className="text-secondary">Loading...</div>}
            { !loading && <div className="rounded-4 bg-dark">
                {keywords.length>0 && <div className="p-2">
                    <div className="text-secondary fw-light d-flex gap-3 ps-1"><i>Resulted keywords for query <u>{deferredQuery}</u></i></div>
                    { renderFoundKeywords }
                </div>}
                {movies.length>0 && <div className="p-2">
                    <div className="text-secondary fw-light ps-2"><i>Resulted movies for <u>{deferredQuery}</u></i></div>
                    <MovieList movies={movies} />
                </div>}
                {movies.length === 0 && keywords.length === 0 && deferredQuery.length>0 && (
                    <div className="text-secondary p-2">No data found!</div>
                )}
            </div>}
        </div>
    )
}