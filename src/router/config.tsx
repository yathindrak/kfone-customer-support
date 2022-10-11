import { RouteObject } from "react-router-dom";
import Dashboard from "../pages/dashboard";
import CustomerInfo from "../pages/customerInfo";
import Services from "../pages/services";
import FAQ from "../pages/faq";
import Cases from "../pages/cases";

export const config: RouteObject[] = [
  {
    path: "/",
    element: <Dashboard />,
  },
  {
    path: "/cases",
    element: <Cases />,
  },
  {
    path: "/customer-info",
    element: <CustomerInfo />,
  },
  // {
  //   path: "/services",
  //   element: <Services />,
  // }
];
