import "./page.css";
import FetchingMovieGenres from "@/components/FetchingMovieGenres";
import {
  getTrendingMovies,
  getNowPlayingMovies,
  getUpcomingMovies,
} from "../../utils/request";
import Image from "next/image";
import imgimg from "../../public/avengers.jpg";
import { FaGithub } from "react-icons/fa";
import logo from "../../public/logo.png";
import Link from "next/link";

export default async function Home() {
  const data = [
    {
      x: getTrendingMovies,
      name: "Trending Movies",
      moreName: "getTrendingMovies",
    },
    {
      x: getNowPlayingMovies,
      name: "Now Playing Movies",
      moreName: "getNowPlayingMovies",
    },
    {
      x: getUpcomingMovies,
      name: "Upcoming Movies",
      moreName: "getUpcomingMovies",
    },
  ];

  return (
    <div>
      <div className="grid lg:grid-cols-2 md:grid-cols-1 grid-cols-1">
        <div>
          <h1 className="lg:text-5xl md:text-4xl text-3xl text-gray-300 font-semibold ">
            Movie Matrix Application built using{" "}
            <span className="text-red-500 leading-relaxed opacity-80">
              NextJs
            </span>
          </h1>
          <Link
            href="https://github.com/haribhutanadhu/TheMovieMatrix/tree/master"
            target="_blank"
            className="mt-5 flex gap-3 text-gray-500 hover:text-white/80 cursor-pointer"
          >
            <FaGithub className="text-2xl"></FaGithub>
            <h1 className="text-xl">Github Repo</h1>
          </Link>
        </div>
        <div className="p-5 flex justify-center opacity-80">
          <Image alt="home image" src={imgimg} width={450} height={550}></Image>
        </div>
      </div>
      {data.map((m, idx) => (
        <FetchingMovieGenres
          Genre={m.x}
          name={m.name}
          moreName={m.moreName}
          key={idx}
        ></FetchingMovieGenres>
      ))}
    </div>
  );
}
