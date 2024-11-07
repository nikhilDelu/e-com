import Sidebar from "./_components/Sidebar";
import Top from "./_components/Top";

export default function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className={`h-full w-full relative flex flex-col bg-black`}>
      <header>
        {" "}
        <Top />
      </header>
      <section className="relative h-screen w-full flex flex-row">
        <Sidebar />
        {children}
      </section>
    </main>
  );
}
