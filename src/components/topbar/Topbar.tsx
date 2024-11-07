import { Circle, Search, ShoppingBagIcon } from "lucide-react";
import Link from "next/link";

export default function Topbar() {
  return (
    <nav className="bg-black flex justify-between items-center backdrop-blur-sm text-white px-6 md:px-6 lg:px-8 border-b border-white h-14 fixed top-0 left-0 right-0 z-50">
      <Link href={"/"}>
        <Circle />
      </Link>
      <div className="relative flex-1 p-2 max-w-sm m-0 ">
        <input
          type="text"
          placeholder="Search products..."
          className="pl-10 rounded-2xl text-xs  backdrop-blur-sm bg-white/15 p-2 w-full"
        />
        <Search
          className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400"
          size={20}
        />
      </div>
      <Link href={"/cart"}>
        <ShoppingBagIcon />
      </Link>
    </nav>
  );
}
