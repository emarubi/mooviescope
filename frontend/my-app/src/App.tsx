import './App.css';
import { Routes, Route } from 'react-router-dom';
import MovieList from './components/MoviesList';
import MovieDetails from './components/MovieDetails';
import HomePage from './components/HomePage';

function App() {

  return (
    <>
      <div className="App">
        <Routes>
          <Route path="/movie/:id" element={<MovieDetails />} />
          <Route path="/movies" element={<MovieList />} />
          <Route path="/" element={<HomePage />} />
        </Routes>
      </div>
    </>
  );
}

export default App;