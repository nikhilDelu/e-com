import { Cart } from "@/lib/types";
import { getCart } from "./action";
import List, { PriceSection } from "./List";
import CartSkeleton from "./CartSkeleton";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

export default async function page() {
  const userId = "yash";
  var res;
  try {
    res = await getCart({ userId });
  } catch (error) {
    return (
      <div className="text-white font-bold">Error while getting cart!</div>
    );
  }
  const cart: Cart = res.data;

  return (
    <>
      <Title />
      {cart ? <List cart={cart} /> : <CartSkeleton />}
    </>
  );
}

const Title = () => {
  return (
    <div className="w-full px-6 font-bold text-xl mt-8 mb-4 container text-white mx-auto">
      <span className="text-red-600">C </span>A R T
      <div className="flex w-full">
        <hr className="border-2 w-[15px]" />
        <hr className="border-2 w-full border-red-600" />
      </div>
    </div>
  );
};
