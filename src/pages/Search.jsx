import { useState, useEffect } from "react"
import { useSearchParams } from "react-router-dom"
import MovieCard from '../components/MovieCard'

const searchURL = import.meta.env.VITE_SEARCH
const apiKey = import.meta.env.VITE_API_KEY

import '../css/MoviesGrid.css'

const Search = () => {
  const [searchParams] = useSearchParams()

  const [movies, setMovies] = useState([])
  const query = searchParams.get('q')

  useEffect(() => {
    const searchQueryUrl = `${searchURL}?${apiKey}&query=${query}`
    getSearchedMovies(searchQueryUrl)
  }, [query])

  const getSearchedMovies = async (url) => {
    const response = await fetch(url)
    const data = await response.json()

    setMovies(data.results)
  }

  return (
    <div className="container">
      <h2 className="title">Resultados para: <span className="query-text">{query}</span></h2>
      <div className="movies-container">
        {movies.length === 0 && <p>Carregando...</p>}
        {movies.length > 0 && movies.map((movie) => 
          <MovieCard key={movie.id} movie={movie}/>
        )}
      </div>
    </div>
  )
}

export default Search