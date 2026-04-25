"use client";

import MovieCard from "@/components/movieCard";
import NavBar from "@/components/navbar";
import { useSavedMovies } from "@/context/savedMoviesContext";
import { MovieType } from "@/types/types";

export default function SavedMovies() {
    const { savedMovies, removeAll } = useSavedMovies();

    return (
        <div className="h-full w-full text-2xl font-bold">
            <NavBar />

            <div className="mx-auto flex w-full max-w-screen-2xl flex-col gap-4 px-3 py-3 sm:px-5 lg:px-8">
                <div className="flex items-center justify-between gap-3">
                    <h1 className="text-lg font-semibold text-black dark:text-white sm:text-xl">
                        Saved Movies
                    </h1>
                    <span className="flex gap-2 text-sm font-medium">
                        <p className=" text-black/60 dark:text-white/60">
                        {savedMovies.length} saved
                    </p>
                    <p className="cursor-pointer text-black/60 transition-colors hover:text-blue-400 hover:underline dark:text-white/60 dark:hover:text-blue-400" onClick={removeAll}>
                        Remove All
                    </p>
                    </span>
                </div>

                {savedMovies.length === 0 ? (
                    <div className="flex min-h-[40vh] items-center justify-center rounded-2xl border border-dashed border-black/10 bg-black/3 p-6 text-center dark:border-white/10 dark:bg-white/3">
                        <p className="text-sm font-medium text-black/60 dark:text-white/60 sm:text-base">
                            No saved movies yet. Bookmark a movie to see it here.
                        </p>
                    </div>
                ) : (
                    <div className="grid w-full grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-6">
                        {savedMovies.map((movie: MovieType) => (
                            <MovieCard key={movie.id} movie={movie} />
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
