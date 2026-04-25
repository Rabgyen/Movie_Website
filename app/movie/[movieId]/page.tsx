"use client";

import { movieDetails, getMovieCast } from "@/source/tmdb";
import { FaPlay, FaStar, FaBookmark } from "react-icons/fa";
import { TbChartBarPopular } from "react-icons/tb";
import { HiCalendarDateRange } from "react-icons/hi2";
import Cast from "@/components/cast";
import { FaArrowRightLong } from "react-icons/fa6";
import { LiaHeartSolid } from "react-icons/lia";
import { useEffect, useState } from "react";
import { useFavoriteMovie } from "@/context/favoriteMovie";
import { useSavedMovies } from "@/context/savedMoviesContext";
import { useParams } from "next/navigation";

export default function MovieDetail() {
  const { addToFavorite, removeFromFavorite, isFavoriteMovie } = useFavoriteMovie();
  const { addToSavedMovie, removFromSavedMovie, isSavedMovie } = useSavedMovies();
  const params = useParams<{ movieId: string | string[] }>();
  const movieId = Array.isArray(params?.movieId) ? params.movieId[0] : params?.movieId;
  const [movieDetail, setMovieDetail] = useState<Awaited<ReturnType<typeof movieDetails>> | null>(
    null,
  );
  const [casts, setCasts] = useState<Awaited<ReturnType<typeof getMovieCast>>>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    let isMounted = true;

    const loadMovieData = async () => {
      if (!movieId) {
        setIsLoading(false);
        setNotFound(true);
        return;
      }

      setIsLoading(true);
      setNotFound(false);

      try {
        const [detail, castList] = await Promise.all([
          movieDetails(movieId),
          getMovieCast(movieId),
        ]);

        if (!isMounted) return;

        if (!detail) {
          setMovieDetail(null);
          setCasts([]);
          setNotFound(true);
          return;
        }

        setMovieDetail(detail);
        setCasts(castList);
      } catch {
        if (!isMounted) return;

        setMovieDetail(null);
        setCasts([]);
        setNotFound(true);
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };

    loadMovieData();

    return () => {
      isMounted = false;
    };
  }, [movieId]);

  if (isLoading) {
    return (
      <div className="flex h-full w-full items-center justify-center font-bold">
        <p>Loading movie...</p>
      </div>
    );
  }

  if (notFound || !movieDetail) {
    return (
      <div className="flex h-full w-full items-center justify-center font-bold">
        <p>Movie not found.</p>
      </div>
    );
  }

  const isMovieFavorite = isFavoriteMovie(movieDetail.id);
  const isMovieSaved = isSavedMovie(movieDetail.id);

  const handleFavoriteToggle = () => {
    if (isMovieFavorite) {
      removeFromFavorite(movieDetail.id);
      return;
    }

    addToFavorite(movieDetail);
  };

  const handleSavedToggle = () => {
    if (isMovieSaved) {
      removFromSavedMovie(movieDetail.id);
      return;
    }

    addToSavedMovie(movieDetail);
  };

  return (

    

    <div className="relative dark:border-white h-full w-full flex p-2 sm:p-5 md:p-10 items-center overflow-auto shadow-4xl ">
      <img
        src={`https://image.tmdb.org/t/p/original${movieDetail.backdrop_path}`}
        alt={movieDetail.title}
        className="object-cover w-full h-full absolute top-0 left-0 opacity-100 -z-10"
      />
      <div className="flex flex-col gap-4 text-white dark:text-white max-w-150">
        <h1 className="text-xl sm:text-2xl md:text-3xl  font-semibold drop-shadow-[4px_4px_10px_rgba(0,0,0,0.9)]">
          {movieDetail.title}
        </h1>
        <p className="text-sm drop-shadow-[4px_4px_10px_rgba(0,0,0,0.9)]">
          {movieDetail.overview}
        </p>
        <span className="flex gap-4">
          <button className="flex items-center gap-2 py-3 px-6 bg-[#fa0103] rounded-lg shadow-[0_0_30px_rgba(255,0,0,0.9)] hover:shadow-[0_0_70px_rgba(255,0,0,0.9)] border-none transition-all duration-300">
            Watch Now <FaPlay />
          </button>
          <button className="flex items-center gap-2 py-3 px-6 bg-white/10 backdrop-blur-md rounded-lg text-white ">
            {" "}
            <p className="drop-shadow-[4px_4px_10px_rgba(0,0,0,0.9)]">
              Trailer
            </p>{" "}
          </button>
          <span className="flex gap-4 items-center">
              <button
                type="button"
                onClick={handleSavedToggle}
                aria-label={isMovieSaved ? "Remove from saved movies" : "Add to saved movies"}
                className={`p-3 rounded-full text-white backdrop-blur-sm transition hover:scale-105 ${
                  isMovieSaved ? "bg-blue-600/80" : "bg-black/55 hover:bg-black/75"
                }`}
              >
                <FaBookmark />
              </button>
              <button
                type="button"
                onClick={handleFavoriteToggle}
                aria-label={isMovieFavorite ? "Remove from favorites" : "Add to favorites"}
                className={`p-3 rounded-full text-white backdrop-blur-sm transition hover:scale-105 ${
                  isMovieFavorite ? "bg-red-600/80" : "bg-black/55 hover:bg-black/75"
                }`}
              >
                <LiaHeartSolid/>
              </button>
            </span>
        </span>
        <div className="flex gap-2 flex-wrap flex-col">
          <h1 className="drop-shadow-[4px_4px_10px_rgba(0,0,0,0.9)]">Top Casts:</h1>
          <div className="flex flex-wrap gap-2">
            {casts.slice(0, 5).map((cast) => (
            <Cast key={cast.id} cast={cast} />
          ))}
          </div>
          <div className="group flex items-center gap-2 py-2 px-4 rounded-lg bg-white/10 backdrop-blur-md max-w-40 text-xs">
            See More Cast <FaArrowRightLong  className="group-hover:translate-x-2 transition-all duration-300"/> 
          </div>
        </div>
        <span className="flex flex-col gap-4 drop-shadow-[4px_4px_10px_rgba(0,0,0,0.9)] mt-20 text-xs">
          <span
            className="flex gap-2"
          >
            <p className="bg-white/10 backdrop-blur-md rounded-lg p-2 drop-shadow-[4px_4px_10px_rgba(0,0,0,0.9)]">
              Genres:
            </p>
            <span className="flex flex-wrap gap-2 drop-shadow-[4px_4px_10px_rgba(0,0,0,0.9)]">
              {movieDetail.genres?.map((genre: any) => (
                <p key={genre.id} className="bg-white/10 backdrop-blur-md rounded-lg p-2 drop-shadow-[4px_4px_10px_rgba(0,0,0,0.9)]">
                  {" "}
                  {genre.name}
                </p>
              ))}
            </span>
          </span>
          <span className="flex gap-2">
            <p className="flex gap-2 items-center bg-white/10 backdrop-blur-md rounded-lg p-2 drop-shadow-[4px_4px_10px_rgba(0,0,0,0.9)]">
            <FaStar className="text-yellow-300" />{" "}
            {movieDetail.vote_average?.toFixed(1)}
          </p>
          <p className="flex gap-2 items-center bg-white/10 backdrop-blur-md rounded-lg p-2 drop-shadow-[4px_4px_10px_rgba(0,0,0,0.9)]">
            <TbChartBarPopular className="text-blue-300" />{" "}
            {movieDetail.popularity}
          </p>
          <p className="flex gap-2 items-center bg-white/10 backdrop-blur-md rounded-lg p-2 drop-shadow-[4px_4px_10px_rgba(0,0,0,0.9)]">
            <HiCalendarDateRange className="text-[#DB1A1A]" />{" "}
            {movieDetail.release_date || "N/A"}
          </p>
          </span>
        </span>
      </div>
    </div>
  );
}
