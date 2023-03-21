import axios from "axios";
import { API_BASE_URL,API_KEY } from "../config";



export const getMovie = async (id: string) => {
  try {
    const response = await axios.get(
      `${API_BASE_URL}/?apikey=${API_KEY}&i=${id}`
    );
    return { message: "successfull", data: response.data };
  } catch (error) {
    console.error(error);
    return {
      message: "failed",
      reason: "Failed to fetch movie data, try again later",
    };
  }
};

export const searchMovies = async (searchTeam: string, currentPage: number) => {
  try {
    const response = await axios.get(
      `${API_BASE_URL}/?apikey=${API_KEY}&s=${searchTeam}&page=${currentPage}`
    );
    if (response.data.Response === "False") {
      return {
        message: "failed",
        reason: `No movies found from search key: ${searchTeam}`,
      };
    } else {
      return { data: response.data, message: "successfull" };
    }
  } catch (error) {
    console.error(error);
    return {
      message: "failed",
      reason: "Failed to fetch movies, try again later",
    };
  }
};
