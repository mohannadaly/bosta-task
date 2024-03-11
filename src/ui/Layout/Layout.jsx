import { Outlet } from "react-router";
import Navbar from "./Navbar/Navbar";
import { useLocalization } from "../../context/LocalizationContext";

function Layout() {
  const {
    state: { currentLanguage },
  } = useLocalization();
  const rtlClass = currentLanguage === "ar" ? "rtl" : "";
  return (
    <div className={rtlClass} style={{ height: "50dvh" }}>
      <Navbar />
      <Outlet />
    </div>
  );
}

export default Layout;
