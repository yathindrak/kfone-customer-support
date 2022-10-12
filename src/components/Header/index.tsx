import { useState } from "react";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);

  const getTimeOfDay = () => {
    const date = new Date();
    const hours = date.getHours();
    let timeOfDay = "";

    if (hours < 12) {
      timeOfDay = "Morning";
    } else if (hours < 18) {
      timeOfDay = "Afternoon";
    } else {
      timeOfDay = "Evening";
    }

    return timeOfDay;
  };

  return (
    <header className="fixed mt-4 m-auto ml-3 xl:ml-5 w-11/12 xl:w-3/4 shadow-lg bg-white dark:bg-gray-700 items-center h-16 rounded-lg z-20">
      <div className="flex h-full px-3">
        <div className="justify-between items-center pl-2 flex w-full lg:max-w-68 sm:pr-2 sm:ml-0">
          <h1 className="text-xl font-semibold text-slate-700">
            Good {getTimeOfDay()}, Yathindra
          </h1>

          <div className="relative">
            <button
              id="dropdownDefault"
              data-dropdown-toggle="dropdown"
              onClick={() => setIsOpen(!isOpen)}
            >
              {/* <img
                alt="profil"
                src="/favicon.ico"
                className="mx-auto object-cover rounded-full h-10 w-10 "
              /> */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="45px"
                height="45px"
                viewBox="0 0 64 64"
                version="1.1"
              >
                <circle
                  fill="#E60000"
                  width="64"
                  height="64"
                  cx="32"
                  cy="32"
                  r="32"
                />
                <text
                  x="50%"
                  y="50%"
                  style={{
                    color: "#ffffff",
                    lineHeight: "1",
                  }}
                  alignment-baseline="middle"
                  text-anchor="middle"
                  font-size="26"
                  font-weight="400"
                  dy=".1em"
                  dominant-baseline="middle"
                  fill="#ffffff"
                >
                  YK
                </text>
              </svg>
            </button>

            {isOpen && (
              <div
                id="dropdown"
                className=" absolute right-1 z-10 w-44 bg-white rounded-lg divide-y divide-gray-100 shadow dark:bg-gray-700"
              >
                <ul
                  className="py-1 text-sm text-gray-700 dark:text-gray-200"
                  aria-labelledby="dropdownDefault"
                >
                  <li>
                    <a
                      href="#"
                      className="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                    >
                      Sign out
                    </a>
                  </li>
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
