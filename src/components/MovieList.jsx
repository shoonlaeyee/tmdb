import { useNavigate } from "react-router-dom";
import { ImgPosterBaseUrl } from "../api/Api";
import dayjs from "dayjs";

export const MovieList = ({ movies = [], className="" }) => {
  const navigate = useNavigate();

  const onClickMovie = (movie) => {
    navigate(`/${movie.id}`);
  };

  const renderMovies = movies.map((m) => {
    return (
      <div
        key={m.id}
        className="grid-item shadow-sm rounded-2 position-relative"
        role="button"
        onClick={() => onClickMovie(m)}
      >
        <img
          src={ImgPosterBaseUrl + m.poster_path}
          alt={m.title}
          className="w-100 rounded-2"
        />
        <div className="grid-item-detail position-absolute">
          <div className="title text-center fw-bold mb-1 px-1 py-2">
            {m.title}
            <small className="fw-lighter ps-1">
              ({dayjs(m.release_date).format("YYYY")})
            </small>
          </div>
          <div className="desc fw-light p-2 pt-0">
            <small>
              {m.overview.substr(0, 100)}
              {m.overview.length > 100 && "..."}
            </small>
          </div>
        </div>
        <div className="position-absolute start-0 top-0 p-1">
          <div className="px-1 bg-indigo rounded-1 d-flex gap-1 shadow">
            <i className="bi bi-star" style={{ fontSize: 12 }}></i>
            <span className="fw-light" style={{ fontSize: 12 }}>
              {m.vote_average}
            </span>
          </div>
        </div>
      </div>
    );
  });

  return <div className={`grid-container p-2 p-lg-3 ${className}`}>{renderMovies}</div>;
};

export const MovieListLoading = ({ size = 5 }) => {
  const renderItems = Array(size)
    .fill(0)
    .map((v, i) => (
      <div
        key={i}
        className="grid-item placeholder-glow d-flex gap-2 bg-transparent"
        style={{ height: 150 }}
      >
        <div className="placeholder bg-secondary w-100"></div>
      </div>
    ));
  return <div className="grid-container p-3">{renderItems}</div>;
};
