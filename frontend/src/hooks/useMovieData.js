import { useState } from "react";
import { GameDetailService } from "@/service/GameDetailService";

export const useMovieData = () => {
  const [moviesIframeTags, setMoviesIframeTags] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleGetDetailById = async (id = "1") => {
    try {
      setLoading(true);
      const data = await GameDetailService.getDetailById(id);
      setMoviesIframeTags(data.movies);
      return data;
    } catch (error) {
      console.error("Error fetching movie data:", error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  return {
    moviesIframeTags,
    loading,
    handleGetDetailById,
  };
};
