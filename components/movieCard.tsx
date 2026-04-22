"use client";

import { FaStar } from "react-icons/fa";
import { MdHowToVote, MdMovieCreation } from "react-icons/md";
import { MovieType } from "@/types/types";
import Link from "next/link";
import { useEffect, useState } from "react";
import { movieDetails } from "@/source/tmdb";
import { LiaHeartSolid } from "react-icons/lia";
import {  useFavoriteMovie } from '@/context/favoriteMovie'

type MovieCardProps = {
  movie: MovieType;
  genreMap?: Record<number, string>;
};

export default function MovieCard({ movie }: MovieCardProps) {
  const [movieDetail, setMovieDetail] = useState<MovieType | null>(null);
  const {addToFavorite, removeFromFavorite, isFavoriteMovie} = useFavoriteMovie();

  const isFavorite:boolean = isFavoriteMovie(movie.id);

  useEffect(() => {
    const loadMovieDetail = async () => {
      const fetchMovieDetail = await movieDetails(movie.id);
      setMovieDetail(fetchMovieDetail);
    };
    loadMovieDetail();
  }, []);

  const favorite = () => {

    if (isFavorite) {
      removeFromFavorite(movie.id);
    }else{
      addToFavorite(movie);
    }

  };

  const genreName = movieDetail?.genres?.[0]?.name;

  return (
      <div className="group relative overflow-hidden rounded-2xl border border-black/5 bg-[#FDFAF6] shadow-[0_12px_30px_rgba(0,0,0,0.12)] transition-transform duration-300 hover:-translate-y-1 hover:shadow-[0_18px_40px_rgba(0,0,0,0.16)] dark:border-white/10 dark:bg-[#202020]">
        <button
          type="button"
          aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
          onClick={favorite}
          className="absolute right-3 top-3 z-10 grid h-9 w-9 place-items-center rounded-full bg-black/55 text-white backdrop-blur-sm transition hover:scale-105 hover:bg-black/75"
        >
          <LiaHeartSolid className={`text-lg ${isFavorite ? "text-red-400" : "text-white"}`} />
        </button>

        <Link href={`/movie/${movie.id}`} className="block">
          <div className="relative aspect-2/3 overflow-hidden">
            <img
              src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
              alt={movie.title}
              className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-110"
            />
          </div>

          <div className="flex flex-col gap-3 p-3 text-xs">
            <div className="flex items-start justify-between gap-3">
              <p className="line-clamp-2 text-sm font-bold leading-snug text-black dark:text-white">
                {movie.title}
              </p>
              <p className="shrink-0 rounded-full bg-black/5 px-2 py-1 text-[11px] font-medium text-black/70 dark:bg-white/10 dark:text-white/70">
                {movie.release_date?.slice(0, 4) || "N/A"}
              </p>
            </div>

            <div className="flex items-center justify-between gap-3 text-[11px] text-black/70 dark:text-white/70">
              <span className="flex min-w-0 items-center gap-1.5">
                <MdMovieCreation className="shrink-0 text-yellow-500" />
                <p className="truncate">{genreName || "Genre unavailable"}</p>
              </span>

              <div className="flex items-center gap-3">
                <span className="flex items-center gap-1">
                  <FaStar className="text-yellow-300" />
                  <p>{movie.vote_average?.toFixed(1)}</p>
                </span>
                <span className="flex items-center gap-1">
                  <MdHowToVote className="text-blue-400" />
                  <p>{movie.vote_count}</p>
                </span>
              </div>
            </div>
          </div>
        </Link>
      </div>
  );
}
