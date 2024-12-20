import Link from "next/link";

export default function More(props) {
    return (
        <div className='flex justify-center text-center pt-6 '>
            <Link href={`/MovieGenres/${props.moreName}`} className="border-solid border-1 rounded-lg text-gray-400 w-20 hover:text-red-500 p-1" > More</Link>
        </div>
    );
}