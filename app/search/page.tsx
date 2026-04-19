"use client"

import NavBar from "@/components/navbar";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { MovieType } from "@/types/types";
import { getSearchedMovies } from "@/source/tmdb";
import MovieCard from "@/components/movieCard";

export default function SearchedMovie(){

    const searchedParams = useSearchParams(); 
    const query = searchedParams.get("query");

    const[searchedMovie, setSearchedMovie] = useState<MovieType[] | null>([]);

    useEffect(() => {
        const loadSearchMovies = async() => {
            const searchMovieData = await getSearchedMovies(query);
            setSearchedMovie(searchMovieData)
        }
        loadSearchMovies();
    }, [query])
    console.log("searchedMovie")
    console.log(searchedMovie)

    return(
        <div>
            <NavBar />
            <div className="grid grid-cols-[repeat(auto-fit,minmax(250px,1fr))] gap-4 p-2 w-full">
                {(searchedMovie ?? []).map((movie: MovieType) => (
                        <MovieCard key={movie.id} movie={movie} />
                      ))}
            </div>
        </div>

    )
}