import NavigationBar from "@/components/Navbar";
import SkeletonImage from "@/components/SkeletonImage";

export default function Loading() {
    return (
        <div>
            <div className="grid grid-cols-2 gap-5">
                <div className="relative space-y-3 overflow-hidden rounded-md bg-neutral-800 p-3 shadow before:absolute before:inset-0 before:-translate-x-full before:bg-gradient-to-r before:from-transparent before:via-white/20 hover:shadow-lg before:animate-[shimmer_1.5s_infinite]">
                    <div className="h-[280px] w-[170px] rounded-lg p-4"></div>
                </div>
                <div className="relative space-y-3 overflow-hidden rounded-md bg-neutral-800 p-3 shadow before:absolute before:inset-0 before:-translate-x-full before:bg-gradient-to-r before:from-transparent before:via-white/20 hover:shadow-lg before:animate-[shimmer_1.5s_infinite]">
                    <div className="h-[280px] w-[170px] rounded-lg p-4"></div>
                </div>
            </div>
        </div>
    );
}