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
      <div className="group relative h-full overflow-hidden rounded-xl border border-black/5 bg-[#FDFAF6] shadow-[0_10px_24px_rgba(0,0,0,0.10)] transition-transform duration-300 hover:-translate-y-1 hover:shadow-[0_14px_30px_rgba(0,0,0,0.14)] dark:border-white/10 dark:bg-[#202020]">
        <button
          type="button"
          aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
          onClick={favorite}
          className="absolute right-2 top-2 z-10 grid h-8 w-8 place-items-center rounded-full bg-black/55 text-white backdrop-blur-sm transition hover:scale-105 hover:bg-black/75"
        >
          <LiaHeartSolid className={`text-base ${isFavorite ? "text-red-400" : "text-white"}`} />
        </button>

        <Link href={`/movie/${movie.id}`} className="block">
          <div className="relative aspect-2/3 overflow-hidden">
            <img
              src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
              alt={movie.title}
              className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-110"
            />
          </div>

          <div className="flex flex-col gap-2 p-2 text-[11px]">
            <div className="flex items-start justify-between gap-2">
              <p className="line-clamp-2 text-[12px] font-bold leading-snug text-black dark:text-white">
                {movie.title}
              </p>
              <p className="shrink-0 rounded-full bg-black/5 px-1.5 py-0.5 text-[10px] font-medium text-black/70 dark:bg-white/10 dark:text-white/70">
                {movie.release_date?.slice(0, 4) || "N/A"}
              </p>
            </div>

            <div className="flex items-center justify-between gap-2 text-[10px] text-black/70 dark:text-white/70">
              <span className="flex min-w-0 items-center gap-1">
                <MdMovieCreation className="shrink-0 text-yellow-500" />
                <p className="truncate">{genreName || "Genre unavailable"}</p>
              </span>

              <div className="flex items-center gap-2.5">
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
