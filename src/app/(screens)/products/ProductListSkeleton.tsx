import { Skeleton } from "@/components/ui/skeleton";

function ProductListSkeleton({ count = 6 }: { count?: number }) {
  return (
    <div className="grid lg:grid-cols-3 md:grid-cols-3 grid-cols-1 gap-2 sm:gap-2 md:gap-4">
      {Array.from({ length: count }).map((_, index) => (
        <ProductCardSkeleton key={index} />
      ))}
    </div>
  );
}

function ProductCardSkeleton() {
  return (
    <div className="flex flex-col gap-1 animate-pulse">
      <div className="aspect-square relative rounded-sm overflow-hidden flex items-center bg-gray-200">
        <Skeleton className="h-full w-full" />
      </div>
      <div className="flex justify-between items-center bg-white/10 backdrop-blur-md p-2 rounded-sm h-[10%]">
        <Skeleton className="h-4 w-24" />
        <Skeleton className="h-4 w-16" />
      </div>
    </div>
  );
}

export default ProductListSkeleton;
