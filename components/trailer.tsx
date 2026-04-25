"use client";

import { useEffect, useState } from "react";
import {movieTrailer} from "@/source/tmdb";


export default function Trailer({movieId} : {movieId:string}){

    const [trailerUrl, setTrailerUrl] = useState<string | null>(null);

    useEffect(() => {
        const fetchTrailer = async () => {
            const movieTrailerUrl = await movieTrailer(movieId);
            setTrailerUrl(movieTrailerUrl);
        }
        fetchTrailer();
    }, [movieId])

    if (!trailerUrl) {
        return null;
    }

    const trailerKey = new URL(trailerUrl).searchParams.get("v");

    if (!trailerKey) {
        return null;
    }

    return(
        <div className="h-full w-full">
            <iframe width="100%"
            height="100%"
            src={`https://www.youtube.com/embed/${trailerKey}`}
            title="Movie Trailer"   
            allowFullScreen>

            </iframe>
        </div>
    )
}