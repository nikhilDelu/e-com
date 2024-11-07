// "use client";
import { Circle } from "lucide-react";
// import { usePathname } from "next/navigation";

export default function Top() {
  //   const pathname = usePathname();
  //   const Header = pathname.split("/").pop() || "Dashboard";

  return (
    <nav className="bg-black text-white border border-t-0 border-x-0 w-full flex items-center py-3 lg:py-4 px-6 md:px-6 lg:px-8">
      <Circle />
      <h1 className="capitalize px-6 font-bold">{"Header"}</h1>
    </nav>
  );
}
