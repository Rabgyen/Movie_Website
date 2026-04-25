"use client"

import { MovieType } from "@/types/types";
import { createContext, ReactNode, useContext, useEffect, useState } from "react";

type SavedMovieContextType = {
  savedMovies: MovieType[];
  addToSavedMovie: (movie: MovieType) => void;
  removFromSavedMovie: (movieId: number) => void;
  isSavedMovie: (movieId:number) => boolean;
  removeAll: () => void;
};

const SavedMovieContext = createContext<SavedMovieContextType | null>(null);

type SavedMoviePropType = {
  children: ReactNode;
};

const SavedMovieContextProvider = ({ children }: SavedMoviePropType) => {
  const [savedMovies, setSavedMovies] = useState<MovieType[]>([]);
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    try {
      const storedSavedMovies = localStorage.getItem("savedMovies");
      if (storedSavedMovies) {
        setSavedMovies(JSON.parse(storedSavedMovies));
      }
    } catch {
      setSavedMovies([]);
    } finally {
      setIsInitialized(true);
    }
  }, []);

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

  const removeAll = () => {
    localStorage.removeItem("savedMovies");
    setSavedMovies([]);
  }

  useEffect(() => {
    if (!isInitialized) return;

    localStorage.setItem("savedMovies", JSON.stringify(savedMovies));
  }, [savedMovies, isInitialized]);

  const isSavedMovie = (movieId: number) => savedMovies.some((movie) => movie.id === movieId);

  return (
    <SavedMovieContext.Provider
      value={{
        savedMovies,
        addToSavedMovie,
        removFromSavedMovie,
        isSavedMovie,
        removeAll,
      }}
    >
      {children}
    </SavedMovieContext.Provider>
  );
};

const useSavedMovies = () => {
    const context = useContext(SavedMovieContext);

    if(!context){
        throw new Error("useSavedMovies must be used within SavedMovieContext");
    }

    return context;
}

export {SavedMovieContextProvider,useSavedMovies};
