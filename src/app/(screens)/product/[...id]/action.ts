"use server";
import { Product, variant } from "@/lib/types";
import axios from "axios";

export async function getProductById(id: string) {
  try {
    const res = await axios.get(`http://localhost:6969/getById?id=${id}`);
    if (res.data.status) {
      return res.data.data as Product;
    }
    // If no data, return a default empty product
    return {
      id: "",
      name: "",
      description: "",
      price: 0,
      category: "",
      stock: 0,
      images: [],
      variants: [],
    };
  } catch (error) {
    console.log("Error fetching product!🔺", error);
    // Return a default empty product on error
    return {
      id: "",
      name: "",
      description: "",
      price: 0,
      category: "",
      stock: 0,
      images: [],
      variants: [],
    };
  }
}

export async function addToCart({
  itemId,
  variant,
}: {
  itemId: string;
  variant: variant;
}) {
  try {
    const res = await axios.post(
      `http://localhost:6969/cart/add?itemId=${itemId}`,
      {
        userId: "yash",
        variant: variant,
      }
    );
    if (res.data.status) {
      return { status: true, error: null };
    }
    return { status: false, error: "Failed to add item to cart" };
  } catch (error) {
    console.log("Error adding to cart:", error);
    return {
      status: false,
      error: "Error adding product to cart",
    };
  }
}
