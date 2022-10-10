import { RouteObject } from "react-router-dom";
import Dashboard from "../pages/dashboard";
import CustomerInfo from "../pages/customerInfo";
import Services from "../pages/services";
import FAQ from "../pages/faq";

export const config: RouteObject[] = [
  {
    path: "/",
    element: <Dashboard />,
  },
  {
    path: "/customer-info",
    element: <CustomerInfo />,
  },
  {
    path: "/services",
    element: <Services />,
  },
  {
    path: "/faq",
    element: <FAQ />,
  },
];
