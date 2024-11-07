"use server";
import { Product } from "@/lib/types";
import axios from "axios";
import { revalidatePath } from "next/cache";

export async function getCart({ userId }: { userId: string }) {
  try {
    const res = await axios.get(
      `http://localhost:6969/cart/get?userId=${userId}`
    );
    if (res.data.status) {
      return { status: true, data: res.data.data, error: null };
    }
    return { status: true, data: res.data.data, error: res.data.error };
  } catch (error) {
    return { status: true, data: null, error: error };
  }
}

export async function add({ itemId }: { itemId: string }) {
  try {
    const res = await axios.post(
      `http://localhost:6969/cart/add?itemId=${itemId}`,
      {
        userId: "yash",
      }
    );
    ("use server");
    revalidatePath("/cart");
  } catch (error) {}
}
export async function remove({ itemId }: { itemId: string }) {
  try {
    const res = await axios.post(
      `http://localhost:6969/cart/decrement?itemId=${itemId}`,
      {
        userId: "yash",
      }
    );
    ("use server");
    revalidatePath("/cart");
  } catch (error) {}
}

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
