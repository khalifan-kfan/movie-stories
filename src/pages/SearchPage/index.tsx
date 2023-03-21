import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector, TypedUseSelectorHook } from "react-redux";
import { RootState } from "../../store";
import { searchMovies } from "../../api/index";
import Pagination from "../../components/pagination";
import { setSearchLists, resetMovies } from "../../redux/Slices/movies";
import Header from "../../components/header";
import ProgressBar from "../../components/progressIndicator";
import PlaceHolder from "../../assets/clapperboard.png";

const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector;
const SearchPage = () => {
  const searchData = useTypedSelector((state) => state.movies);
  const [searchTerm, setSearchTerm] = useState(searchData.searchTerm);
  const [MoviesTotal, setMoviesTotal] = useState(searchData.moviesTotal);
  const [currentPage, setCurrentPage] = useState(searchData.currentPage);
  const dispatch = useDispatch();
  const [searchTermErrorResponse, setSearchTermErrorResponse] = useState("");
  const [searchResults, setSearchResults] = useState(searchData.searchResults);
  const [progressIndicator, setProgressIndicator] = useState(false);

  const handleSearchInputChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setSearchTerm(event.target.value);
    if (searchTermErrorResponse) {
      //clear error on new entry
      setSearchTermErrorResponse("");
    }
  };

  const handleSearchFormSubmit = async (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();
    //reset previous state
    dispatch(resetMovies({}));
    setCurrentPage(1);
    setSearchTermErrorResponse("");
    setMoviesTotal(0);
    setProgressIndicator(true);
    requestForMovies(1);
  };
  const requestForMovies = async (currentPage: number) => {
    const results = await searchMovies(searchTerm, currentPage);
    if (results.message === "successfull") {
      console.log(results.data.Search);
      setSearchResults(results.data.Search);
      setMoviesTotal(results.data.totalResults);
      //temporarily persist data for back click use experience
      dispatch(
        setSearchLists({
          searchTerm: searchTerm,
          moviesTotal: results.data.totalResults,
          currentPage: currentPage,
          searchResults: results.data.Search,
        })
      );
      setProgressIndicator(false);
    } else {
      //set error, no need for else since there is allways a reason on failure
      if (results.reason) {
        setSearchTermErrorResponse(results.reason);
        setProgressIndicator(false);
      }
    }
  };
  const onPageChange = (currentPage: number) => {
    // load ,more content
    setCurrentPage(currentPage);
    setProgressIndicator(true);
    requestForMovies(currentPage);
  };
  const countGroupsOfTen = (movies: number) => {
    const remainder = movies % 10 > 0;
    return Math.floor(movies / 10) + (remainder ? 1 : 0);
  };

  return (
    <div className="relative bg-gray-900  flex flex-col min-h-screen font-sans">
      <Header />
      <main className=" px-10 lg:px-19 md:px-[7rem] transition-all">
        <div
          className={`flex items-center mt-[2rem]  ${
            searchResults.length > 0
              ? "flex-col md:flex-row justify-between px-3"
              : "flex-col md:mt-[3rem]"
          } text-[#fff] `}
        >
          <h1
            className={`flex justify-center font-black  ${
              searchResults.length > 0
                ? "text-[25px] md:text-[35px]"
                : "text-[35px] md:text-[50px] "
            } pb-5`}
          >
            Our stories 📽️
          </h1>
          {searchResults.length === 0 && (
            <p className="text-[#f8e6e6] text-[20px]  md:text-[27px] text-center ">
              Discover your next favorite movie with Movie Stories! &#128151;
            </p>
          )}
          <form
            className={`flex  ${
              searchResults.length > 0
                ? "w-[50%]"
                : "w-[60%] mt-[30px] md:mt-[50px]"
            } justify-center`}
            onSubmit={handleSearchFormSubmit}
          >
            <div
              className={` w-[27rem] ${
                searchResults.length > 0
                  ? " h-[50px] "
                  : "h-[50px]  md:h-[58px] md:w-full"
              }  border-[1px] pl-2 pr-2 border-[#000] rounded-[2rem]  bg-[#fff] flex items-center justify-between`}
            >
              <input
                type="text"
                id="search"
                placeholder="Goosebumps..."
                className={`h-[80%]  ${
                  searchResults.length > 0 ? "" : "w-[12rem] md:w-[20rem]"
                }   p-4 text-[13px] md:text-[20px] text-[#000] focus:outline-none rounded-[2rem]`}
                value={searchTerm}
                onChange={handleSearchInputChange}
              />
              <button
                className={`bg-[#000] p-3 justify-center items-center text-[13px] ${
                  searchResults.length > 0
                    ? "text-[17px] w-[5.4rem]"
                    : "md:px-5 md:pt-4 md:pb-5 md:text-[20px] max-sm:w-[5.4rem]"
                } h-[90%] rounded-[2rem] flex flex-row" type="submit `}
              >
                Find🔍
              </button>
            </div>
          </form>
        </div>
        {searchTermErrorResponse === "" && searchResults.length > 0 && (
          <>
            <div className="grid grid-cols-2 md:grid-cols-5 sm:grid-cols-3 gap-2 mt-7">
              {searchResults.map((result: any) => (
                <Link
                  to={`/movie/${result.imdbID}`}
                  key={result.imdbID}
                  className="relative"
                >
                  <div className="relative shadow-lg rounded-lg overflow-hidden transform hover:scale-105">
                    <img
                      src={
                        result.Poster !== "N/A" ? result.Poster : PlaceHolder
                      }
                      alt={result.Title}
                      className="object-cover w-full h-40 sm:h-48 md:h-60"
                    />
                    <div className="absolute inset-0 flex text-center justify-center items-center text-white font-bold text-lg uppercase tracking-wider opacity-0 hover:opacity-70 bg-black transition-opacity duration-300">
                      <span>{result.Title}</span>
                    </div>
                  </div>
                  <div className="mt-2 text-[#fcefef]">
                    <h2 className="text-lg font-medium whitespace-nowrap overflow-hidden overflow-ellipsis">
                      {result.Title}
                    </h2>
                    <p className="text-[#fcefef]">{result.Year}</p>
                  </div>
                </Link>
              ))}
            </div>
          </>
        )}
        {searchTermErrorResponse !== "" && (
          <div className="flex text-center text-[14px] font-bold mt-[15rem] items-center justify-center text-[#ffbcbc]">
            {searchTermErrorResponse} &#128577;
          </div>
        )}
      </main>
      <footer className={`w-full `}>
        {countGroupsOfTen(MoviesTotal) > 1 && (
          <div className="flex w-full pb-6 mt-9 justify-center">
            <Pagination
              total={countGroupsOfTen(MoviesTotal)}
              current={currentPage}
              onPageChange={onPageChange}
            />
          </div>
        )}
        {/* <Header /> */}
      </footer>
      {progressIndicator && (
        <div className="flex z-20 items-center text-[#fff] justify-center rounded-md md:top-9 md:left-28 md:right-28  fixed h-full w-full md:w-[85%] md:h-[90%] bg-black opacity-70">
          <ProgressBar />
        </div>
      )}
    </div>
  );
};

export default SearchPage;
