import VideoPlayer from "@/components/VideoPlayer";
import {
  getMovieDetails,
  getSimilarMovies,
  getVideoDetails,
} from "../../../../utils/request";
import Image from "next/image";
import Link from "next/link";
import MovieData from "@/components/MovieData";

export default async function MovieId({ params }) {
  const { movieId } = await params; // Ensure params are awaited

  const get_movie_detail = await getMovieDetails(movieId);
  const get_similar_movie_details = await getSimilarMovies(movieId);
  const get_video_details = await getVideoDetails(movieId);
  const video_key = get_video_details?.["results"]?.[0]?.["key"];

  return (
    <div>
      <div className="grid lg:grid-cols-2 md:grid-cols-1 grid-cols-1 items-center gap-6">
        <MovieData get_movie_detail={get_movie_detail}></MovieData>
        <div>
          <VideoPlayer video_key={video_key}></VideoPlayer>
        </div>
      </div>
      <div className="mt-10">
        <h1 className="border border-b-1 border-gray-600 border-opacity-30"></h1>
      </div>
      <h1 className="text-2xl font-semibold text-white/80 mt-8 mb-10">
        Similar Movies
      </h1>
      <div className="grid grid-cols-2 gap-5 md:grid-cols-3 lg:grid-cols-5">
        {get_similar_movie_details.map(
          (movie, i) =>
            i < 10 && (
              <Link href={`/MovieDetails/${movie.id}`} key={i}>
                <div>
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
  );
}
