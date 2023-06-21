import { ImgPosterBaseUrl } from "../api/Api";

export const Casts = ({ casts=[] }) => {

    const renderCasts = casts.map((c) => (
        <div
          key={c.id}
          className="rounded-2 shadow overflow-hidden bg-dark"
          style={{ minWidth: 160, height: "auto" }}
          role="button"
        >
          {c.profile_path && (
            <img
              src={ImgPosterBaseUrl + c.profile_path}
              alt={c.name}
              className="w-100"
            />
          )}
          {!c.profile_path && (
            <div
              className="d-flex justify-content-center align-items-center bg-secondary"
              style={{ height: 240 }}
            >
              <i
                className="bi bi-person-fill"
                style={{ fontSize: 62, color: "#a0a0a0" }}
              ></i>
            </div>
          )}
          <div className="p-2">
            <div className="fw-bold">{c.name}</div>
            <div className="fw-light">{c.character}</div>
          </div>
        </div>
      ));

    return (
        <>
            <div className="p-3 pb-0 fs-4">Casts</div>
            <div className="d-flex overflow-x-auto gap-3 p-3">{renderCasts}</div>
        </>
    )
}