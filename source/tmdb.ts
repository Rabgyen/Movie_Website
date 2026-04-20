import { MovieType, GenreType, MovieCast } from "@/types/types";

const API_KEY = process.env.NEXT_PUBLIC_TMDB_API_KEY;

const getApiKey = (): string => {
  if (!API_KEY) {
    throw new Error("Missing NEXT_PUBLIC_TMDB_API_KEY environment variable");
  }

  return API_KEY;
};

if(!API_KEY){
  throw new Error("Missing API KEY")
}


const BASE_URL: string = "https://api.themoviedb.org/3";

export const getMovies = async(page:number):Promise<MovieType[]> => {
    try{
    const response = await fetch(`${BASE_URL}/discover/movie?api_key=${getApiKey()}&language=en-US&sort_by=popularity.desc&page=${page}`)

        const data = await response.json()
        return data.results;
    }catch(err){
        console.log(err);
        return[];
    }
}

export const getGenres = async (): Promise<Record<number, string>> => {
  try {
    const res = await fetch(
      `${BASE_URL}/genre/movie/list?api_key=${getApiKey()}&language=en-US`
    );

    const data = await res.json();

    const genreMap: Record<number, string> = {};
    data.genres.forEach((genre: GenreType) => {
      genreMap[genre.id] = genre.name;
    })

    return genreMap;

  } catch (err) {
    console.error("Error fetching genres:", err);
    return {};
  }
};

export const movieDetails = async (id: string | number): Promise<MovieType | null> => {
  try {
    const response = await fetch(`${BASE_URL}/movie/${id}?api_key=${getApiKey()}&language=en-US`);
    const data = await response.json();
    return response.ok ? data : null;
  } catch (err) {
    console.log(err);
    return null;
  }
}

export const getPopularMovies = async():Promise<MovieType[] | []> => {
  try{
    const response = await fetch(`${BASE_URL}/movie/popular?api_key=${getApiKey()}&language=en-US&page=1`);
    const data = await response.json();
    return data.results;
  }catch(err) {
    console.log(err) 
    return [];

}

}

export const getMovieCast = async(id: string|number): Promise<MovieCast[] | []> => {
  try{
    const response = await fetch(`${BASE_URL}/movie/${id}/credits?api_key=${getApiKey()}&language=en-US`);
    const data = await response.json();
    return data.cast;
  }catch(err){
    console.log(err)
    return [];
  }

}

export const getSearchedMovies = async(searchQuery:string | null): Promise<MovieType[]> => {
  try{
    const normalizedQuery = (searchQuery ?? "").trim();
    if (!normalizedQuery) {
      return [];
    }

    const response = await fetch(`${BASE_URL}/search/movie?api_key=${getApiKey()}&language=en-US&query=${encodeURIComponent(normalizedQuery)}&page=1`);
    const data = await response.json();
    return data.results;
  }catch(err){
    console.log(err);
    return[];
  }
}