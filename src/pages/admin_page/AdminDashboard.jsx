import { useState } from "react";
import Sidebar from "./Sidebar.jsx";
import ProductBoard from "./ProductBoard.jsx";
import DashBoard from "./Dashboard.jsx";
import Inbox from "./Inbox.jsx";

const AdminDashboard = () => {
  const [selectedComponent, setSelectedComponent] = useState("dashboard");

  const handleNavItemClick = (component) => {
    setSelectedComponent(component);
  };

  return (
      <>
        <Sidebar onNavItemClick={handleNavItemClick} />
        {/* admin */}
        {selectedComponent === "dashboard" && <DashBoard />}
        {selectedComponent === "inbox" && <Inbox />}
        {selectedComponent === "products" && <ProductBoard />}

      </>
  );
};

export default AdminDashboard;