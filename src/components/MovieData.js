"use client";
import { useSession } from "next-auth/react";
import { useState } from "react";
import Alert from "./Alert";
import { FaRegHeart } from "react-icons/fa";

export default function MovieData(props) {
  const { status, data: session } = useSession();
  const [isAdded, setisAdded] = useState(false);
  const [isLogin, setLogin] = useState(false);
  const [isAlreadyAdded, setIsAlreadyAdded] = useState(false);

  function loginAlert() {
    setLogin(true);
    setTimeout(() => setLogin(false), 2000);
  }

  const addToFavourite = async () => {
    const favouriteData = {
      email: session?.user?.email,
      movieId: props.get_movie_detail.id,
      moviePoster: props.get_movie_detail.poster_path,
      movieTitle: props.get_movie_detail.title,
    };
    try {
      const res = await fetch("/api/favourites", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(favouriteData),
      });
      if (res.ok) {
        setisAdded(true);
        // Automatically reset success alert after 5 seconds
        setTimeout(() => setisAdded(false), 2000);
      } else if (res.status == 404) {
        setIsAlreadyAdded(true);
        setTimeout(() => setIsAlreadyAdded(false), 2000);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="mr-5">
      {isAdded && <Alert name="Success!!" colourset="green" />}
      {isLogin && <Alert name="Please login" colourset="red" />}
      {isAlreadyAdded && (
        <Alert name="Movie Already Added" colourset="green"></Alert>
      )}
      <h1 className="text-3xl font-bold text-gray-200 pt-5 pb-5 items-center">
        {props.get_movie_detail.title}
      </h1>
      <h1 className="text-lg text-gray-500 pb-5">
        {props.get_movie_detail.overview}
      </h1>
      <div className="flex gap-4 pb-4">
        <h1 className="text-lg text-gray-500">
          Budget : ${props.get_movie_detail.budget.toLocaleString()}
        </h1>
        <h1 className="text-lg text-green-500">
          Box Office : ${props.get_movie_detail.revenue.toLocaleString()}
        </h1>
      </div>
      <div className="flex gap-2">
        <h1 className="text-lg flex text-gray-500">Genres :</h1>
        <div className="text-lg text-gray-500 flex space-x-3">
          {props.get_movie_detail.genres.map((genre) => (
            <h1 key={genre.id} className="cursor-pointer hover:text-white/80">
              {genre.name}
            </h1>
          ))}
        </div>
      </div>
      <div className="flex mt-4 text-center items-center">
        <FaRegHeart className="text-red-500 text-xl cursor-pointer"></FaRegHeart>
        <h1
          onClick={status === "authenticated" ? addToFavourite : loginAlert}
          className="text-gray-400 w-35 hover:text-white/80 p-2 cursor-pointer"
        >
          Add to Favorites
        </h1>
      </div>
    </div>
  );
}
