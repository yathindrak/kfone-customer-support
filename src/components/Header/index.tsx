const Header = () => {
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
    <header className="fixed mt-4 m-auto ml-3 w-11/12 xl:w-3/4 shadow-lg bg-white dark:bg-gray-700 items-center h-16 rounded-2xl z-20">
      <div className="flex h-full px-3">
        <div className="justify-between items-center pl-2 flex w-full lg:max-w-68 sm:pr-2 sm:ml-0">
          <h1 className="text-xl font-semibold text-slate-700">
            Good {getTimeOfDay()}, Yathindra
          </h1>
          <a href="#">
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
          </a>
        </div>
      </div>
    </header>
  );
};

export default Header;
