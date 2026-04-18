"use client";

import { FaStar } from "react-icons/fa";
import { MdHowToVote } from "react-icons/md";
import { MovieType } from "@/types/types";

type MovieCardProps = {
  movie: MovieType;
};

export default function MovieCard({ movie }: MovieCardProps) {
  return (
    <div className=" bg-[#202020] rounded-lg shadow-2xl flex flex-col">
      <div>
        <img
          src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
          alt="movie-img"
        />
      </div>
      <div className="flex flex-col gap-4 p-2 justify-between flex-1">
        <p className="text-xs font-bold">{movie.title}</p>
        <span className="flex justify-between">
          <p className="text-xs opacity-65">
            {movie.release_date?.slice(0, 4) || "N/A"}
          </p>
          <div className="flex gap-2">
            <span className="flex text-xs items-center gap-1">
            <FaStar className="text-yellow-300" />
            <p className="opacity-65">{movie.vote_average?.toFixed(1)}</p>
          </span>
          <span className="flex text-xs items-center gap-1">
            <MdHowToVote className="text-blue-400" />
            <p>{movie.vote_count}</p>
          </span>
          </div>
        </span>
      </div>
    </div>
  );
}
