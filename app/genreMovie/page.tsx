"use client"

import MovieCard from "@/components/movieCard";
import NavBar from "@/components/navbar";
import { getGenreMovies } from "@/source/tmdb";
import { MovieType } from "@/types/types";
import { useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";
import { FaArrowRight } from "react-icons/fa6";
import ClientSideLoading from "../clientSideLoading";

export default function GenreMovie() {
  const genreParams = useSearchParams();
  const query = genreParams.get("query");
  const genreId = genreParams.get("id");
  const [loading, setLoading] = useState(false);

  const [genreMovies, setGenreMovies] = useState<MovieType[]>([]);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const fetchGenreMovies = async() => {
        setLoading(true);
        const movieGenre = await getGenreMovies(genreId);
        setGenreMovies(movieGenre);
        setLoading(false);
    }
    fetchGenreMovies();
  }, [query, genreId]);

  if (!mounted) return null;

  return <div>
    <NavBar />

  {loading && (
          <div className="pointer-events-none absolute inset-0 z-10 bg-white/45 dark:bg-black/35 backdrop-blur-[1px]">
            <ClientSideLoading />
          </div>
        )}

    <div className="grid grid-cols-[repeat(auto-fit,minmax(250px,1fr))] gap-4 p-2 w-full">
          {(genreMovies ?? []).map((movie: MovieType) => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
          <div className="group border-2 text-black border-white/40 dark:border-white/10 rounded-lg flex items-center justify-center hover:opacity-75 gap-2 min-h-100 dark:text-white bg-[#FDFAF6] dark:bg-[#070c1a] shadow-xl">
            See More <FaArrowRight className="transition-transform duration-300 group-hover:translate-x-1" />
          </div>
        </div>
  </div>;
}
