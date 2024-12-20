"use client";
import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { getMoviesBySearch } from "../../utils/request";
import Auth from "./Auth";
import { FaRegHeart } from "react-icons/fa";

export default function NavigationBar() {
  const [isEntered, setIsEntered] = useState(false);
  const [enteredValue, setEnteredValue] = useState("");
  const [data, setData] = useState([]); // Use state to store movie data
  const debounceTimeout = useRef(null);

  async function getText(value) {
    setEnteredValue(value);
    if (value.length > 0) {
      const movieData = await getMoviesBySearch(value);
      // console.log("Movie data:", movieData);
      setData(movieData); // Update state with the movie data
      setIsEntered(true);
    } else {
      setIsEntered(false);
      setData([]); // Clear data if input is empty
    }
  }
  useEffect(() => {
    console.log("Updated enteredValue:", enteredValue);
  }, [enteredValue]);

  useEffect(() => {
    console.log("Updated enteredState:", isEntered);
  }, [isEntered]);

  function debouncedGetText(event) {
    const value = event.target.value;

    // Clear the previous timeout
    if (debounceTimeout.current) {
      clearTimeout(debounceTimeout.current);
    }

    // Set a new timeout
    debounceTimeout.current = setTimeout(() => {
      getText(value);
    }, 400); // 400ms delay
  }

  const clearSearch = () => {
    setEnteredValue("");
    setIsEntered(false);
    setData([]);
  };

  return (
    <div>
      <div className="pt-10 pb-10 flex justify-center items-center">
        <Link href={"/"} className="mx-5">
          <h1 className="bg-red-500 rounded-xl py-2 px-2 text-black text-2xl font-bold hidden lg:block opacity-70">
            Movie Matrix
          </h1>
          <h1 className="lg:text-4xl text-3xl font-sans font-semibold text-red-600 block lg:hidden opacity-80">
            MM
          </h1>
        </Link>
        <input
          type="text"
          placeholder="Search Movies"
          onChange={debouncedGetText}
          className="h-12 w-48 p-4 bg-black border-2 border-gray-600 border-opacity-50 outline-none
                        focus:border-gray-500 focus:border-opacity-75 focus:text-gray-400 transition duration-200"
        />
        <Link href="/MyFavourites">
          <FaRegHeart className="text-2xl text-red-500 ml-4 text-opacity-60"></FaRegHeart>
        </Link>
        <Auth></Auth>
      </div>
      {isEntered && (
        <div>
          <h1 className="text-gray-500 text-2xl mb-10">
            Movies based on "{enteredValue}"
          </h1>
          <div className="grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-5 mb-10">
            {data.map(
              (movie, i) =>
                i < 10 && (
                  <Link key={movie.id} href={`/MovieDetails/${movie.id}`}>
                    <div onClick={clearSearch}>
                      <Image
                        className="hover:scale-90 delay-80 duration-300"
                        src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                        alt={movie.title}
                        width={250}
                        height={350}
                      />
                    </div>
                  </Link>
                )
            )}
          </div>
        </div>
      )}
    </div>
  );
}
