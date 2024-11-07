import { Product } from "@/lib/types";
import getProducts from "./action";
import ProductList from "../ProductList";

export default async function ExploreGrid() {
  const products: Product[] = await getProducts();

  return (
    <div className="bg-white">
      <div className="container w-full h-full mx-auto px-1 sm:px-2 md:px-4 py-4 max-w-3xl ">
        <ProductList products={products} />
      </div>
    </div>
  );
}
