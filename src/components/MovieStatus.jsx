
export const MovieStatus = ({ movie, keywords, className="" }) => {
    const renderKeywords = keywords.map((k) => (
        <div key={k.id} className="bg-secondary text-dark rounded-1 px-1">
          <small>{k.name}</small>
        </div>
      ));

    return (
        <div
          className={`p-3 d-flex flex-column gap-3 ${className}`}
          style={{ background: "#24242455" }}
        >
          <div className="py-0 lh-sm">
            <a
              href={movie.homepage}
              alt={movie.homepage}
              title={movie.homepage}
            >
              <i className="bi bi-link fs-1"></i>
            </a>
          </div>
          <div className="d-flex flex-column lh-sm">
            <div className="fw-bold">Status</div>
            <div className="fw-light">{movie.status}</div>
          </div>
          <div className="d-flex flex-column lh-sm">
            <div className="fw-bold">Original Language</div>
            <div className="fw-light">
              {movie.spoken_languages.find(
                (l) => l.iso_639_1 === movie.original_language
              )?.name || movie.original_language}
            </div>
          </div>
          <div className="d-flex flex-column lh-sm">
            <div className="fw-bold">Budget</div>
            <div className="fw-light">
              ${movie.budget.toLocaleString() || 0}
            </div>
          </div>
          <div className="d-flex flex-column lh-sm">
            <div className="fw-bold">Revenue</div>
            <div className="fw-light">
              ${movie.revenue.toLocaleString() || 0}
            </div>
          </div>
          <div className="pb-3">
            <div className="fs-5 fw-bold">Keywords</div>
            <div className="d-flex gap-2 flex-wrap pt-2">{renderKeywords}</div>
          </div>
        </div>
    )
}