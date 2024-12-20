import {
  getTrendingMovies,
  getNowPlayingMovies,
  getUpcomingMovies,
} from "../../../../utils/request";
import Link from "next/link";
import Image from "next/image";

export default async function Genre({ params }) {

  const {genre} = await params;

  // Fetch movies based on the genre
  let movies_list = [];
  let title = "";
  if (genre === "getTrendingMovies") {
    movies_list = await getTrendingMovies();
    title = "Trending Movies";
  } else if (genre === "getNowPlayingMovies") {
    movies_list = await getNowPlayingMovies();
    title = "Now Playing Movies";
  } else if (genre === "getUpcomingMovies") {
    movies_list = await getUpcomingMovies();
    title = "Upcoming Movies";
  } else {
    return (
      <div className="text-gray-500 text-center pt-20">
        <h1>Oops !! Genre not found</h1>
        <Link href="/" className="text-red-500 hover:underline">
          Back to Home
        </Link>
      </div>
    );
  }

  return (
    <div>
      <div className="flex gap-2">
        <Link href="/" className="text-gray-500 hover:text-gray-300 mb-5">
          Back to Home
        </Link>
      </div>
      <div className="flex justify-center mb-8">
        <h1 className="text-gray-500 text-2xl">{title}</h1>
      </div>
      <div className="grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-5">
        {movies_list.map((movie) => (
          <div key={movie.id}>
            <Link href={`/MovieDetails/${movie.id}`}>
              <Image
                className="hover:scale-90 delay-80 duration-300"
                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                alt={movie.title}
                width={250}
                height={350}
              />
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
