import Layout from "../../components/Layout";

const cases = [
  {
    id: "#CASE01",
    description: "Move sim card to e-sim",
    isInProgress: true,
    priority: "MEDIUM",
    dueDate: "22 NOV",
  },
  {
    id: "#CASE02",
    description: "Support unsubscribe on VAS",
    isInProgress: true,
    priority: "MEDIUM",
    dueDate: "23 NOV",
  },
  {
    id: "#CASE03",
    description: "Loyalty points are not transferable",
    isInProgress: true,
    priority: "MEDIUM",
    dueDate: "15 NOV",
  },
  {
    id: "#CASE04",
    description: "WIFI Router is not switched on",
    isInProgress: false,
    priority: "MEDIUM",
    dueDate: "20 OCT",
  },
  {
    id: "#CASE05",
    description: "Internet issue when a power outage occurs",
    isInProgress: false,
    priority: "HIGH",
    dueDate: "20 OCT",
  },
];

const Cases = () => {
  return (
    <Layout>
      <div className="flex flex-wrap">
        {cases.map((item) => (
          <div className="w-full md:w-1/2 lg:w-1/4 pr-4 pb-4">
            <div className="shadow-lg rounded-2xl p-4 bg-white dark:bg-gray-700 w-full">
              <div className="flex justify-between mb-6">
                <div className="flex items-center">
                  <div className="flex flex-col">
                    <span className="font-bold text-md text-black dark:text-white ml-2">
                      {item?.id}
                    </span>
                    <span className="text-sm text-gray-500 dark:text-white ml-2">
                      {item?.description}
                    </span>
                  </div>
                </div>
              </div>
              <div className="flex items-center justify-between mb-4 space-x-12">
                {item?.isInProgress ? (
                  <span className="px-2 py-1 flex items-center font-semibold text-xs rounded-md text-gray-500 bg-gray-200">
                    PROGRESS
                  </span>
                ) : (
                  <span className="px-2 py-1 flex items-center font-semibold text-xs rounded-md text-green-700 bg-green-50">
                    COMPLETED
                  </span>
                )}

                {item?.priority === "MEDIUM" ? (
                  <span className="px-2 py-1 flex items-center font-semibold text-xs rounded-md text-green-600 border border-green-600 bg-white">
                    MEDIUM PRIORITY
                  </span>
                ) : (
                  <span className="px-2 py-1 flex items-center font-semibold text-xs rounded-md text-red-400 border border-red-400  bg-white">
                    HIGH PRIORITY
                  </span>
                )}
              </div>
              <span className="px-2 py-1 flex w-36 mt-4 items-center text-xs rounded-md font-semibold text-yellow-500 bg-yellow-100">
                DUE DATE : {item?.dueDate}
              </span>
            </div>
          </div>
        ))}
      </div>
    </Layout>
  );
};

export default Cases;
