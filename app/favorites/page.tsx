"use client";

import MovieCard from "@/components/movieCard";
import NavBar from "@/components/navbar";
import { useFavoriteMovie } from "@/context/favoriteMovie";
import { MovieType } from "@/types/types";

export default function Favourites(){

    const {favoriteMovie} = useFavoriteMovie();

    return(
        <div className="h-full w-full text-2xl font-bold">
            <NavBar/>
            <div className=" grid w-full grid-cols-[repeat(auto-fit,minmax(180px,220px))] gap-4  py-2">
                {(favoriteMovie ?? []).map((movie:MovieType) => (
                    <MovieCard key={movie.id} movie={movie} />
                ))}
            </div>
        </div>
    )
}

