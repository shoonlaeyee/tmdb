import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { fetchGenres } from "../api/Api";

export const GenreDropdown = () => {
  const [genres, setGenres] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams()

  useEffect(() => {
    fetchGenres().then(({ genres }) => {
      setGenres([{ id: "all", name: "All Genres" }, ...genres]);
    });
  }, []);

  const onSelectGenre = (genre) => {
    window.location.href = `/?genre=${genre.id}`
  }

  const selectedSearchParam = searchParams.get("genre")
  const selectedGenre = genres.find(g => selectedSearchParam && g.id == selectedSearchParam)

  const renderItems = genres.map((g) => (
    <li key={g.id}>
      <button type="button" className="dropdown-item fw-light" onClick={() => onSelectGenre(g)}>
        <small>{g.name}</small>
      </button>
    </li>
  ));

  return (
    <div className="dropdown">
      <button
        className="btn btn-sm btn-outline-secondary dropdown-toggle py-0"
        type="button"
        data-bs-toggle="dropdown"
        aria-expanded="false"
      >
        {selectedGenre ? selectedGenre.name : "All Genres"}
      </button>
      <ul className="dropdown-menu dropdown-menu-dark grid-twocolumns-container p-1">{renderItems}</ul>
    </div>
  );
};
