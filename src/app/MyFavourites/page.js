"use client";
import { useSession, signIn } from "next-auth/react";
import { useEffect, useState } from "react";
import { getFavourites } from "../../../utils/request";
import Link from "next/link";
import Image from "next/image";
import Delete from "@/components/Delete";

const FavouritesPage = () => {
  const { status, data: session } = useSession();
  const [favouriteData, setFavouriteData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (session?.user?.email) {
          const res = await getFavourites(session.user.email);
          setFavouriteData(res);
        }
      } catch (error) {
        console.error("Error fetching favourites:", error);
      }
    };
    fetchData();
  }, [session]);

  if (status === "loading") {
    return <p className="text-gray-500 text-xl">Loading...</p>;
  }

  if (status === "unauthenticated") {
    return (
      <div>
        <div className="flex justify-center">
          <h1 className="text-gray-400 text-3xl mb-10 mt-10">
            {" "}
            <span className="text-red-500 text-opacity-70">Oops</span> !!{" "}
          </h1>
        </div>
        <div className="flex justify-center my-5">
          <p className="text-gray-500 text-2xl">
            Not authenticated!! Please{" "}
            <span className="text-red-500 text-opacity-70">SignIn</span> to
            continue ..
          </p>
        </div>
        <div className="flex justify-center my-20">
          <h1
            onClick={() => signIn("google")}
            className="text-gray-500 border border-gray-400 border-opacity-40 p-3 cursor-pointer"
          >
            Sign In
          </h1>
        </div>
      </div>
    );
  }

  // If the user is authenticated
  return (
    <div>
      <h1 className="text-gray-400 text-2xl mb-10">
        {" "}
        <span className="text-red-500 text-opacity-70">Hi</span>{" "}
        {session?.user?.name} !!{" "}
      </h1>
      <div className="grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-5 mb-10">
        {favouriteData.map((movie, i) => (
          <div key={i}>
            <Link href={`/MovieDetails/${movie.movieId}`}>
              <Image
                className="hover:scale-90 delay-80 duration-300"
                src={`https://image.tmdb.org/t/p/w500${movie.moviePoster}`}
                alt="Movie title"
                width={250}
                height={350}
              />
            </Link>
            <Delete movieId={movie.movieId} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default FavouritesPage;
