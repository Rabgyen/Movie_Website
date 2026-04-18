import { MovieType, GenreType } from "@/types/types";

const API_KEY:string = "c5507bc4d27fea7fedf1490ee7868415";
const BASE_URL: string = "https://api.themoviedb.org/3";

export const getMovies = async():Promise<MovieType[]> => {
    try{
        const response = await fetch(`${BASE_URL}/discover/movie?api_key=${API_KEY}&language=en-US&sort_by=popularity.desc&page=1`)

        const data = await response.json()
        return data.results;
    }catch(err){
        console.log(err);
        return[];
    }
}

export const getGenres = async (): Promise<GenreType[]> => {
  try {
    const res = await fetch(
      `${BASE_URL}/genre/movie/list?api_key=${API_KEY}&language=en-US`
    );

    const data = await res.json();
    return data.genres;

  } catch (err) {
    console.error("Error fetching genres:", err);
    return [];
  }
};