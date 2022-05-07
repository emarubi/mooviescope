import './App.css';
import { Routes, Route } from 'react-router-dom';
import MovieList from './components/MoviesList';
import MovieDetails from './components/MovieDetails';
import HomePage from './components/HomePage';
import { BrowserRouter } from "react-router-dom";

function App() {

  return (
    <>
      <div className="App">
        <BrowserRouter>
          <Routes>
            <Route path="/movie/:id" element={<MovieDetails />} />
            <Route path="/movies" element={<MovieList />} />
            <Route path="/" element={<HomePage />} />
          </Routes>
        </BrowserRouter>
      </div>
    </>
  );
}

export default App;