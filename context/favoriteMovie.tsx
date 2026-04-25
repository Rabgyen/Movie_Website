"use client";

import { MovieType } from "@/types/types";
import { ReactNode, createContext, useContext, useEffect, useState } from "react";

type FavoriteMovieContextType = {
  addToFavorite: (movie: MovieType) => void;
  removeFromFavorite: (movieId: number) => void;
  favoriteMovie: MovieType[];
  isFavoriteMovie:(movieId:number) => boolean;
  removeAll:() => void;
};

const FavoriteMovieContext = createContext<FavoriteMovieContextType | null>(null);

type PropType = {
  children: ReactNode;
};

const FavoriteMovieProvider = ({ children }: PropType) => {
  const [favoriteMovie, setFavoriteMovie] = useState<MovieType[]>([]);
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    try {
      const storedFavs = localStorage.getItem("favoriteMovie");
      if (storedFavs) {
        setFavoriteMovie(JSON.parse(storedFavs));
      }
    } catch {
      setFavoriteMovie([]);
    } finally {
      setIsInitialized(true);
    }
  }, []);

  const addToFavorite = (movie: MovieType) => {
    setFavoriteMovie((prev) => {
      const exists = prev.some((favMovie) => favMovie.id === movie.id);
      if (exists) return prev;

      return [...prev, movie];
    });
  };

  const removeFromFavorite = (movieId: number) => {
    setFavoriteMovie((prev) => prev.filter((movie) => movie.id !== movieId));
  };

  useEffect(() => {
    if (!isInitialized) return;

    localStorage.setItem("favoriteMovie", JSON.stringify(favoriteMovie));
  }, [favoriteMovie, isInitialized]);

  const isFavoriteMovie = (movieId : number) => favoriteMovie.some((movie) => movie.id === movieId);

  const removeAll = () => {
    localStorage.removeItem("favoriteMovie");
    setFavoriteMovie([]);
  }

  return (
    <FavoriteMovieContext.Provider
      value={{ favoriteMovie, addToFavorite, removeFromFavorite, isFavoriteMovie, removeAll }}
    >
      {children}
    </FavoriteMovieContext.Provider>
  );
};

const useFavoriteMovie = () => {
  const context = useContext(FavoriteMovieContext);

  if (!context) {
    throw new Error("useFavoriteMovie must be used within FavoriteMovieProvider");
  }

  return context;
};

export { FavoriteMovieProvider, useFavoriteMovie };