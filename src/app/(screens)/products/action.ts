import { Product } from "@/lib/types";
import axios from "axios";

export default async function getProducts() {
  try {
    const res = await axios.get("http://localhost:6969/");

    if (res.data.status) {
      const products: Product[] = res.data.data;
      return products;
    }
    const products: Product[] = [];
    return products;
  } catch (error) {
    console.log("Error fetching products!🔺");
    const products: Product[] = [];
    return products;
  }
}
