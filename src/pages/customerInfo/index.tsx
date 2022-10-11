import Layout from "../../components/Layout";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);

const data = {
  labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
  datasets: [
    {
      label: "My First Dataset",
        data: [300, 50, 100],
      backgroundColor: [
        "rgb(133, 105, 241)",
          "rgb(164, 101, 241)",
          "rgb(101, 143, 241)",
      ],
      hoverOffset: 4
    },
  ],
};

const CustomerInfo = () => {
  return (
    <Layout>
      <div className="flex flex-wrap">
        <div className="w-full md:w-1/2 lg:w-1/3 pr-4 pb-4">
          <div className="shadow-lg rounded-2xl p-4 bg-white dark:bg-gray-700 w-full">
            <div className="flex justify-between mb-6">
              <div className="flex items-center">
                <div className="flex flex-col">
                  <span className="font-bold text-lg text-black dark:text-white ml-2">
                    Customer Information
                  </span>
                  <span className="mt-4 text-sm text-gray-500 dark:text-white ml-2">
                    Mobile Number : +94772333371
                  </span>
                  <span className="mt-2 text-sm text-gray-500 dark:text-white ml-2">
                    Username : Yathindra Kodithuwakku
                  </span>
                </div>
              </div>
            </div>
            <div className="flex items-center justify-between mb-4 space-x-12"></div>
            <span className="w-20 px-2 py-1 flex items-center font-semibold text-xs rounded-md text-green-600 border border-green-600 bg-white">
              PREPAID
            </span>
          </div>
        </div>

        <div className="w-full max-w-full px-3 lg:w-1/3 lg:flex-none">
          <div className="shadow-lg rounded-2xl p-4 bg-white relative overflow-hidden">
            <p className="text-gray-800 text-lg font-medium mb-2">Billing</p>
            <div className="flex justify-between mt-4">
              <p className="text-sm text-gray-500 dark:text-white">
                Outstanding
              </p>
              <p className="text-primary text-sm font-medium">$399</p>
            </div>
            <div className="flex justify-between mt-2">
              <p className="text-sm text-gray-500 dark:text-white">
                Billing month
              </p>
              <p className="text-primary text-sm font-medium">October</p>
            </div>
            <div className="flex justify-between mt-2">
              <p className="text-sm text-gray-500 dark:text-white">Due Date</p>
              <p className="text-primary text-sm font-medium">30-11-2022</p>
            </div>
          </div>
        </div>

        <div className="w-full max-w-full px-3 lg:w-1/3 lg:flex-none">
          <div className="relative flex flex-col h-full min-w-0 break-words bg-white border-0 border-transparent border-solid shadow-xl dark:bg-slate-850 dark:shadow-dark-xl rounded-2xl bg-clip-border">
            <div className="p-4 pb-0 mb-0 border-b-0 border-b-solid rounded-t-2xl border-b-transparent">
              <div className="flex flex-wrap -mx-3">
                <div className="flex items-center flex-none w-1/2 max-w-full px-3">
                  <span className="font-bold text-lg text-black dark:text-white ml-2">
                    Invoices
                  </span>
                </div>
                {/* <div className="flex-none w-1/2 max-w-full px-3 text-right">
                  <button className="inline-block px-8 py-2 mb-0 text-xs font-bold leading-normal text-center text-blue-500 align-middle transition-all ease-in bg-transparent border border-blue-500 border-solid rounded-lg shadow-none cursor-pointer bg-150 active:opacity-85 hover:-translate-y-px tracking-tight-rem bg-x-25 hover:opacity-75">
                    View All
                  </button>
                </div> */}
              </div>
            </div>
            <div className="flex-auto p-4 pb-0">
              <ul className="flex flex-col pl-0 mb-0 rounded-lg">
                <li className="relative flex justify-between px-4 py-2 pl-0 mb-2 border-0 rounded-t-inherit text-inherit rounded-xl">
                  <div className="flex flex-col">
                    <h6 className="mb-1 text-sm font-semibold leading-normal dark:text-white text-slate-700">
                      March, 01, 2020
                    </h6>
                    <span className="text-xs leading-tight dark:text-white dark:opacity-80">
                      #MS-415646
                    </span>
                  </div>
                  <div className="flex items-center text-sm leading-normal dark:text-white/80">
                    $180
                  </div>
                </li>
                <li className="relative flex justify-between px-4 py-2 pl-0 mb-2 border-0 rounded-xl text-inherit">
                  <div className="flex flex-col">
                    <h6 className="mb-1 text-sm font-semibold leading-normal dark:text-white text-slate-700">
                      February, 10, 2021
                    </h6>
                    <span className="text-xs leading-tight dark:text-white dark:opacity-80">
                      #RV-126749
                    </span>
                  </div>
                  <div className="flex items-center text-sm leading-normal dark:text-white/80">
                    $250
                  </div>
                </li>
                <li className="relative flex justify-between px-4 py-2 pl-0 mb-2 border-0 rounded-xl text-inherit">
                  <div className="flex flex-col">
                    <h6 className="mb-1 text-sm font-semibold leading-normal dark:text-white text-slate-700">
                      April, 05, 2020
                    </h6>
                    <span className="text-xs leading-tight dark:text-white dark:opacity-80">
                      #FB-212562
                    </span>
                  </div>
                  <div className="flex items-center text-sm leading-normal dark:text-white/80">
                    $560
                  </div>
                </li>
                <li className="relative flex justify-between px-4 py-2 pl-0 mb-2 border-0 rounded-xl text-inherit">
                  <div className="flex flex-col">
                    <h6 className="mb-1 text-sm font-semibold leading-normal dark:text-white text-slate-700">
                      June, 25, 2019
                    </h6>
                    <span className="text-xs leading-tight dark:text-white dark:opacity-80">
                      #QW-103578
                    </span>
                  </div>
                  <div className="flex items-center text-sm leading-normal dark:text-white/80">
                    $120
                  </div>
                </li>
                <li className="relative flex justify-between px-4 py-2 pl-0 border-0 rounded-b-inherit rounded-xl text-inherit">
                  <div className="flex flex-col">
                    <h6 className="mb-1 text-sm font-semibold leading-normal dark:text-white text-slate-700">
                      March, 01, 2019
                    </h6>
                    <span className="text-xs leading-tight dark:text-white dark:opacity-80">
                      #AR-803481
                    </span>
                  </div>
                  <div className="flex items-center text-sm leading-normal dark:text-white/80">
                    $300
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="w-full max-w-full px-3 lg:w-1/3 lg:flex-none">
          <div className="shadow-lg rounded-2xl p-4 bg-white relative overflow-hidden">
            <p className="text-gray-800 text-lg font-medium mb-2">Usage</p>
            <Doughnut data={data} />
          </div>
        </div>

      </div>
    </Layout>
  );
};

export default CustomerInfo;
