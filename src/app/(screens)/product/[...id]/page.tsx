"use client";

import { useParams } from "next/navigation";

export default function page() {
  const params = useParams<{ id: string }>();
  return <div>Product: {params.id}</div>;
}
