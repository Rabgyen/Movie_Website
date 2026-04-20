"use client";

import { FaStar } from "react-icons/fa";
import { MdHowToVote, MdMovieCreation } from "react-icons/md";
import { MovieType } from "@/types/types";
import Link from "next/link";
import { useEffect, useState } from "react";
import { movieDetails } from "@/source/tmdb";

type MovieCardProps = {
  movie: MovieType;
  genreMap?: Record<number, string>;
};

export default function MovieCard({ movie }: MovieCardProps) {
  const [movieDetail, setMovieDetail] = useState<MovieType | null>(null);

  useEffect(() => {
    const loadMovieDetail = async () => {
      const fetchMovieDetail = await movieDetails(movie.id);
      setMovieDetail(fetchMovieDetail);
    };
    loadMovieDetail();
  }, []);

  return (
    <Link href={`/movie/${movie.id}`}>
      <div className=" bg-[#FDFAF6] rounded-lg shadow-2xl flex flex-col over dark:bg-[#202020] overflow-hidden ">
        <div className="overflow-hidden">
          <img
            src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
            alt="movie-img"
            className="hover:scale-110 transition-all duration-300"
          />
        </div>
        <div className="flex flex-col gap-2 p-2 justify-between flex-1 min-h-20 text-xs">
          <span className="flex gap-4 justify-between">
            <p className="text-xs font-bold">{movie.title}</p>
            <p className="text-xs opacity-75">
              {movie.release_date?.slice(0, 4) || "N/A"}
            </p>
          </span>
          <div className="flex justify-between opacity-75">
            <span className="flex gap-2 items-center">
              <MdMovieCreation className="text-yellow-500"/>
            {movieDetail?.genres?.slice(0,1).map((genre: any) => (
              <p
                key={genre.id}
                className="drop-shadow-[4px_4px_10px_rgba(0,0,0,0.9)]"
              >
                {" "}
                {genre.name}
              </p>
            ))}
            </span>
            <div className="flex gap-2">
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
      </div>
    </Link>
  );
}
