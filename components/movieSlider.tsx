"use client";

import { MovieType } from "@/types/types";
import { useKeenSlider } from "keen-slider/react";
import "keen-slider/keen-slider.min.css";
import Link from "next/link";
import { useEffect } from "react";
import { FaPlay } from "react-icons/fa";
import { IoDownloadOutline } from "react-icons/io5";
import StarRating from "./starRating";


type MovieSliderProps = {
  movies: MovieType[];
};

export default function MovieSlider({ movies }: MovieSliderProps) {
  const [sliderRef, slider] = useKeenSlider({
    loop: true,
    slides: { perView: 1 },
  });

  useEffect(() => {
    slider.current?.update();
  }, [movies, slider]);

  useEffect(() => {
    const interval = setInterval(() => {
      slider.current?.next();
    }, 4000);
    return () => clearInterval(interval);
  }, [slider]);

  const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/original";

  return(
   <div
      ref={sliderRef}
      className="keen-slider w-full h-87.5 md:h-162.5 relative overflow-hidden rounded-xl cursor-pointer"
    >
      {movies.map((movie: MovieType) => (
        <div className="keen-slider__slide relative w-full h-full" key={movie.id}>
          <Link href={`/movie/${movie.id}`} className="block w-full h-full">
            <div className="absolute p-3 text-xs text-white rounded-lg shadow-lg bg-white/10 backdrop-blur-md-xl top-5 left-5">
              Popular Movies 🔥
            </div>
            <img
              src={`${IMAGE_BASE_URL}${movie.backdrop_path}`}
              className="object-cover w-full h-full"
              alt={movie.title}
            />
            <div className="absolute flex flex-col w-full gap-2 p-4 h-auto text-white bottom-4">
              <h2 className="text-2xl h-12.5 flex items-center font-semibold">
                {movie.title}
              </h2>
              <StarRating rating={movie.vote_average ?? 0} />
              <p className="max-w-125 hidden sm:flex h-auto mb-3 text-[14px]">
                {movie.overview}
              </p>
              <div className="flex gap-4">
                <button className="inline-flex items-center gap-2 px-4 py-2 text-sm text-black transition bg-white rounded-full hover:bg-black hover:text-white">
                  <FaPlay />
                  Watch
                </button>
                <button className="inline-flex items-center gap-2 px-4 py-2 text-sm text-white transition bg-black rounded-full hover:bg-white hover:text-black">
                  <IoDownloadOutline/>
                  Download
                </button>
              </div>
            </div>
          </Link>
        </div>
      ))}
    </div>
  );
}
