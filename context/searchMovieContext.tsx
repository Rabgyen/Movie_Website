"use client";

import { MovieType } from "@/types/types";
import { Dispatch, ReactNode, SetStateAction, useContext, useState } from "react";
import { createContext } from "react";

type SearchMovieContextType = {
    searchedMovie: string;
    setSearchedMovie: Dispatch<SetStateAction<string>>;
};

const SearchMovieContext = createContext<SearchMovieContextType | null>(null);

type SearchMovieProviderPropType = {
    children: ReactNode;
}

export const SearchMovieProvider = ({children} : SearchMovieProviderPropType) => {
    const [searchedMovie,setSearchedMovie] = useState("");

    return(
        <SearchMovieContext.Provider value={{searchedMovie, setSearchedMovie}}>
            {children}
        </SearchMovieContext.Provider>
    )
}

export const useSearchMovie = () => {
    const context = useContext(SearchMovieContext);

    if(!context){
        throw new Error("useSearchMovieContext must be used inside inside SearchMovieProvider");
    }

    return context;
}