import { movieDetails } from "@/source/tmdb";
import { FaPlay, FaStar } from "react-icons/fa";
import { TbChartBarPopular } from "react-icons/tb";
import { HiCalendarDateRange } from "react-icons/hi2";
import { release } from "os";

export default async function MovieDetail({
  params,
}: {
  params: Promise<{ movieId: string }>;
}) {
  const { movieId } = await params;
  const movieDetail = await movieDetails(movieId);

  if (!movieDetail) {
    return (
      <div className="flex h-full w-full items-center justify-center">
        <p>Movie not found.</p>
      </div>
    );
  }

  return (
    <div
      className="relative dark:border-white h-full w-full flex p-10 items-center overflow-hidden shadow-4xl"
    >
      <img
        src={`https://image.tmdb.org/t/p/original${movieDetail.backdrop_path}`}
        alt={movieDetail.title}
        className="object-cover w-full h-full absolute top-0 left-0 opacity-100 -z-10"
      />
      <div className="flex flex-col gap-4 text-white dark:text-white max-w-[600px]">
        <h1 className="text-3xl font-semibold drop-shadow-[4px_4px_10px_rgba(0,0,0,0.9)]">{movieDetail.title}</h1>
        <p className="text-lg  drop-shadow-[4px_4px_10px_rgba(0,0,0,0.9)]">{movieDetail.overview}</p>
        <span className="flex gap-4">
            <button className="flex items-center gap-2 py-3 px-6 bg-[#fa0103] rounded-lg shadow-[0_0_30px_rgba(255,0,0,0.9)] border-none">Watch Now <FaPlay/></button>
        <button className="flex items-center gap-2 py-3 px-6 bg-white/10 backdrop-blur-md rounded-lg text-white "> <p className="drop-shadow-[4px_4px_10px_rgba(0,0,0,0.9)]">Trailer</p> </button>
        </span>
        <span className="flex gap-4 drop-shadow-[4px_4px_10px_rgba(0,0,0,0.9)] mt-20">
            <p className="bg-white/10 backdrop-blur-md rounded-lg p-2">Genre</p>
            <p className="flex gap-2 items-center bg-white/10 backdrop-blur-md rounded-lg p-2"><FaStar className="text-yellow-300"/> {movieDetail.vote_average?.toFixed(1)}</p>
            <p className="flex gap-2 items-center bg-white/10 backdrop-blur-md rounded-lg p-2"><TbChartBarPopular className="text-blue-300"/> {movieDetail.popularity}</p>
            <p className="flex gap-2 items-center bg-white/10 backdrop-blur-md rounded-lg p-2"><HiCalendarDateRange className="text-[#DB1A1A]" /> {movieDetail.release_date || "N/A"}</p>
        </span>
      </div>
    </div>
  );
}
