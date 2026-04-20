"use client";

import MovieCard from "@/components/movieCard";
import { getGenres, getMovies, getPopularMovies } from "@/source/tmdb";
import { useState, useEffect } from "react";
import { GenreType, MovieType } from "@/types/types";
import { useMoviePage } from "@/context/moviesPageContext";
import ClientSideLoading from "./clientSideLoading";
import { FaArrowRight } from "react-icons/fa";
import MovieSlider from "@/components/movieSlider"
import NavBar from "@/components/navbar"

export default function Home() {
  const [movies, setMovies] = useState<MovieType[]>([]);
  const [genres, setGenres] = useState<GenreType[]>([]);
  const [popularMovies, setPopularMovies] = useState<MovieType[]>([]);
  const [loading, setLoading] = useState(false);
  const { page, setPage } = useMoviePage();
  const genreMap = Object.fromEntries(genres.map((genre) => [genre.id, genre.name])) as Record<number, string>;
 
  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      const [movieData, genreData] = await Promise.all([
        getMovies(page),
        getGenres(),
      ]);
      const safeMovieData = Array.isArray(movieData) ? movieData : [];

      setMovies((prev) => {
        const merged = [...prev, ...safeMovieData];
        const uniqueById = new Map<number, MovieType>();

        for (const movie of merged) {
          uniqueById.set(movie.id, movie);
        }

        return Array.from(uniqueById.values());
      });
      setGenres(Array.isArray(genreData) ? genreData : []);
      setLoading(false);
    };
    loadData();
  }, [page]);

  useEffect(() => {
    const loadPopularMovies = async () => {
      const popularMovieData = await getPopularMovies();
      setPopularMovies(Array.isArray(popularMovieData) ? popularMovieData : []);
    };
    loadPopularMovies();
  }, []);

  console.log(movies);
  console.log("genre")
  console.log(genres);
  console.log( popularMovies);
  return (
    <div className="relative flex w-full border-2 min-h-full flex-col items-center justify-start py-2 px-4 shadow-2xl  text-black dark:text-white">
      <NavBar />
      <MovieSlider movies={popularMovies}/>
      {loading && (
        <div className="pointer-events-none absolute inset-0 z-10 bg-white/45 dark:bg-black/35 backdrop-blur-[1px]">
          <ClientSideLoading />
        </div>
      )}
      <h1 className="w-full py-4 font-semibold text-2xl">Movies You May Like:</h1>
    <div className="grid grid-cols-[repeat(auto-fit,minmax(250px,1fr))] gap-4 p-2 w-full">
      {(movies ?? []).map((movie: MovieType) => (
        <MovieCard key={movie.id} movie={movie} genreMap={genreMap} />
      ))}
      <div className="group border-2 text-black border-white/40 dark:border-white/10 rounded-lg flex items-center justify-center hover:opacity-75 gap-2 min-h-100 dark:text-white bg-[#FDFAF6] dark:bg-[#070c1a] shadow-xl" onClick={() => setPage((prev) => prev + 1)}>
        See More <FaArrowRight className="transition-transform duration-300 group-hover:translate-x-1" />
      </div>
    </div>
    </div>
  );
} 
