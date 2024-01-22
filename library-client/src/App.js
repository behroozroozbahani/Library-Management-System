import "./assets/css/App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import Author from "./components/Author/Author";
import Book from "./components/Book/Book";
import Genre from "./components/Genre/Genre";
import Publisher from "./components/Publisher/Publisher";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" index element={<Home />} />
        <Route path="/author" element={<Author />} />
        <Route path="/book" element={<Book />} />
        <Route path="/genre" element={<Genre />} />
        <Route path="/publisher" element={<Publisher />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;