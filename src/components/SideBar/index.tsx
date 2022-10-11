import { GiCrossedAirFlows } from "react-icons/gi";
import {
  FcComboChart,
  FcCustomerSupport,
  FcViewDetails,
  FcServices
} from "react-icons/fc";
import SideBarMenuItem from "../SideBarMenuItem";

const menuItems = [
  { name: "Dashboard", icon: <FcComboChart size={20} />, url: "/" },
  { name: "Cases", icon: <FcViewDetails size={20} />, url: "/cases" },
  {
    name: "Connections",
    icon: <FcCustomerSupport size={20} />,
    url: "/customer-info",
  },
  // { name: "Services", icon: <FcServices size={20} />, url: "/services" },
];

const SideBar = () => {
  return (
    <div
      className="w-64 fixed inset-y-0 antialiased transition-transform duration-200 -translate-x-full xl:translate-x-0 bg-white shadow-xl dark:shadow-none dark:bg-slate-850 z-990"
      aria-expanded="false"
    >
      <div className="p-6 text-left text-md dark:text-white text-slate-700">
        <h1 className="flex items-center w-full text-primary text-4xl font-title">
          <>
            <GiCrossedAirFlows size={40} />
            <div className="ml-2">Kfone</div>
          </>
        </h1>
      </div>

      <hr />

      <ul className="flex flex-col">
        {menuItems.map((menuItem) => (
          <SideBarMenuItem menuItem={menuItem} />
        ))}
      </ul>
    </div>
  );
};

export default SideBar;
