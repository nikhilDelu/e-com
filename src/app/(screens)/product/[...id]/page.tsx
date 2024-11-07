"use client";
import { useEffect, useState } from "react";
import { Star, ShoppingCart, Heart, Share2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import Image from "next/image";
import { Product } from ".././../../../lib/types";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import { addToCart, getProductById } from "./action";
import ProductPageSkeleton from "./ProductDetailsSkeleton";
import axios from "axios";

export default function ProductPage() {
  const params = useParams<{ id: string }>();
  const [product, setProduct] = useState<Product | null>();
  const [currentUrl, setCurrentUrl] = useState<string>("");
  const router = useRouter();
  const useSParams = useSearchParams();
  const [products, setProducts] = useState<Product[] | null>();

  useEffect(() => {
    const fetchProducts = () => {
      getProductById(params.id).then((response: Product) => {
        setProduct(response);
        setCurrentUrl(response.images[0]);
        router.push(
          `?size=${response.variants[0].size.toString()}&color=${response.variants[0].color.replace(
            "#",
            ""
          )}`
        );
      });
      axios.get("http://localhost:6969").then((res) => {
        setProducts(res.data.data);
      });
    };
    fetchProducts();
  }, []);

  const handleCopyToClipboard = () => {
    const url = window.location.href;
    navigator.clipboard.writeText(url).then(
      () => {
        console.log("URL copied to clipboard: ", url);
      },
      (err) => {
        console.error("Failed to copy URL: ", err);
      }
    );
  };

  if (!product) {
    return <ProductPageSkeleton />;
  }

  return (
    <div className="bg-white text-black">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-4 border border-gray-100 rounded-sm">
          {/* Product Images */}
          <div className="space-y-4 ">
            <div className="aspect-square overflow-hidden bg-gray-100 rounded-lg p-4 ">
              <Image
                width={400}
                height={400}
                src={currentUrl || ""}
                alt="Main product image"
                className="object-contain w-full h-full"
              />
            </div>
            <ScrollArea className="scroll-smooth w-full whitespace-nowrap rounded-lg">
              <div className="flex space-x-4">
                {product &&
                  product.images.map((url) => (
                    <Image
                      onClick={() => setCurrentUrl(url)}
                      width={100}
                      height={100}
                      key={url}
                      src={url}
                      alt={`Product image ${url}`}
                      className="p-2 cursor-pointer aspect-square lg:w-[150px] w-[80px] rounded-lg object-contain bg-[#dddddd]"
                    />
                  ))}
              </div>
              <ScrollBar orientation="horizontal" />
            </ScrollArea>
          </div>

          {/* Product Details */}
          <div className="space-y-6 p-4">
            <div>
              <h1 className="text-3xl font-bold">{product?.name}</h1>
              <p className="text-xl font-semibold mt-2">${product?.price}</p>
            </div>

            <div className="flex items-center space-x-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star key={star} className="w-5 h-5 fill-primary" />
              ))}
              <span className="text-sm text-muted-foreground">
                (128 reviews)
              </span>
            </div>

            <div>
              <h2 className="text-lg font-semibold mb-2">Selected</h2>
              <Placeholder
                color={`#${useSParams.get("color")}`}
                size={`${useSParams.get("size")}`}
              />

              <div className="flex space-x-4">
                {product?.variants.map((variant, index) => (
                  <div key={index}>
                    <label
                      onClick={() => {
                        router.push(
                          `?size=${variant.size}&color=${variant.color.replace(
                            "#",
                            ""
                          )}`,
                          { scroll: false }
                        );
                      }}
                      style={{
                        color:
                          `#${useSParams.get("color")}`
                            ?.toString()
                            .toString() == variant.color.toString() &&
                          useSParams
                            .get("size")
                            ?.toString()
                            .toLocaleLowerCase() ==
                            variant.size.toString().toLowerCase()
                            ? "black"
                            : "white",
                        backgroundColor:
                          `#${useSParams.get("color")}`?.toString() ==
                            variant.color.toString() &&
                          useSParams.get("size") == variant.size
                            ? "white"
                            : variant.color,
                      }}
                      className="cursor-pointer p-1 text-sm w-16 rounded-sm flex items-center justify-around border peer-data-[state=checked]:text-black border-white"
                    >
                      <div
                        style={{
                          backgroundColor: `${variant.color}`,
                        }}
                        className="h-4 border rounded-[2px] aspect-square "
                      />
                      <p>{variant.size.toUpperCase()}</p>
                    </label>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex space-x-4">
              <Button
                onClick={() => {
                  addToCart({
                    itemId: params.id,
                    variant: {
                      color: useSParams.get("color")!,
                      size: useSParams.get("size")!,
                    },
                  });
                }}
                className="flex-1"
              >
                <ShoppingCart className="mr-2 h-5 w-5" /> Add to Cart
              </Button>
              <Button variant="outline" size="icon">
                <Heart className="h-5 w-5" />
              </Button>
              <Button
                onClick={handleCopyToClipboard}
                variant="outline"
                size="icon"
              >
                <Share2 className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>
        <DetailTabs product={product} />
        {products && <RelatedProducts products={products} />}
      </div>
    </div>
  );
}

const DetailTabs = ({ product }: { product: Product }) => {
  return (
    <Tabs defaultValue="description" className="w-full">
      <TabsList className="w-full mt-2">
        <TabsTrigger className="w-full" value="description">
          Description
        </TabsTrigger>
        <TabsTrigger className="w-full" value="details">
          Details
        </TabsTrigger>
        <TabsTrigger className="w-full" value="delivery">
          Delivery
        </TabsTrigger>
      </TabsList>
      <TabsContent
        value="description"
        className="text-sm text-muted-foreground"
      >
        {product?.description}
      </TabsContent>
      <TabsContent value="details" className="text-sm text-muted-foreground">
        <ul className="list-disc list-inside">
          <li>Material: 100% Cotton</li>
          <li>Care: Machine wash cold, tumble dry low</li>
          <li>Made in: Italy</li>
          <li>Style: A-line</li>
          <li>Length: Midi</li>
        </ul>
      </TabsContent>
      <TabsContent value="delivery" className="text-sm text-muted-foreground">
        Free standard delivery on orders over $50. Express delivery available at
        checkout. Free returns within 30 days.
      </TabsContent>
    </Tabs>
  );
};

const RelatedProducts = ({ products }: { products: Product[] }) => {
  return (
    <div className="mt-16">
      <h2 className="text-2xl font-bold mb-4">You May Also Like</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 overflow-hidden">
        {products.map((product, index) => (
          <div key={index} className="group border rounded-lg">
            <div className="aspect-square p-2 overflow-hidden bg-gray-100">
              <Image
                width={200}
                height={200}
                src={product.images[0]}
                alt={`Related item preview`}
                className="object-contain w-auto aspect-square h-full group-hover:scale-105 transition-transform duration-300"
              />
            </div>
            <div className="p-2">
              <h3 className="mt-2 text-sm font-medium">{product.name}</h3>
              <p className="mt-1 text-sm text-muted-foreground">
                ${product.price}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const Placeholder = ({ color, size }: { color: string; size: string }) => {
  return (
    <div className="flex justify-between rounded-sm border p-1 mb-2">
      <div
        style={{
          backgroundColor: color,
        }}
        className={`aspect-square min-h-6`}
      />
      <div className="aspect-square h-6 rounded-sm border flex items-center justify-center w-auto">
        {size}
      </div>
    </div>
  );
};
