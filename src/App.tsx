import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { PageLayout } from "./components/PageLayout";
import Home from "./pages/Home";
import CharacterPage from "./pages/CharacterPage";
import FilmPage from "./pages/FilmPage";
import Films from "./pages/Films";

function App() {
  return (
    <Routes>
      <Route path="/" element={<PageLayout />}>
        <Route index element={<Home />} />
      </Route>
      <Route path="/characters/:id" element={<PageLayout />}>
        <Route index element={<CharacterPage />} />
      </Route>
      <Route path="/films" element={<PageLayout />}>
        <Route index element={<Films />} />
        <Route path="/films/:id" element={<FilmPage />} />
      </Route>
      {/* <Route path="/about" element={<About />} />
      <Route path="/contact" element={<Contact />} /> */}
    </Routes>
  );
}

export default App;
