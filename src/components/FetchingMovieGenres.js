import Link from 'next/link';
import Image from "next/image";
import More from './More';
import HeadingMovie from '@/components/movieHeading';

export default async function FetchingMovieGenres({Genre, name, moreName}) {
    const movies_list = await Genre();
    return (
        <div>
            <HeadingMovie heading={name}></HeadingMovie>
            <div className="grid lg:grid-cols-6 grid-cols-3">
                {movies_list.map((movie, index) => (
                    (index < 6) && <Link href={`/MovieDetails/${movie.id}`} key={index}>
                        <div key={index}>
                            <Image className='hover:scale-90 delay-80 duration-300'
                                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                                alt={movie.title}
                                width={200}
                                height={300}
                            />
                        </div>
                    </Link>
                ))}
            </div>
            <More moreName={moreName} ></More>
        </div>
    );
}