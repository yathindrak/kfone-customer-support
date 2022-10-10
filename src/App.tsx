import SideBar from "./components/SideBar";
import "./App.css";

const App = () => {
  return (
    <div className="font-body text-base font-normal dark:bg-slate-900 bg-gray-50 text-slate-500">
      <div className="absolute w-full bg-blue-500 h-80" />

      <SideBar />
    </div>
  );
};

export default App;
