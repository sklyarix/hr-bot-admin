import { routes } from "../../helpers/routes.data.tsx";

const Sidebar = () => {
  const sidebarRoutes = routes.filter((route) => route.sidebar);
  return (
    <aside className="fixed top-0 left-0 px-5 w-[300px] h-screen border-r border-gray-200 bg-white text-gray-900 dark:bg-gray-900 dark:border-gray-800">
      <div className="py-8 flex justify-start">
        <a href="/">
          <svg
            width="50"
            height="50"
            fill="none"
            viewBox="0 0 398 398"
            className="dark:fill-white fill-black"
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              <clipPath id="clip570_22">
                <rect width="398" height="398" />
              </clipPath>
            </defs>
            <g clipPath="url(#clip570_22)">
              <path d="M342.21 0L398 55.78L398 398L318.34 398L318.34 135.44L135.44 318.34L238.68 318.34L238.68 398L56.62 398L56.62 397.16L55.78 398L0 342.21L342.21 0Z" />
            </g>
          </svg>
        </a>
      </div>
      <div className="flex flex-col">
        <h2 className="mb-5">Меню</h2>
        {sidebarRoutes &&
          sidebarRoutes.map((route) => (
            <nav>
              <ul className="flex flex-col gap-4">
                <li>
                  <a
                    className="p-2 flex items-center gap-4 rounded-lg text-md text-gray-700 font-bold hover:bg-gray-100"
                    data-discover="true"
                    href={route.path}
                  >
                    <span className="w-6">
                      <svg
                        fill="none"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          clip-rule="evenodd"
                          d="M12 3.5C7.30558 3.5 3.5 7.30558 3.5 12C3.5 14.1526 4.3002 16.1184 5.61936 17.616C6.17279 15.3096 8.24852 13.5955 10.7246 13.5955H13.2746C15.7509 13.5955 17.8268 15.31 18.38 17.6167C19.6996 16.119 20.5 14.153 20.5 12C20.5 7.30558 16.6944 3.5 12 3.5ZM17.0246 18.8566V18.8455C17.0246 16.7744 15.3457 15.0955 13.2746 15.0955H10.7246C8.65354 15.0955 6.97461 16.7744 6.97461 18.8455V18.856C8.38223 19.8895 10.1198 20.5 12 20.5C13.8798 20.5 15.6171 19.8898 17.0246 18.8566ZM2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12ZM11.9991 7.25C10.8847 7.25 9.98126 8.15342 9.98126 9.26784C9.98126 10.3823 10.8847 11.2857 11.9991 11.2857C13.1135 11.2857 14.0169 10.3823 14.0169 9.26784C14.0169 8.15342 13.1135 7.25 11.9991 7.25ZM8.48126 9.26784C8.48126 7.32499 10.0563 5.75 11.9991 5.75C13.9419 5.75 15.5169 7.32499 15.5169 9.26784C15.5169 11.2107 13.9419 12.7857 11.9991 12.7857C10.0563 12.7857 8.48126 11.2107 8.48126 9.26784Z"
                          fill="currentColor"
                          fill-rule="evenodd"
                        ></path>
                      </svg>
                    </span>
                    <span>{route.name}</span>
                  </a>
                </li>
              </ul>
            </nav>
          ))}
      </div>
    </aside>
  );
};
export default Sidebar;
/**/
