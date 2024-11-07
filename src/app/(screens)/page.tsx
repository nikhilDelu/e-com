import Image from "next/image";
import "./style.css";
import { ChevronRight } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";

interface pageProps {}

const page = ({}: pageProps): JSX.Element => {
  return (
    <div className="h-full relative">
      <Image
        src="https://data1.ibtimes.co.in/cache-img-841-250/en/full/677364/1516440573_amazon-great-indian-sale-2018.png"
        alt="Banner"
        height={600}
        width={1800}
        className="home__image w-full -z-10 min-h-[30%] max-h-[40%] object-cover"
      />
      <Section className="backdrop-blur" title="Trending 🔥" to="/trending" />
      <Section title="All Products 🥗" to="/products" />
    </div>
  );
};

export default page;

// const Section_new = async () => {
//   const res = await axios.get("http://localhost:6969");
//   const products = res.data.data;
//   return (
//     <div className="bg-yellow-100 p-4 rounded-lg">
//       <h2 className="text-xl font-bold mb-4">
//         Trending Deals under 499 | Ends Oct 29
//       </h2>
//       <div className="flex overflow-x-auto space-x-4 pb-4">
//         {products.map((product: Product) => (
//           <div
//             key={product.id}
//             className="flex-none w-48 bg-white rounded-lg shadow-md"
//           >
//             <Image
//               src={product.images[0]}
//               alt={product.name}
//               width={200}
//               height={200}
//               className="w-full h-48 object-cover rounded-t-lg"
//             />
//             <div className="p-2">
//               <div className="flex justify-between items-center mb-1">
//                 <span className="text-red-600 font-bold">
//                   {product.price}% off
//                 </span>
//                 <span className="text-xs text-gray-500">{product.price}</span>
//               </div>
//               <div className="flex items-baseline mb-1">
//                 <span className="text-lg font-bold">₹{product.price}</span>
//                 <span className="text-xs text-gray-500 ml-1">
//                   M.R.P: ₹{product.price}
//                 </span>
//               </div>
//               <p className="text-sm text-gray-700 truncate">{product.name}</p>
//             </div>
//           </div>
//         ))}
//         <button className="flex items-center justify-center w-10 h-48 bg-white rounded-lg shadow-md">
//           <ChevronRight className="w-6 h-6 text-gray-400" />
//         </button>
//       </div>
//     </div>
//   );
// };

const Section = ({
  title,
  to,
  className,
}: {
  title: string;
  to: string;
  className?: string;
}) => {
  return (
    <div className="max-w-4xl mx-auto">
      <Link href={to} className="h-8 px-2 text-white">
        {title}
      </Link>
      <ScrollArea
        className={cn(
          className,
          "scroll-smooth w-full  whitespace-nowrap  relative h-48 backdrop-blur-lg mb-2 flex flex-col text-white font-bold"
        )}
      >
        <div className="flex space-x-4 relative w-full h-full">
          {[1, 2, 3, 4].map((index) => (
            <Card key={index} />
          ))}
        </div>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>
    </div>
  );
};

const Card = () => {
  return (
    <div className="h-full w-auto aspect-square overflow-hidden flex rounded-sm flex-col -rotate-90">
      <div className="bg-gray-100 h-full p-1">
        <Image
          src={
            "https://th.bing.com/th/id/OIP.--Bhv05grQ8eBnssITOZqgHaIt?w=160&h=189&c=7&r=0&o=5&dpr=1.5&pid=1.7"
          }
          alt="preview"
          height={300}
          width={150}
          className="h-full w-auto m-auto object-contain rotate-90"
        />
      </div>
      <div className="h-8 w-full bg-black relative flex items-center justify-between px-4 text-white font-mono font-extrabold border rounded-b-sm">
        <div className="">Nike</div>
        <div className="flex">
          <pre>₹ </pre>999
        </div>
      </div>
    </div>
  );
};
