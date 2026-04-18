"use client";

import MovieCard from "@/components/movieCard";
import { getGenres, getMovies } from "@/source/tmdb";
import { useState, useEffect } from "react";
import { GenreType, MovieType } from "@/types/types";
import Button from "@/components/button";

export default function Home() {
  const [movies, setMovies] = useState<MovieType[]>([]);
  const [genres, setGenres] = useState<GenreType[]>([]);

  useEffect(() => {
    const loadData = async () => {
      const [movieData, genreData] = await Promise.all([
        getMovies(),
        getGenres(),
      ]);
      setMovies(Array.isArray(movieData) ? movieData : []);
      setGenres(Array.isArray(genreData) ? genreData : []);
    };
    loadData();
  }, []);

  console.log(movies)
  console.log(genres)
  return (
    <>
    <div className="grid grid-cols-[repeat(auto-fit,minmax(250px,1fr))] gap-4 p-2">
      {(movies ?? []).map((movie: MovieType) => (
        <MovieCard key={movie.id} movie={movie} />
      ))}
    </div>
    <Button />
    </>
  );
}
