import { Skeleton } from "@/components/ui/skeleton";

export default function ProductPageSkeleton() {
  return (
    <div className="container mx-auto px-4 py-8 animate-pulse">
      <div className="md:grid md:grid-cols-2 md:gap-8">
        {/* Product Images Skeleton */}
        <div className="space-y-4 mb-6 md:mb-0">
          <Skeleton className="aspect-square w-full rounded-lg" />
          <div className="flex space-x-4 overflow-x-auto">
            {[1, 2, 3, 4].map((item) => (
              <Skeleton
                key={item}
                className="w-20 h-20 md:w-24 md:h-24 flex-shrink-0 rounded-lg"
              />
            ))}
          </div>
        </div>

        {/* Product Details Skeleton */}
        <div className="space-y-6">
          <div>
            <Skeleton className="h-8 w-3/4 mb-2" />
            <Skeleton className="h-6 w-1/4" />
          </div>

          <div className="flex items-center space-x-2">
            {[1, 2, 3, 4, 5].map((star) => (
              <Skeleton key={star} className="w-5 h-5 rounded-full" />
            ))}
            <Skeleton className="w-24 h-4" />
          </div>

          <div>
            <Skeleton className="h-6 w-1/3 mb-2" />
            <div className="flex space-x-2">
              {[1, 2, 3, 4].map((item) => (
                <Skeleton key={item} className="w-16 h-8 rounded-full" />
              ))}
            </div>
          </div>

          <div className="flex space-x-4">
            <Skeleton className="h-10 flex-grow rounded-md" />
            <Skeleton className="h-10 w-10 rounded-md" />
            <Skeleton className="h-10 w-10 rounded-md" />
          </div>

          <div>
            <div className="flex space-x-4 mb-4">
              <Skeleton className="h-8 w-24 rounded-md" />
              <Skeleton className="h-8 w-24 rounded-md" />
              <Skeleton className="h-8 w-24 rounded-md" />
            </div>
            <Skeleton className="h-24 w-full rounded-md" />
          </div>
        </div>
      </div>

      {/* Related Items Skeleton */}
      <div className="mt-16">
        <Skeleton className="h-8 w-48 mb-4" />
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[1, 2, 3, 4].map((item) => (
            <div key={item} className="space-y-2">
              <Skeleton className="aspect-square w-full rounded-lg" />
              <Skeleton className="h-4 w-3/4" />
              <Skeleton className="h-4 w-1/2" />
            </div>
          ))}
        </div>
      </div>

      {/* Mobile-specific styles */}
      <style jsx global>{`
        @media (max-width: 768px) {
          .container {
            padding: 0;
          }
          .aspect-square {
            border-bottom-left-radius: 2rem;
            border-bottom-right-radius: 2rem;
            height: 70vh;
          }
          .space-y-6 {
            padding: 1rem;
          }
          .flex.space-x-4:last-of-type {
            position: fixed;
            bottom: 0;
            left: 0;
            right: 0;
            background-color: white;
            padding: 1rem;
            border-top-left-radius: 1.5rem;
            border-top-right-radius: 1.5rem;
            box-shadow: 0 -4px 6px -1px rgba(0, 0, 0, 0.1),
              0 -2px 4px -1px rgba(0, 0, 0, 0.06);
          }
        }
      `}</style>
    </div>
  );
}
