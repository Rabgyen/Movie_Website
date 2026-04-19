import { MovieCast } from "@/types/types";

type CastTypeProps = {
  cast: MovieCast;
};

export default function Cast({ cast }: CastTypeProps) {
  return (
    <div className="flex items-center gap-2 py-2 px-4 rounded-lg bg-white/10 backdrop-blur-md">
      {cast.profile_path ? (
        <img
          src={`https://image.tmdb.org/t/p/w185${cast.profile_path}`}
          alt={cast.name}
          className="h-14 w-14 rounded-full object-cover"
        />
      ) : (
        <div className="h-14 w-14 rounded-full border-2 border-white bg-white/20" />
      )}
      <p className="drop-shadow-[4px_4px_10px_rgba(0,0,0,0.9)]">{cast.name}</p>
    </div>
  );
}
