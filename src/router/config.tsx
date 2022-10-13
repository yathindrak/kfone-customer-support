import { RouteObject } from "react-router-dom";
import Dashboard from "../pages/dashboard";
import CustomerInfo from "../pages/customerInfo";
import Cases from "../pages/cases";
import Marketing from "../pages/marketing";

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
    path: "/customers",
    element: <CustomerInfo />,
  },
  {
    path: "/marketing",
    element: <Marketing />,
  }
];
