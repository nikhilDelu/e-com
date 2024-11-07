import { Product } from "@/lib/types";
import Image from "next/image";
import Link from "next/link";
import ProductListSkeleton from "./products/ProductListSkeleton";

function ProductList({ products }: { products: Product[] }) {
  if (!products) {
    <ProductListSkeleton />;
  }
  return (
    <div className="grid grid-cols-1 gap-2 sm:gap-2 md:gap-4">
      {products &&
        products.map((product, index) => (
          <ProductCard key={index} product={product} index={index} />
        ))}
    </div>
  );
}

export default ProductList;

function ProductCard({ product, index }: { product: Product; index: number }) {
  return (
    <div className="flex bg-white border border-gray-100 h-64 rounded-sm overflow-hidden">
      <Link
        href={`/product/${product.id}`}
        key={index}
        className="h-full w-[65%] relative group cursor-pointer overflow-hidden flex items-center bg-gray-100 p-4"
      >
        <Image
          src={product.images[0]}
          alt={`Post ${product.id}`}
          className="w-auto mx-auto h-full my-auto object-contain"
          width={200}
          height={200}
        />
      </Link>
      <div className="h-fit my-auto w-full text-black p-2 flex flex-col gap-2">
        <div className="h-fit">
          <div className="text-lg">{product.name}</div>

          <div className="h-20">
            <div className="font-bold text-lg">₹ {product.price}</div>
            <div>
              ⭐⭐⭐⭐⭐ <span className="text-[10px] text-gray-700">4.5k</span>
            </div>
          </div>
        </div>
        <div className="text-xs line-clamp-2">{product.description}</div>

        <div className="text-xs my-2">
          Free delivery <span className="font-bold">Mon, 28 Oct</span>
        </div>

        <button className="bg-yellow-400 rounded-full p-2 w-full">
          Add To Cart
        </button>
      </div>
    </div>
  );
}
