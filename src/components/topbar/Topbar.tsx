import React from "react";

export default function Topbar() {
  return (
    <nav className="flex justify-between items-center bg-black text-white p-4 py-6 border-b-gray-800 border-b-1">
      <div className="size-7 text-center aspect-square border border-gray-600 rounded-lg cursor-pointer">
        L
      </div>
      <div>Store</div>
      <div className="size-7 text-center aspect-square border border-gray-600 rounded-lg cursor-pointer">
        C
      </div>
    </nav>
  );
}
