import { Toaster } from "react-hot-toast";
import toast from "react-hot-toast";

import "./App.module.css";
import SearchBar from "../SearchBar/SearchBar";
import { fetchMovies } from "../services/movieService";
import { useState } from "react";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import type { Movie } from "../types/movie";
import MovieGrid from "../MovieGrid/MovieGrid";
import MovieModal from "../MovieModal/MovieModal";

export default function App() {
  const [films, setFilms] = useState([]);
  const [error, setError] = useState(false);
  const [movie, setMovie] = useState<Movie | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);

  const closeModal = () => setIsModalOpen(false);

  const handleSelect = (movie: Movie) => {
    setMovie(movie);
    openModal();
    console.log(movie);
    
  };

  const handleSearch = async (query: string) => {
    try {
      const films = await fetchMovies(query);

      if (films.length === 0) {
        toast("No movies found for your request.");
        // return
      }

      setFilms(films);

      console.log(films);
    } catch (error) {
      setError(!error);
      console.log(error);
    }
  };

  // const token: string = import.meta.env.VITE_TMDB_TOKEN;

  // if (token.length > 0) {
  //   console.log("Privet token");
  // }

  // // console.log(import.meta.env.VITE_TMDB_TOKEN);

  return (
    <>
      <div>
        <Toaster />
      </div>
      <SearchBar onSubmit={handleSearch} />
      {error ? (
        <ErrorMessage />
      ) : (
        <MovieGrid onSelect={handleSelect} movies={films} />
      )}
      {isModalOpen && <MovieModal movie={movie} onClose={closeModal} />}
    </>
  );
}
