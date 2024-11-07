import Topbar from "@/components/topbar/Topbar";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`antialiased h-screen flex flex-col`}>
        <Topbar />
        <main className="h-full">{children}</main>
      </body>
    </html>
  );
}
