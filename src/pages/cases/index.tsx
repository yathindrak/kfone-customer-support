import { AsgardeoAuthException, useAuthContext } from "@asgardeo/auth-react";
import { MutableRefObject, useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import Layout from "../../components/Layout";
import Loader from "../../components/Loader";

const cases = [
  {
    id: "#CASE01",
    description: "Move sim card to an e-sim",
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
  const { state, signIn, getDecodedIDPIDToken } = useAuthContext();
  const reRenderCheckRef: MutableRefObject<boolean> = useRef(false);
  const query = new URLSearchParams(useLocation().search);

  useEffect(() => {
    reRenderCheckRef.current = true;

    (async (): Promise<void> => {
      try {
        const now = Math.floor(Date.now() / 1000);
        const decodedIDtoken = await getDecodedIDPIDToken();
        const expiration = decodedIDtoken?.exp;
        if (now > expiration && !query.get("code")){
          await signIn();
        }
      } catch (error) {
        if (
          (error as AsgardeoAuthException)?.code === "SPA-AUTH_CLIENT-VM-IV02" &&  !query.get("code")
        ) {
          await signIn();
        }
      }
    })();
  }, []);

  return (
    <>
      {state.isAuthenticated ? (
        <Layout>
          <div className="flex flex-wrap">
            {cases.map((item) => (
              <div className="w-full md:w-1/2 lg:w-1/4 pr-4 pb-4">
                <div className="shadow-lg rounded-lg p-4 bg-white dark:bg-gray-700 w-full">
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
                      <span className="px-2 py-1 flex items-center font-semibold text-xs rounded-lg text-gray-500 bg-gray-200">
                        PROGRESS
                      </span>
                    ) : (
                      <span className="px-2 py-1 flex items-center font-semibold text-xs rounded-lg text-green-700 bg-green-50">
                        COMPLETED
                      </span>
                    )}

                    {item?.priority === "MEDIUM" ? (
                      <span className="px-2 py-1 flex items-center font-semibold text-xs rounded-lg text-green-600 border border-green-600 bg-white">
                        MEDIUM
                      </span>
                    ) : (
                      <span className="px-2 py-1 flex items-center font-semibold text-xs rounded-lg text-red-400 border border-red-400  bg-white">
                        HIGH
                      </span>
                    )}
                  </div>
                  <span className="px-2 py-1 flex w-36 mt-4 items-center text-xs rounded-lg font-semibold text-yellow-500 bg-yellow-100">
                    DUE DATE : {item?.dueDate}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </Layout>
      ) : (
        <Loader />
      )}
    </>
  );
};

export default Cases;
