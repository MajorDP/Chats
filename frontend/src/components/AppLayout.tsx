import { Outlet } from "react-router-dom";
import Navigation from "./Navigation";

function AppLayout() {
  return (
    <div className="flex flex-col-reverse md:flex-row">
      <Navigation />
      <Outlet />
    </div>
  );
}

export default AppLayout;
