import { useInViewport } from "ahooks";
import { useRef } from "react";
import { useEffect, useState } from "react";
import { useLocation, useSearchParams } from "react-router-dom";
import { fetchMovieList } from "../api/Api";
import { GenreDropdown } from "../components/GenreDropdown";
import { MovieList, MovieListLoading } from "../components/MovieList";

export const Home = () => {
  const [loading, setLoading] = useState(true);
  const [movies, setMovies] = useState([]);
  const [nextPage, setNextPage] = useState(1);

  const loadMoreRef = useRef();

  const [isLoadMoreInViewport] = useInViewport(loadMoreRef);

  const [searchParams] = useSearchParams();
  const location = useLocation();

  const selectedGenre = searchParams.get("genre");
  const selectedKeyword = searchParams.get("keyword");

  // load on initial and changed genre, keyword
  useEffect(() => {
    setMovies([]);
    setLoading(true);
    fetchMovieList({
      page: nextPage,
      keyword: selectedKeyword,
      genre: selectedGenre !== "all" ? selectedGenre : null,
    })
      .then((data) => {
        const { page, results, total_pages } = data;
        setMovies(results);
        setLoading(false);
        if (page < total_pages) setNextPage((s) => s + 1);
        else setNextPage(null);
      })
      .catch(() => setLoading(false));

    return () => {
      setMovies([]);
      setNextPage(1);
    };
  }, [selectedGenre, selectedKeyword]);

  // load for infinite scroll
  useEffect(() => {
    if (nextPage === null) return;
    if (loading) return;
    if (!isLoadMoreInViewport) return;
    if (isLoadMoreInViewport && movies.length === 0) return;

    setLoading(true);
    fetchMovieList({
      page: nextPage,
      keyword: selectedKeyword,
      genre: selectedGenre !== "all" ? selectedGenre : null,
    })
      .then((data) => {
        const { page, results, total_pages } = data;
        setMovies((s) => [...s, ...results]);
        setLoading(false);
        if (page < total_pages) setNextPage((s) => s + 1);
      })
      .catch(() => setLoading(false));
  }, [isLoadMoreInViewport]);

  const selectedKeywordObj = location.state?.keyword;

  return (
    <div className="">
      <div className="d-flex gap-3 px-3 align-items-center fw-light">
        <div className="fs-4">Movies</div>
        <GenreDropdown />
        {!!selectedKeyword && !!selectedKeywordObj && (
          <div className="rounded-2 bg-dark px-2 d-flex justify-content-center align-items-center">
            <small className="text-secondary me-2">keyword:</small>
            <small>{selectedKeywordObj.name}</small>
            <i
              onClick={() => (window.location.href = "/")}
              className="bi bi-x text-danger fs-5 ms-1"
              role="button"
            ></i>
          </div>
        )}
      </div>
      <MovieList movies={movies} />
      {movies.length > 0 && (
        <div ref={loadMoreRef} className="text-secondary p-1">
          <small>Load more</small>
        </div>
      )}
      {loading && <MovieListLoading size={9} />}
    </div>
  );
};
