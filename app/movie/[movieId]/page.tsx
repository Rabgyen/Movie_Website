import { movieDetails, getMovieCast } from "@/source/tmdb";
import { FaPlay, FaStar, FaBookmark } from "react-icons/fa";
import { TbChartBarPopular } from "react-icons/tb";
import { HiCalendarDateRange } from "react-icons/hi2";
import Cast from "@/components/cast";
import { FaArrowRightLong } from "react-icons/fa6";
import { LiaHeartSolid } from "react-icons/lia";
import { useFavoriteMovie } from "@/context/favoriteMovie";

export default async function MovieDetail({
  params,
}: {
  params: Promise<{ movieId: string }>;
}) {
  const { movieId } = await params;
  const movieDetail = await movieDetails(movieId);
  const casts = await getMovieCast(movieId);

  if (!movieDetail) {
    return (
      <div className="flex h-full w-full items-center justify-center font-bold">
        <p>Movie not found.</p>
      </div>
    );
  }
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
              <span className="p-3 rounded-full bg-black/55 text-white backdrop-blur-sm transition hover:scale-105 hover:bg-black/75">
                <FaBookmark />
              </span>
              <span className="p-3 rounded-full bg-black/55 text-white backdrop-blur-sm transition hover:scale-105 hover:bg-black/75">
                <LiaHeartSolid/>
              </span>
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
