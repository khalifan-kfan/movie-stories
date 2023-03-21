import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getMovie } from "../../api/index";
import ProgressBar from "../../components/progressIndicator";
import PlaceHolder from "../../assets/clapperboard.png";
import Header from "../../components/header";
import Footer from "../../components/footer";

const MovieDetailsPage = () => {
  const [movie, setMovie] = useState<any>({});
  const [error, setError] = useState("");
  const [progressIndicator, setProgressIndicator] = useState(true);
  const { movieId } = useParams();

  useEffect(() => {
    const fetchMovie = async () => {
      setError("");
      setProgressIndicator(true);
      if (movieId) {
        const movieData = await getMovie(movieId);
        if (movieData.message === "successfull") {
          setMovie(movieData.data);
          setProgressIndicator(false);
        } else {
          setError("Sorry we could not get your movie, try again later");
          setProgressIndicator(false);
        }
      }
    };
    fetchMovie();
  }, [movieId]);

  return (
    <>
    <Header />
    <div className="flex flex-col items-center justify-start  min-h-[90vh] bg-gray-900 text-white font-sans">
      <div className="max-w-screen-xl px-10 lg:px-19 md:px-[7rem] transition-all w-full mt-9 mx-4 sm:mx-8 md:mx-auto">
        {error === "" ? (
          <div className="flex flex-col md:flex-row justify-between pb-6">
            <div className="md:w-1/3 ">
              <img
                className="w-full max-h-[30rem] rounded-md shadow-md"
                src={movie.Poster !== "N/A" ? movie.Poster : PlaceHolder}
                alt={movie.Title}
              />
            </div>
            <div className="md:w-2/3 mt-6 md:mt-0 md:pb-4 md:px-4">
              <h1 className="text-3xl font-bold mb-2">{movie.Title}</h1>
              <p className="text-lg font-medium mb-4">{movie.Plot}</p>
              <div className="flex flex-col md:flex-row md:justify-between mb-4">
                <p className="text-lg md:max-w-[15rem] font-medium">
                  Runtime: {movie.Runtime}
                </p>
                <p className="text-lg md:max-w-[15rem] font-medium">
                  Released: {movie.Released}
                </p>
              </div>
              <div className="flex flex-col md:flex-row md:justify-between mb-4">
                <p className="text-lg md:max-w-[15rem] font-medium">
                  Genre: {movie.Genre}
                </p>
                <p className="text-lg md:max-w-[15rem] font-medium">
                  Rated: {movie.Rated}
                </p>
              </div>
              <div className="flex flex-col md:flex-row md:justify-between mb-4">
                <p className="text-lg md:max-w-[15rem] font-medium">
                  Director: {movie.Director}
                </p>
                <p className="text-lg md:max-w-[15rem] font-medium">
                  Language: {movie.Language}
                </p>
              </div>
              <div className="flex flex-col md:flex-row md:justify-between">
                <p className="text-lg max-w-[15rem] font-medium">
                  Actors: {movie.Actors}
                </p>
                <p className="text-lg max-w-[15rem] font-medium">
                  IMDb Rating: {movie.imdbRating}
                </p>
              </div>
            </div>
          </div>
        ) : (
          <div className="flex text-center text-[14px] font-bold mt-[15rem] items-center justify-center text-[#ffbcbc]">
            {error} &#128577;
          </div>
        )}
      </div>
      {progressIndicator && (
        <div className="flex z-20 items-center text-[#fff] justify-center rounded-md md:top-9 md:left-28 md:right-28  fixed h-full w-full md:w-[85%] md:h-[90%] bg-black opacity-70">
          <ProgressBar />
        </div>
      )}
      
    </div>
    <div className="relative bottom-[0] w-full">
    <Footer/>
    </div>
    </>
  );
};

export default MovieDetailsPage;
