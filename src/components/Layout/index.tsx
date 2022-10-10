import SideBar from "../../components/SideBar";

const Layout = ({ children }: any) => {
  return (
    <div className="font-body text-base font-normal dark:bg-slate-900 bg-gray-50 text-slate-500">
      <SideBar />
      <div className="xl:ml-72 xl:mt-10">{children}</div>
    </div>
  );
};

export default Layout;
