import { AsgardeoAuthException, useAuthContext } from "@asgardeo/auth-react";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { IoIosArrowForward } from "react-icons/io";
import Layout from "../../components/Layout";
import Loader from "../../components/Loader";
import { UserInfo } from "./types";

// Create our number formatter.
// const currency = new Intl.NumberFormat("en-US", {
//   style: "currency",
//   currency: "USD",
// });

const Marketing = () => {
  const { state, signIn, getDecodedIDPIDToken, httpRequest } = useAuthContext();
  const query = new URLSearchParams(useLocation().search);
  const [userInfo, setUserInfo] = useState<UserInfo>();
  const [isUserInfoLoading, setIsUserInfoLoading] = useState<boolean>(false);
  const [isUserInfoError, setIsUserInfoError] = useState<boolean>();
  const [mobileNumber, setMobileNumber] = useState<string>();
  const [isCategoryDropdownOpen, setIsCategoryDropdownOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string>();

  const categories = ["Broadband", "Fiber Connection", "Voice"];

  useEffect(() => {
    (async (): Promise<void> => {
      try {
        const now = Math.floor(Date.now() / 1000);
        const decodedIDtoken = await getDecodedIDPIDToken();
        const expiration = decodedIDtoken?.exp;
        if (now > expiration && !query.get("code")) {
          await signIn();
        }
      } catch (error) {
        if (
          (error as AsgardeoAuthException)?.code ===
            "SPA-AUTH_CLIENT-VM-IV02" &&
          !query.get("code")
        ) {
          await signIn();
        }
      }
    })();
  }, []);

  const retrieveInteractions = async () => {
    try {
      // setIsUserInfoLoading(true);
      // const res = await httpRequest({
      //   url: `https://42807e1f-07ba-4fb0-a6d2-ecc7b41dd143-dev.e1-us-east-azure.choreoapis.dev/yphf/user-interactions-api/1.0.0/interactions?email=${mobileNumber}`,
      // });
      // setUserInfo(res?.data);
      // setIsUserInfoLoading(false);
    } catch (error) {
      setIsUserInfoLoading(false);
      setIsUserInfoError(true);
    }
  };

  return (
    <>
      {state.isAuthenticated ? (
        <Layout>
          <div className="mt-3 mb-10">
            <div className="flex justify-between">
              <div>
                <div className="relative inline-block text-left w-58 mr-5">
                  <button
                    type="button"
                    className="inline-flex w-56 justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-100"
                    id="menu-button"
                    aria-expanded="true"
                    aria-haspopup="true"
                    onClick={() =>
                      setIsCategoryDropdownOpen(!isCategoryDropdownOpen)
                    }
                  >
                    {selectedCategory ?? "Select the category"}
                    <svg
                      className="-mr-1 ml-2 h-5 w-5"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      aria-hidden="true"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
                        clip-rule="evenodd"
                      />
                    </svg>
                  </button>

                  {isCategoryDropdownOpen && (
                    <div
                      className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
                      role="menu"
                      aria-orientation="vertical"
                      aria-labelledby="menu-button"
                    >
                      <div className="py-1" role="none">
                        <span
                          className="text-gray-700 block px-4 py-2 text-sm hover:bg-gray-100"
                          onClick={() => {
                            setIsCategoryDropdownOpen(false);
                            setSelectedCategory("Broadband");
                          }}
                        >
                          Broadband
                        </span>
                        <span className="text-gray-700 block px-4 py-2 text-sm hover:bg-gray-100">
                          Fiber Connection
                        </span>
                        <span className="text-gray-700 block px-4 py-2 text-sm hover:bg-gray-100">
                          Voice
                        </span>
                      </div>
                    </div>
                  )}
                </div>

                <button
                  className="text-white right-2.5 bottom-2.5 bg-primary focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                  onClick={retrieveInteractions}
                >
                  Search
                </button>
              </div>

              <button
                className="flex text-white right-2.5 bottom-2.5 bg-primary focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                onClick={retrieveInteractions}
              >
                Send Email <IoIosArrowForward size={20} />
              </button>
            </div>
          </div>

          <div className="flex flex-col">
            <div className="overflow-x-auto shadow-md sm:rounded-lg">
              <div className="inline-block min-w-full align-middle">
                <div className="overflow-hidden ">
                  <table className="min-w-full divide-y divide-gray-200 table-fixed dark:divide-gray-700">
                    <thead className="bg-gray-100 dark:bg-gray-700">
                      <tr>
                        <th scope="col" className="p-4">
                          <div className="flex items-center">
                            <input
                              id="checkbox-all"
                              type="checkbox"
                              className="w-4 h-4 text-blue-600 bg-gray-100 rounded border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                              // defaultChecked=is
                              onChange={(e) => console.log(e.target.value)}
                            />
                            <label className="sr-only">checkbox</label>
                          </div>
                        </th>
                        <th
                          scope="col"
                          className="py-3 px-6 text-xs font-medium tracking-wider text-left text-gray-700 uppercase dark:text-gray-400"
                        >
                          User Name
                        </th>
                        <th
                          scope="col"
                          className="py-3 px-6 text-xs font-medium tracking-wider text-left text-gray-700 uppercase dark:text-gray-400"
                        >
                          Email
                        </th>
                        <th
                          scope="col"
                          className="py-3 px-6 text-xs font-medium tracking-wider text-left text-gray-700 uppercase dark:text-gray-400"
                        >
                          City
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200 dark:bg-gray-800 dark:divide-gray-700">
                      <tr className="hover:bg-gray-100 dark:hover:bg-gray-700">
                        <td className="p-4 w-4">
                          <div className="flex items-center">
                            <input
                              id="checkbox-table-1"
                              type="checkbox"
                              className="w-4 h-4 text-blue-600 bg-gray-100 rounded border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                            />
                            <label className="sr-only">checkbox</label>
                          </div>
                        </td>
                        <td className="py-4 px-6 text-sm font-medium text-gray-900 whitespace-nowrap dark:text-white">
                          User 01
                        </td>
                        <td className="py-4 px-6 text-sm font-medium text-gray-500 whitespace-nowrap dark:text-white">
                          Email 01
                        </td>
                        <td className="py-4 px-6 text-sm font-medium text-gray-900 whitespace-nowrap dark:text-white">
                          City 01
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </Layout>
      ) : (
        <Loader />
      )}
    </>
  );
};

export default Marketing;
