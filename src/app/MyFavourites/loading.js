import SkeletonImage from "@/components/SkeletonImage";

export default function Loading() {
  return (
    <div>
      <div className="grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-5">
        {Array.from({ length: 10 }).map((_, index) => (
          <SkeletonImage key={index} />
        ))}
      </div>
    </div>
  );
}