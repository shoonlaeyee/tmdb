import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Nav } from "./components/Nav";
import { Home } from "./pages/Home";
import { MovieDetail } from "./pages/MovieDetail";
import { Search } from "./pages/Search";

function App() {
  return (
    <BrowserRouter>
      <Nav />
      <Routes>
        <Route path="/" Component={Home} />
        <Route path="/search" Component={Search} />
        <Route path="/:movieId" Component={MovieDetail} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
