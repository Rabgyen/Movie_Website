"use client";

import { useEffect, useState } from "react";
import {movieTrailer} from "@/source/tmdb";


export default function Trailer({movieId} : {movieId:string}){

    const [trailerUrl, setTrailerUrl] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchTrailer = async () => {
            try {
                const movieTrailerUrl = await movieTrailer(movieId);
                setTrailerUrl(movieTrailerUrl);
            } finally {
                setIsLoading(false);
            }
        }
        fetchTrailer();
    }, [movieId])

    if (isLoading) {
        return null;
    }

    const trailerKey = trailerUrl ? new URL(trailerUrl).searchParams.get("v") : null;

    if (!trailerUrl || !trailerKey) {
        return (
            <div className="flex h-full w-full items-center justify-center rounded-xl bg-black/40 p-4 text-center text-sm font-semibold text-white backdrop-blur-sm">
                Trailer unavailable
            </div>
        );
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