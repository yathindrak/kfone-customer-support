import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";
import { AsgardeoAuthException, useAuthContext } from "@asgardeo/auth-react";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { FcCancel, FcOk } from "react-icons/fc";
import Layout from "../../components/Layout";
import Loader from "../../components/Loader";
import { UserInfo } from "./types";

ChartJS.register(ArcElement, Tooltip, Legend);

// Create our number formatter.
const currency = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
});

const CustomerInfo = () => {
  const { state, signIn, getDecodedIDPIDToken, httpRequest } = useAuthContext();
  const query = new URLSearchParams(useLocation().search);
  const [userInfo, setUserInfo] = useState<UserInfo>();
  const [isUserInfoLoading, setIsUserInfoLoading] = useState<boolean>(false);
  const [isUserInfoError, setIsUserInfoError] = useState<boolean>();
  const [mobileNumber, setMobileNumber] = useState<string>();

  const dataUsageData = {
    labels: ["Used", "Remaining"],
    datasets: [
      {
        label: "Data Usage",
        data: [
          userInfo?.subscriptionUsage?.mobileDataUsed,
          (userInfo?.subscriptionUsage?.subscription?.freeDataMB ?? 0) -
            (userInfo?.subscriptionUsage?.mobileDataUsed ?? 0),
        ],
        backgroundColor: ["rgb(230, 0, 0)", "rgb(101, 143, 241)"],
        hoverOffset: 4,
      },
    ],
  };

  const callUsageData = {
    labels: ["Used", "Remaining"],
    datasets: [
      {
        label: "Call Usage",
        data: [
          userInfo?.subscriptionUsage?.callMinutesUsed,
          (userInfo?.subscriptionUsage?.subscription?.freeCallMinutes ?? 0) -
            (userInfo?.subscriptionUsage?.callMinutesUsed ?? 0),
        ],
        backgroundColor: ["rgb(230, 0, 0)", "rgb(101, 143, 241)"],
        hoverOffset: 4,
      },
    ],
  };

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

  const retrieveUserInfo = async () => {
    try {
      setIsUserInfoLoading(true);
      const res = await httpRequest({
        url: `${process.env.REACT_APP_USER_INFO_ENDPOINT}/customer?mobile=${mobileNumber}`,
      });
      setUserInfo(res?.data);
      setIsUserInfoLoading(false);
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
            <label className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-gray-300">
              Search
            </label>

            <div className="relative">
              <div className="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
                <svg
                  aria-hidden="true"
                  className="w-5 h-5 text-gray-500 dark:text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  ></path>
                </svg>
              </div>
              <input
                type="search"
                id="default-search"
                className="block p-4 pl-10 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Search via mobile"
                onChange={(e) => setMobileNumber(e.target.value)}
                required
              />
              <button
                className="text-white absolute right-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                onClick={retrieveUserInfo}
              >
                {isUserInfoLoading && (
                  <svg
                    role="status"
                    className="inline mr-3 w-4 h-4 text-white animate-spin"
                    viewBox="0 0 100 101"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                      fill="#E5E7EB"
                    />
                    <path
                      d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                      fill="currentColor"
                    />
                  </svg>
                )}
                Search
              </button>
            </div>
          </div>

          <div className="flex flex-wrap">
            {isUserInfoLoading && (
              <div className="absolute right-1/2 bottom-1/2  transform translate-x-1/2 translate-y-1/2 ">
                <div className="border-t-transparent border-primary animate-spin  rounded-full border-blue-400 border-8 h-48 w-48"></div>
              </div>
            )}

            {isUserInfoError ? (
              <div
                className="bg-red-100 rounded-lg py-5 px-6 mb-3 text-base text-red-700 inline-flex items-center w-full"
                role="alert"
              >
                <svg
                  aria-hidden="true"
                  focusable="false"
                  data-prefix="fas"
                  data-icon="times-circle"
                  className="w-4 h-4 mr-2 fill-current"
                  role="img"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 512 512"
                >
                  <path
                    fill="currentColor"
                    d="M256 8C119 8 8 119 8 256s111 248 248 248 248-111 248-248S393 8 256 8zm121.6 313.1c4.7 4.7 4.7 12.3 0 17L338 377.6c-4.7 4.7-12.3 4.7-17 0L256 312l-65.1 65.6c-4.7 4.7-12.3 4.7-17 0L134.4 338c-4.7-4.7-4.7-12.3 0-17l65.6-65-65.6-65.1c-4.7-4.7-4.7-12.3 0-17l39.6-39.6c4.7-4.7 12.3-4.7 17 0l65 65.7 65.1-65.6c4.7-4.7 12.3-4.7 17 0l39.6 39.6c4.7 4.7 4.7 12.3 0 17L312 256l65.6 65.1z"
                  ></path>
                </svg>
                Invalid Home, Mobile or Coporate Connection
              </div>
            ) : userInfo ? (
              <>
                {userInfo?.connectionStatus && (
                  <div className="w-full md:w-1/2 lg:w-1/3 pr-4 pb-4">
                    <div className="shadow-lg rounded-lg p-4 bg-white dark:bg-gray-700 w-full">
                      <div className="flex justify-between mb-6">
                        <div className="flex items-center">
                          <div className="flex flex-col">
                            <span className="font-bold text-lg text-black dark:text-white ml-2">
                              Connection Status
                            </span>
                            {(userInfo?.connectionStatus?.status).toUpperCase() ===
                            "ACTIVE" ? (
                              <div className="rounded-lg border border-green-600 bg-white m-3 p-2 w-2/3">
                                <div className="flex m-auto">
                                  <p className="text-xl font-bold text-green-600 mr-1">
                                    Active
                                  </p>
                                  <FcOk size={25} />
                                </div>
                              </div>
                            ) : (
                              <div className="rounded-lg border border-red-600 bg-white m-3 p-2">
                                <div className="flex m-auto">
                                  <p className="text-xl font-bold text-red-600 mr-1">
                                    Inactive
                                  </p>
                                  <FcCancel size={25} />
                                </div>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {userInfo?.personalDetails && (
                  <div className="w-full md:w-1/2 lg:w-1/3 pr-4 pb-4">
                    <div className="shadow-lg rounded-lg p-4 bg-white dark:bg-gray-700 w-full">
                      <div className="flex justify-between mb-6">
                        <div className="flex items-center">
                          <div className="flex flex-col">
                            <span className="font-bold text-lg text-black dark:text-white ml-2">
                              Customer Information
                            </span>
                            {userInfo?.personalDetails?.phoneNumbers?.length >
                              0 && (
                              <span className="mt-4 text-sm text-gray-500 dark:text-white ml-2">
                                Mobile Number :{" "}
                                {
                                  userInfo?.personalDetails?.phoneNumbers[0]
                                    ?.value
                                }
                              </span>
                            )}
                            <span className="mt-2 text-sm text-gray-500 dark:text-white ml-2">
                              Name :{" "}
                              {`${userInfo?.personalDetails?.name?.givenName} ${userInfo?.personalDetails?.name?.familyName}`}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {userInfo?.billingData?.currentBillingCycle && (
                  <div className="w-full max-w-full mb-4 pr-3 lg:w-1/3 lg:flex-none">
                    <div className="shadow-lg rounded-lg p-4 bg-white relative overflow-hidden">
                      <p className="text-gray-800 text-lg font-medium mb-2">
                        Billing
                      </p>
                      <div className="flex justify-between mt-4">
                        <p className="text-sm text-gray-500 dark:text-white">
                          Outstanding
                        </p>
                        <p className="text-primary text-sm font-medium">
                          {currency.format(
                            userInfo?.billingData?.currentBillingCycle?.amount
                          )}
                        </p>
                      </div>
                      <div className="flex justify-between mt-2">
                        <p className="text-sm text-gray-500 dark:text-white">
                          Billing month
                        </p>
                        <p className="ext-gray-500 text-sm font-medium">
                          {userInfo?.billingData?.currentBillingCycle?.month}
                        </p>
                      </div>
                      <div className="flex justify-between mt-2">
                        <p className="text-sm text-gray-500 dark:text-white">
                          Due Date
                        </p>
                        <p className="ext-gray-500 text-sm font-medium">
                          {userInfo?.billingData?.currentBillingCycle?.due}
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                {userInfo?.subscriptionUsage?.mobileDataUsed && (
                  <div className="w-full md:w-1/2 lg:w-1/3 pr-4 pb-4">
                    <div className="shadow-lg rounded-lg p-4 bg-white relative overflow-hidden">
                      <p className="text-gray-800 text-lg font-bold mb-2">
                        Data Usage
                      </p>
                      <p className="text-gray-500 text-md font-base my-4">
                        <span className="font-medium">
                          {`${userInfo?.subscriptionUsage?.mobileDataUsed} MB`}
                        </span>{" "}
                        used of{" "}
                        <span className="font-medium">
                          {`${userInfo?.subscriptionUsage?.subscription?.freeDataMB} MB`}
                        </span>
                      </p>
                      <div className="px-16">
                        <Doughnut data={dataUsageData} />
                      </div>
                    </div>
                  </div>
                )}

                {userInfo?.subscriptionUsage?.callMinutesUsed && (
                  <div className="w-full md:w-1/2 lg:w-1/3 pr-4 pb-4">
                    <div className="shadow-lg rounded-lg p-4 bg-white relative overflow-hidden">
                      <p className="text-gray-800 text-lg font-bold mb-2">
                        Call Usage
                      </p>
                      <p className="text-gray-500 text-md font-base my-4">
                        <span className="font-medium">
                          {`${userInfo?.subscriptionUsage?.callMinutesUsed} MB`}
                        </span>{" "}
                        used of{" "}
                        <span className="font-medium">
                          {`${userInfo?.subscriptionUsage?.subscription?.freeCallMinutes} MB`}
                        </span>
                      </p>
                      <div className="px-16">
                        <Doughnut data={callUsageData} />
                      </div>
                    </div>
                  </div>
                )}

                {userInfo?.billingData?.pastBillingCycles?.length > 0 && (
                  <div className="w-full md:w-1/2 lg:w-1/3 pr-4 pb-4">
                    <div className="relative flex flex-col h-full min-w-0 break-words bg-white border-0 border-transparent border-solid shadow-xl dark:bg-slate-850 dark:shadow-dark-xl rounded-lg bg-clip-border">
                      <div className="p-4 pb-0 mb-0 border-b-0 border-b-solid rounded-t-2xl border-b-transparent">
                        <div className="flex flex-wrap -mx-3">
                          <div className="flex items-center flex-none w-1/2 max-w-full px-3">
                            <span className="font-bold text-lg text-black dark:text-white ml-2">
                              Billing History
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="flex-auto p-4 pb-0">
                        <ul className="flex flex-col pl-0 mb-0 rounded-lg">
                          {userInfo?.billingData?.pastBillingCycles?.map(
                            (billingRecord) => (
                              <li className="relative flex justify-between px-4 py-2 pl-0 mb-2 border-0 rounded-t-inherit text-inherit rounded-lg">
                                <div className="flex flex-col">
                                  <h6 className="mb-1 text-sm font-semibold leading-normal dark:text-white text-slate-700">
                                    {`${billingRecord?.month} / ${billingRecord?.year}`}
                                  </h6>
                                  <span className="text-xs leading-tight dark:text-white dark:opacity-80">
                                    {billingRecord?.status}
                                  </span>
                                </div>
                                <div className="flex items-center text-sm leading-normal dark:text-white/80">
                                  {currency.format(billingRecord?.amount)}
                                </div>
                              </li>
                            )
                          )}
                        </ul>
                      </div>
                    </div>
                  </div>
                )}
              </>
            ) : null}
          </div>
        </Layout>
      ) : (
        <Loader />
      )}
    </>
  );
};

export default CustomerInfo;
