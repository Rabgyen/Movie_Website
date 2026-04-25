import { MovieType } from "@/types/types";
import { createContext, ReactNode, useContext, useEffect, useState } from "react";

type SavedMovieContextType = {
  savedMovies: MovieType[];
  addToSavedMovie: (movie: MovieType) => void;
  removFromSavedMovie: (movieId: number) => void;
  isSavedMovie: (movieId:number) => boolean;
};

const SavedMovieContext = createContext<SavedMovieContextType | null>(null);

type SavedMoviePropType = {
  children: ReactNode;
};

const SavedMovieContextProvider = ({ children }: SavedMoviePropType) => {
  const [savedMovies, setSavedMovies] = useState<MovieType[]>(() => {
    const storedSavedMovies = localStorage.getItem("savedMovies");

    return storedSavedMovies ? JSON.parse(storedSavedMovies) : [];
  });

  const addToSavedMovie = (movie: MovieType) => {
    setSavedMovies((prev) => {
      const exists = prev.some((favMovie) => favMovie.id === movie.id);

      if (exists) return prev;

      return [...prev, movie];
    });
  };

  const removFromSavedMovie = (movieId: number) => {
    setSavedMovies((prev) => prev.filter((movie) => movie.id !== movieId));
  };

  useEffect(() => {
    localStorage.setItem("savedMovies", JSON.stringify(savedMovies));
  }, [savedMovies]);

  const isSavedMovie = (movieId: number) => savedMovies.some((movie) => movie.id === movieId);

  return (
    <SavedMovieContext
      value={{
        savedMovies,
        addToSavedMovie,
        removFromSavedMovie,
        isSavedMovie,
      }}
    >
      {children}
    </SavedMovieContext>
  );
};

const useSavedMovies = () => {
    const context = useContext(SavedMovieContext);

    if(!context){
        throw new Error("useSavedMovies must be used within SavedMovieContext");
    }

    return context;
}
