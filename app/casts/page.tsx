import Link from "next/link";
import Cast from "@/components/cast";
import { getMovieCast, movieDetails } from "@/source/tmdb";

type CastsPageProps = {
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

export default async function Casts({ searchParams }: CastsPageProps) {
    const resolvedSearchParams = await searchParams;
    const movieIdParam = resolvedSearchParams.movieId;
    const movieId = Array.isArray(movieIdParam) ? movieIdParam[0] : movieIdParam;

    if (!movieId) {
        return (
            <div className="flex h-full w-full items-center justify-center p-6 text-center">
                <div className="max-w-md space-y-4 rounded-2xl bg-white/10 p-8 backdrop-blur-md dark:bg-black/20">
                    <h1 className="text-2xl font-semibold text-white">All Casts</h1>
                    <p className="text-sm text-white/80">
                        Open a movie detail page and select See More Cast to load the full
                        cast list here.
                    </p>
                </div>
            </div>
        );
    }

    const [movie, casts] = await Promise.all([
        movieDetails(movieId),
        getMovieCast(movieId),
    ]);

    return (
        <div className="min-h-full w-full p-4 sm:p-6 md:p-10">
            <div className="mb-6 flex flex-wrap items-center justify-between text-black dark:text-white gap-4 rounded-3xl bg-white/10 p-6 backdrop-blur-md dark:bg-black/20">
                <div>
                    <p className="text-xs uppercase tracking-[0.3em] dark:text-white/60">
                        Casts
                    </p>
                    <h1 className="mt-2 text-2xl font-semibold sm:text-3xl">
                        {movie?.title ?? "All Casts"}
                    </h1>
                    <p className="mt-2 text-sm dark:text-white/75">
                        {casts.length > 0
                            ? `${casts.length} cast members found`
                            : "No cast members were returned for this movie."}
                    </p>
                </div>

                <Link
                    href={movieId ? `/movie/${movieId}` : "/explore"}
                    className="rounded-full dark:bg-white bg-black px-4 py-2 text-sm font-medium text-white dark:text-black transition hover:scale-[1.02]"
                >
                    Back to movie
                </Link>
            </div>

            <div className="grid grid-cols-[repeat(auto-fit,minmax(220px,1fr))] gap-4">
                {casts.map((cast) => (
                    <Cast key={cast.id} cast={cast} />
                ))}
            </div>
        </div>
    );
}