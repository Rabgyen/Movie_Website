"use client";

import { GenreType } from "@/types/types"
import { useRouter } from "next/navigation";

type MovieGenreProp = {
    genre: GenreType;
}


export default function Genres({ genre }: MovieGenreProp){
    const router = useRouter();

    const handleClick = () => {
        router.push(`/genreMovie?query=${encodeURIComponent(genre.name)}&id=${genre.id}`);
    }

    return(
        <div className="flex py-4 px-6 drop-shadow-[4px_4px_10px_rgba(0,0,0,0.9)] border border-black/20 dark:border-white/20 shadow-lg rounded-lg hover:translate-y-0.5 hover:shadow-[0_0_20px_rgba(255,255,255,0.8)]  transition-transform duration-300" onClick={handleClick}>
            <p>{genre.name}</p>
        </div>
    )
}