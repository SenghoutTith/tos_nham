import { useState } from "react";
import Sidebar from "../adminComponents/Sidebar";
import ProductBoard from "../adminComponents/Productboard";
import DashBoard from "../adminComponents/Dashboard";
import Inbox from "../adminComponents/Inbox";

const AdminDashboard = () => {
  const [selectedComponent, setSelectedComponent] = useState("dashboard");

  const handleNavItemClick = (component) => {
    setSelectedComponent(component);
  };

  return (
      <>
        <Sidebar onNavItemClick={handleNavItemClick} />
        {selectedComponent === "dashboard" && <DashBoard />}
        {/* {selectedComponent === "users" && <UserManage />} */}
        {selectedComponent === "inbox" && <Inbox />}
        {selectedComponent === "products" && <ProductBoard />}
      </>
  );
};

export default AdminDashboard;