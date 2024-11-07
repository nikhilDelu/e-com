import { Skeleton } from "@/components/ui/skeleton";

export default function CartSkeleton() {
  return (
    <div className="w-full max-w-4xl mx-auto p-4 sm:p-6 space-y-6">
      <div className="space-y-6">
        {[1, 2, 3].map((item) => (
          <div key={item} className="space-y-4">
            <div className="flex items-start gap-4">
              <Skeleton className="h-24 w-24 rounded-lg" />
              <div className="flex-1 space-y-2 py-2">
                <Skeleton className="h-4 w-[200px]" />
                <Skeleton className="h-4 w-[150px]" />
              </div>
              <div className="space-y-2 py-2">
                <Skeleton className="h-4 w-[100px]" />
                <div className="flex items-center gap-2 justify-end">
                  <Skeleton className="h-8 w-8 rounded-md" />
                  <Skeleton className="h-8 w-8" />
                  <Skeleton className="h-8 w-8 rounded-md" />
                </div>
              </div>
            </div>
            <hr className="bg-muted" />
          </div>
        ))}
      </div>

      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <Skeleton className="h-4 w-[100px]" />
          <Skeleton className="h-4 w-[100px]" />
        </div>
        <div className="flex justify-between items-center">
          <Skeleton className="h-4 w-[120px]" />
          <Skeleton className="h-4 w-[80px]" />
        </div>
        <hr className="bg-muted" />
        <div className="flex justify-between items-center">
          <Skeleton className="h-6 w-[100px]" />
          <Skeleton className="h-6 w-[120px]" />
        </div>
        <Skeleton className="h-12 w-full rounded-md" />
      </div>
    </div>
  );
}
