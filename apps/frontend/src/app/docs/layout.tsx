import { Sidebar } from "@/components/navigation/sidebar";
import Footer from "@/components/ui/footer";
import Header from "@/components/ui/header";

export default function Documents({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      {/* <Header /> */}
      <div className="flex items-start gap-14 px-3">
        <Sidebar />
        <div className="flex-1 md:flex-[6]">{children}</div>{" "}
      </div>
      <Footer />
    </>
  );
}
