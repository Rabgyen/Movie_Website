"use client";

import { MovieType } from "@/types/types";
import { ReactNode, createContext, useContext, useEffect, useState } from "react";

type FavoriteMovieContextType = {
  addToFavorite: (movie: MovieType) => void;
  removeFromFavorite: (movieId: number) => void;
  favoriteMovie: MovieType[];
  isFavoriteMovie:(movieId:number) => boolean;
};

const FavoriteMovieContext = createContext<FavoriteMovieContextType | null>(null);

type PropType = {
  children: ReactNode;
};

const FavoriteMovieProvider = ({ children }: PropType) => {
  const [favoriteMovie, setFavoriteMovie] = useState<MovieType[]>(() => {
    if (typeof window === "undefined") return [];

    const storedFavs = localStorage.getItem("favoriteMovie");

    return storedFavs ? JSON.parse(storedFavs) : [];
  });

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
    localStorage.setItem("favoriteMovie", JSON.stringify(favoriteMovie));
  }, [favoriteMovie]);

  const isFavoriteMovie = (movieId : number) => favoriteMovie.some((movie) => movie.id === movieId);

  return (
    <FavoriteMovieContext.Provider
      value={{ favoriteMovie, addToFavorite, removeFromFavorite, isFavoriteMovie }}
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