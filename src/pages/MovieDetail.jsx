import { useEffect, useState } from "react";
import {
  fetchMovieCredits,
  fetchMovieDetail,
  fetchMovieKeywords,
  fetchSimilarMovies,
} from "../api/Api";
import { useParams } from "react-router-dom";
import { MovieList, MovieListLoading } from "../components/MovieList";
import { ImgPosterBaseUrl, ImgBackdropBaseUrl } from "../api/Api";
import { Casts } from "../components/Casts";
import { MovieOverview } from "../components/MovieOverview";
import { MovieStatus } from "../components/MovieStatus";

export const MovieDetail = () => {
  const [loading, setLoading] = useState(true);
  const [movie, setMovie] = useState(null);
  const [casts, setCasts] = useState([]);
  const [crews, setCrews] = useState([]);
  const [keywords, setKeywords] = useState([]);
  const [similarMovies, setSimilarMovies] = useState([]);

  const { movieId } = useParams();

  useEffect(() => {
    fetchMovieDetail({ movieId }).then((data) => {
      setMovie(data);
      setLoading(false);
    });
    fetchMovieCredits({ movieId }).then(({ crew, cast }) => {
      setCasts(cast);
      setCrews(crew);
    });
    fetchMovieKeywords({ movieId }).then(({ keywords }) => {
      setKeywords(keywords);
    });
    fetchSimilarMovies({ movieId }).then(({ results }) => {
      setSimilarMovies(results.filter((v, i) => i < 10));
    });
  }, [movieId]);

  if (loading)
    return (
      <div className="p-3">
        <MovieListLoading size={5} />
      </div>
    );

  return (
    <div className="">
      <div className="position-relative">
        <img
          src={ImgBackdropBaseUrl + movie.backdrop_path}
          alt={movie.title}
          className="w-100"
        />
        <div className="position-absolute start-0 end-0 top-0 bottom-0  p-2 p-lg-3 shadow-lg detail-backdrop">
          <div className="d-flex m-0 p-0 row">
            <div className="col-12 col-lg-3">
              <img
                src={ImgPosterBaseUrl + movie.poster_path}
                alt={movie.title}
                className="rounded-2 col-3 col-lg-12 h-auto"
              />
            </div>
            <MovieOverview movie={movie} crews={crews} className="d-none d-lg-block px-4" />
          </div>
        </div>
      </div>
      <MovieOverview movie={movie} crews={crews} className="d-block d-lg-none px-3 detail-backdrop" />
      <div className="row p-0 m-0">
        <div className="col-12 col-lg-9 p-0 p-lg-2">
          <Casts casts={casts} />
          <MovieStatus movie={movie} keywords={keywords} className="d-flex d-lg-none" />
          <div className="p-3 pb-0 fs-4">Similar Movies</div>
          <MovieList movies={similarMovies} />
        </div>
        <MovieStatus movie={movie} keywords={keywords} className="d-none d-lg-flex col-3" />
      </div>

      {/* <pre>{JSON.stringify(similarMovies, null, 2)}</pre> */}
    </div>
  );
};
