import { useState } from "react";
import Sidebar from "../admin_page/Sidebar.jsx";
import Payment from "./Payment.jsx";
import AllUsers from "./AllUsers.jsx";
import Customer from "./Customer.jsx";
import Merchant from "./Merchant.jsx";
import DeliveryMan from "./DeliveryMan.jsx";
import SuperDashboard from "./SuperDashboard.jsx";

const SuperAdminDashboard = () => {
  const [selectedComponent, setSelectedComponent] = useState("superdashboard");

  const handleNavItemClick = (component) => {
    setSelectedComponent(component);
  };

  return (
      <>
        <Sidebar onNavItemClick={handleNavItemClick} />
        {/* superadmin */}
        {selectedComponent === "superdashboard" && <SuperDashboard />}
        {selectedComponent === "payment" && <Payment />}
        {selectedComponent === "all-users" && <AllUsers />}
        {selectedComponent === "customer" && <Customer />}
        {selectedComponent === "merchant" && <Merchant />}
        {selectedComponent === "delivery-man" && <DeliveryMan />}
      </>
  );
};

export default SuperAdminDashboard