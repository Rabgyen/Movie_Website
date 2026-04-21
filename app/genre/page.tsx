"use client";

import Genres from "@/components/genres";
import NavBar from "@/components/navbar";
import {fetchGenre} from "@/source/tmdb"
import { GenreType } from "@/types/types";
import { useState, useEffect } from "react";

export default function GenrePage(){

    const [fetchedGenre,setFetchedGenre] = useState<GenreType[]>([])

    useEffect(() => {
    const loadGenre = async() => {
      const fetchedGenres = await fetchGenre();
      setFetchedGenre(Array.isArray(fetchedGenres) ? fetchedGenres : []);
    }
    loadGenre();
  }, [])

    return(
        <div className="w-full h-full ">
          <NavBar/>
            <div className="grid w-full max[repeat(auto-fit,minmax(200px,1fr))]1 gap-4 sm:grid-cols-2 md:grid-cols-3 py-4 px-2 md:px-10">
              {(fetchedGenre ?? []).map((genre: GenreType) => (
                    <Genres key={genre.id} genre={genre} />
                  ))}
            </div>
        </div>
    )
}