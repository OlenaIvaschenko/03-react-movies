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
import Loader from "../Loader/Loader";

export default function App() {
  const [films, setFilms] = useState([]);
  const [error, setError] = useState<boolean>(false);
  const [movie, setMovie] = useState<Movie | null>(null);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const[loader, setLoader] = useState<boolean>(false)

  const openModal = () => setIsModalOpen(true);

  const closeModal = () => {
    setIsModalOpen(false);
    setMovie(null);
  }

  const handleSelect = (movie: Movie) => {
    setMovie(movie);
    openModal();
    // console.log(movie);
    
  };

  const handleSearch = async (query: string) => {
    try {
    setLoader (true);

      const films = await fetchMovies(query);

      if (films.length === 0) {
        toast("No movies found for your request.");
        // return
      }

      setFilms(films);

      // console.log(films);

    } catch (error) {
      setError(!error);
      console.log(error);
    }
    finally {setLoader(false)}
  };


  return (
    <>
      <div>
        <Toaster />
      </div>
      <SearchBar onSubmit={handleSearch} />
      {loader&& <Loader/>}
      {error ? (
        <ErrorMessage />
      ) : (
        <MovieGrid onSelect={handleSelect} movies={films} />
      )}
      {isModalOpen && <MovieModal movie={movie} onClose={closeModal} />}
    </>
  );
}
