import Nav from "@/components/nav/Nav";
import Topbar from "@/components/topbar/Topbar";

export default function ClientLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main
      className={`antialiased h-screen flex flex-col relative  text-black pt-14`}
    >
      <Topbar />
      <section className="h-full w-full">{children}</section>
    </main>
  );
}
