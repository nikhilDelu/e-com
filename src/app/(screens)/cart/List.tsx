"use client";
import { Cart, CartItem, Order, OrderItem, Product } from "@/lib/types";
import Image from "next/image";
import { add, getProductById, remove } from "./action";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { ArrowRight, Ellipsis } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { Skeleton } from "@/components/ui/skeleton";

const shipping = 90;

export default function List({ cart }: { cart: Cart }) {
  const [total, setTotal] = useState(0);
  const [orderItems, setOrderItems] = useState<OrderItem[]>([]);
  const [placed, setPlaced] = useState(false);
  const [order, setOrder] = useState<Order>({
    userId: "yash",
    items: [],
    total: 0,
    status: "step-1-pending",
    createdAt: new Date(),
    updatedAt: new Date(),
  });
  const router = useRouter();

  const updateOrder = () => {
    setOrder((prevOrder) => ({
      ...prevOrder,
      items: orderItems,
      total: total + shipping,
      createdAt: new Date(),
      updatedAt: new Date(),
    }));
  };

  useEffect(() => {
    updateOrder();
    if (orderItems.length > 0) {
      setPlaced(true);
    } else {
      setPlaced(false);
      localStorage.setItem("orderData", "{}");
    }
  }, [orderItems, total]);

  const placeOrder = () => {
    localStorage.setItem("orderData", JSON.stringify(order));
    router.push("/cart/checkout");
  };

  return (
    <div className="container mx-auto text-white flex flex-col min-h-full h-fit overflow-hidden gap-12">
      <div className="bg-white/10 text-sm text-wrap min-h-12 w-full text-white flex flex-col gap-2 p-8">
        <p>UserId: {order.userId} </p>

        <p>
          Items:[{" "}
          {orderItems &&
            orderItems.map((item, key) => (
              <div className="ml-14 my-4">
                <p> productId: {item.itemId}</p>
                <p> quantity: {item.quantity}</p>
                <p> price: {item.price}</p>
              </div>
            ))}
          ]
        </p>
        <p>Total: {total}</p>
      </div>
      <div className="min-h-full h-fit">
        <div className="h-full w-full">
          {cart?.items &&
            cart.items.map((item: CartItem, index) => (
              <>
                {
                  <Card
                    key={index}
                    setTotal={setTotal}
                    total={total}
                    item={item}
                    orderItems={orderItems}
                    setOrderItems={setOrderItems}
                    updateOrder={updateOrder}
                  />
                }
                <div className="px-6 mb-4 mt-4">
                  <hr className="border-gray-400" />
                </div>
              </>
            ))}
        </div>

        <div className="w-full min-h-40 h-56 mb-8">
          <PriceSection
            placeOrder={placeOrder}
            total={total}
            placed={placed}
            order={order}
          />
        </div>
      </div>
    </div>
  );
}

export const PriceSection = ({
  total,
  placed,
  placeOrder,
  order,
}: {
  total: number;
  placed: boolean;
  placeOrder: () => void;
  order: Order;
}) => {
  return (
    <div className="w-full h-full mx-auto p-4 space-y-8 bg-background text-foreground">
      <div className="space-y-2">
        <div className="flex items-center justify-between text-base">
          <span className="text-muted-foreground">Total</span>
          <span className="font-medium">{total} INR</span>
        </div>
        <Separator className="bg-border/50" />

        <div className="flex items-center justify-between text-base">
          <span className="text-muted-foreground">Shipping</span>
          <span className="text-muted-foreground">{shipping} INR</span>
        </div>
        <Separator className="bg-border/50" />

        <div className="flex items-center justify-between text-base">
          <span className="text-muted-foreground">Grand Total</span>
          <span className="font-medium">
            {total == 0 ? 0 : total + shipping} INR
          </span>
        </div>
        <Separator className="bg-border/50" />
      </div>

      <Button
        className="flex items-center justify-between w-full h-12 text-base mt-8 rounded-full bg-blue-700"
        size="lg"
        disabled={!placed}
        onClick={() => {
          placeOrder();
        }}
      >
        <span>Proceed to Checkout</span> <ArrowRight />
      </Button>
    </div>
  );
};

export const Card = ({
  item,
  setTotal,
  total,
  orderItems,
  setOrderItems,
  updateOrder,
}: {
  item: CartItem;
  setTotal: Dispatch<SetStateAction<number>>;
  total: number;
  orderItems: OrderItem[];
  setOrderItems: Dispatch<SetStateAction<OrderItem[]>>;
  updateOrder: () => void;
}) => {
  const [loading, setLoading] = useState(false);
  const [isChecked, setIsChecked] = useState(false);
  const [product, setProduct] = useState<Product | null>();
  useEffect(() => {
    getProductById(item.itemId).then((res) => {
      setProduct(res);
    });
  }, []);
  const checkControl = () => {
    const value = product?.price! * item.quantity;
    if (isChecked) {
      const updatedOrderItems = orderItems.filter(
        (orderItem) => orderItem.itemId !== item.itemId
      );
      setOrderItems(updatedOrderItems);
      setTotal(total - value);
    } else {
      setOrderItems([
        ...orderItems,
        {
          itemId: item.itemId,
          quantity: item.quantity,
          price: product?.price! * item.quantity,
          variant: {
            color: "",
            size: "",
          },
        },
      ]);
      setTotal(total + value);
    }
    updateOrder();
    setIsChecked(!isChecked);
  };
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
          <input
            type="checkbox"
            checked={isChecked}
            value={product?.price! * item.quantity}
            onChange={checkControl}
          />
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
            <div className="border rounded-full flex w-full h-10 overflow-hidden items-center justify-between">
              <button
                disabled={loading || isChecked}
                onClick={() => {
                  setLoading(true);
                  remove({ itemId: item.itemId }).then(() => {
                    setLoading(false);
                  });
                }}
                className={`${
                  loading && ""
                }+ hover:bg-white/20 active:bg-red-500 transition-all duration-500 w-full h-full`}
              >
                -
              </button>
              <span className="px-2">
                {loading ? <Ellipsis /> : <div>{item.quantity}</div>}
              </span>
              <button
                disabled={loading || isChecked}
                onClick={() => {
                  setLoading(true);
                  add({ itemId: item.itemId }).then(() => {
                    setLoading(false);
                  });
                }}
                className={`${
                  loading && ""
                }+ hover:bg-white/20 active:bg-red-500 transition-all duration-500 w-full h-full`}
              >
                +
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
