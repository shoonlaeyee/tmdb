import { useLocation, useNavigate } from "react-router-dom";

export const Nav = () => {
  const navigate = useNavigate();

  const onClickIcon = () => {
    navigate("/");
  };

  const onClickSearchIcon = () => {
    navigate("/search")
  }

  const location = useLocation()

  return (
    <div className="py-2 px-3 d-flex justify-content-between align-items-center">
      <div
        className="d-flex align-items-center gap-3"
        role="button"
        onClick={onClickIcon}
      >
        <div className="fs-2 fw-bold logo-text">TMDB</div>
      </div>
      {location.pathname === "/" && <i onClick={onClickSearchIcon} className="bi bi-search text-secondary fs-4 px-3" role="button"></i>}
    </div>
  );
};
