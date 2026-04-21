import { GenreType } from "@/types/types"

type MovieGenreProp = {
    genre: GenreType;
}


export default function Genres({ genre }: MovieGenreProp){
    return(
        <div className="flex py-4 px-6 drop-shadow-[4px_4px_10px_rgba(0,0,0,0.9)] border border-black/20 dark:border-white/20 shadow-lg rounded-lg hover:translate-y-0.5 hover:shadow-[0_0_20px_rgba(196,179,255,0.5)] transition-transform duration-300">
            <p>{genre.name}</p>
        </div>
    )
}