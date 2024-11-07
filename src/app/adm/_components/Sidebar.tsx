import {
  ChevronsRight,
  Edit,
  Grid,
  Home,
  LogOut,
  PenLine,
  PersonStanding,
} from "lucide-react";
import Link from "next/link";

export default function Sidebar() {
  return (
    <aside className="bg-black text-white w-16 sm:w-16 md:w-28 lg:w-48 border border-y-0   border-l-0 transition-all duration-700 min-h-full flex flex-col py-4 px-4 md:px-6 lg:px-8">
      <div className="h-full flex flex-col items-start  gap-8 mt-6">
        <Link
          href={"/adm/"}
          className="rounded-lg p-1 w-full flex justify-between items-center"
        >
          {" "}
          <Home />
          <div className="opacity-0 w-0 h-0 lg:opacity-100 lg:w-fit lg:h-fit">
            Home
          </div>
        </Link>
        <Link
          href={"/adm/add"}
          className="rounded-lg p-1 w-full flex justify-between items-center"
        >
          {" "}
          <Edit />
          <div className="opacity-0 w-0 h-0 lg:opacity-100 lg:w-fit lg:h-fit">
            Add
          </div>
        </Link>
        <div className="rounded-lg p-1 w-full flex justify-between items-center">
          <Grid />
          <div className="opacity-0 w-0 h-0 lg:opacity-100 lg:w-fit lg:h-fit">
            Grid
          </div>
        </div>

        <div className="rounded-lg p-1 w-full flex justify-between items-center">
          <PersonStanding />
          <div className="opacity-0 w-0 h-0 lg:opacity-100 lg:w-fit lg:h-fit">
            Account
          </div>
        </div>
      </div>
      <div className="flex items-center justify-start">
        <LogOut />
      </div>
    </aside>
  );
}
