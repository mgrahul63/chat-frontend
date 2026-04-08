import { Outlet, useLocation } from "react-router-dom";
import { routeName } from "../action/routeActionName";
import Footer from "./Footer";
import Navbar from "./Navbar";

const Layout = () => {
  const pathName = useLocation();
  const path = pathName?.pathname.includes(routeName?.message);
  return (
    <>
      <Navbar />
      <main>
        <Outlet />{" "}
        {/* এখানে route অনুযায়ী পেজ রেন্ডার হবে | Here, according to the route page, will be rendered */}
      </main>
      {!path && <Footer />}
    </>
  );
};

export default Layout;
