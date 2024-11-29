import SideNav from "@/components/sidebar";
import Header from "@/components/ui/header";


// Global layout for the dashboard route
const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      {/* Render the SideNav component */}
   
      {/* Render the Header component */}
      <Header />

      {/* Render the children components within a div */}
      <div className="p-6">{children}</div>
    </>
  );
};

export default Layout;
