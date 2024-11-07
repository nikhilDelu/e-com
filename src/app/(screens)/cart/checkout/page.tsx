"use client";

import { Skeleton } from "@/components/ui/skeleton";
import { CartItem, Order, Product } from "@/lib/types";
import { useEffect, useState } from "react";
import { getProductById } from "../action";
import Image from "next/image";

export default function page() {
  const orderData: Order = JSON.parse(
    localStorage.getItem("orderData") || "{}"
  );
  return (
    <div className="text-white container mx-auto">
      <Title />
      <div>
        <div className="p-4">
          <h1>Delivery Address</h1>
          <div className="h-fit w-full rounded-lg border">
            <div className="h-fit w-full p-4 rounded-lg border">
              <div className="flex items-center justify-between">
                <input
                  type="radio"
                  id="abohar"
                  name="address"
                  value={"abohar"}
                />
                <p>Abohar,Punjab</p>
              </div>
            </div>
            <div className="h-fit w-full p-4 rounded-lg border">
              <div className="flex items-center justify-between">
                <input
                  type="radio"
                  id="katpadi"
                  name="address"
                  value={"katpadi"}
                />
                <p>Katpadi, Tamil Nadu</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      {orderData.items &&
        orderData.items.map((item, index) => <Card key={index} item={item} />)}
      <p className="p-4">Total: {orderData.total} INR</p>
      <div className="p-4">
        <h1>Payment Method</h1>
        <div className="h-fit w-full p-4 rounded-lg border">
          <div className="flex items-center justify-between">
            <input type="radio" />
            <p>Cash On Delivery</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export const Card = ({ item }: { item: CartItem }) => {
  const [product, setProduct] = useState<Product | null>();
  useEffect(() => {
    getProductById(item.itemId).then((res) => {
      setProduct(res);
    });
  }, []);

  return (
    <div>
      {!product ? (
        <div className="space-y-4">
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
      ) : (
        <div className="backdrop-blur-md h-24 flex items-center justify-between gap-2 p-2 px-6">
          <div className="relative h-full w-fit">
            <Image
              src={
                product?.images[0] ||
                "https://th.bing.com/th/id/R.b6de7e7313a09af1786f0720e4e59c07?rik=dUwLUNOfP%2b7DeA&pid=ImgRaw&r=0"
              }
              alt="preview"
              height={50}
              width={50}
              className="bg-white/10 p-1 border border-gray-600 rounded-sm h-full aspect-square w-auto object-contain"
            />
          </div>
          <div className="w-fit mr-auto p-2 h-full">{product?.name}</div>

          <div className="h-full w-32 flex flex-col items-center justify-around p-2 gap-2">
            <div className="truncate line-clamp-1">
              {product?.price}.00 <span className="text-red-600">I</span>NR
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const Title = () => {
  return (
    <div className="w-full px-6 font-bold text-xl mt-8 mb-4 container text-white mx-auto">
      <span className="text-red-600">C </span>H E C K O U T
      <div className="flex w-full">
        <hr className="border-2 w-[15px]" />
        <hr className="border-2 w-full border-red-600" />
      </div>
    </div>
  );
};
