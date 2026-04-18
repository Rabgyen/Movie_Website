"use client";

import { createContext, useContext, useState, ReactNode } from "react";

type MoviePageContextType = {
  page: number;
  setPage: React.Dispatch<React.SetStateAction<number>>;
};

const MoviePageContext = createContext<MoviePageContextType | undefined>(undefined);

export const MoviePageProvider = ({ children } : {children:ReactNode}) => {
    const [page, setPage] = useState(1);

    return (
    <MoviePageContext.Provider value={{ page, setPage }}>
      {children}
    </MoviePageContext.Provider>
  );
} 

export const useMoviePage = () => {
  const moviePagecontext = useContext(MoviePageContext);

  if (!moviePagecontext) {
    throw new Error("usePage must be used inside PageProvider");
  }

  return moviePagecontext;
};