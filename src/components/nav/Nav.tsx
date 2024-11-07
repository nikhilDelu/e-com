import Link from "next/link";

const Nav = () => {
  return (
    <div className="flex items-center border-b mb-2 w-full max-w-xl mx-auto lg:border-x sm:border-x md:border-x md:rounded-bl-sm lg:rounded-bl-sm md:rounded-br-sm lg:rounded-br-sm relative border-x-0">
      <Link
        href={"/"}
        className="w-full border-r text-center text-sm cursor-pointer hover:bg-white/30 pb-1 "
      >
        Home
      </Link>

      <Link
        href={"/orders"}
        className="w-full border-r text-center text-sm cursor-pointer hover:bg-white/30 pb-1"
      >
        Orders
      </Link>
      <Link
        href={"/account"}
        className="w-full text-center text-sm  cursor-pointer hover:bg-white/30 pb-1"
      >
        Account
      </Link>
    </div>
  );
};

export default Nav;
