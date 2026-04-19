export type MovieType = {
  genres: any;
  id: number;
  title: string;
  overview: string;
  poster_path: string;
  backdrop_path: string;
  release_date: string;
  vote_average: number;
  popularity: number;
  genre_ids: number[];
  runtime: number;
  vote_count: number;
};

export type GenreType = {
  id: number;
  name: string;
};
