import axios from "axios";
// import Movie from "../types/movie";

export const fetchMovies = async (query:string)=>{
    const token: string = import.meta.env.VITE_TMDB_TOKEN;
    const response = await axios.get(`https://api.themoviedb.org/3/search/movie`, {
  params: {
    query:`${query}`
    
  },
  headers: {
    Authorization: `Bearer ${token}`,
  }
}
)

 return response.data.results   
 
}