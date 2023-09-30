import { Collapse, Ripple, initTE } from "tw-elements";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import tokenUtil from "../utils/token";
import { useAtom } from "jotai";
import { userAtom, devAtom, devAPIAtom } from "../state";

function Navbar() {
  const [user, setUser] = useAtom(userAtom);
  useEffect(() => {
    initTE({ Collapse, Ripple });
  }, []);

  const navigate = useNavigate();
  const handleLogout = () => {
    // delete token util
    tokenUtil.logout();
    // delete user state
    setUser(null);
    navigate("/");
  };

  const handleNavigateToHome = () => {
    navigate("/");
  };
  const handleNavigateToFeed = () => {
    navigate("/feed");
  };
  const handleNavigateToPost = () => {
    navigate("/post");
  };
  // TODO: add dashboard page
  // const handleNavigateToDashboard = () => {
  //   navigate("/dashboard");
  // };

  // Dev only
  const [dev] = useAtom(devAtom);
  const [devAPI, setDevAPI] = useAtom(devAPIAtom);
  const switchAPI = () => {
    setDevAPI(!devAPI);
  };

  return (
    /* Main navigation container */
    <nav
      className="flex-no-wrap relative flex w-full items-center justify-between bg-[#FBFBFB] py-2 shadow-md shadow-black/5 dark:bg-neutral-600 dark:shadow-black/10 lg:flex-wrap lg:justify-start lg:py-4"
      data-te-navbar-ref
      data-testid="navbar"
    >
      <div className="flex w-full flex-wrap items-center justify-between px-3">
        {/* Hamburger button for mobile view */}
        <button
          className="block border-0 bg-transparent px-2 text-neutral-500 hover:no-underline hover:shadow-none focus:no-underline focus:shadow-none focus:outline-none focus:ring-0 dark:text-neutral-200 lg:hidden"
          type="button"
          data-te-collapse-init
          data-te-target="#navbarSupportedContent1"
          aria-controls="navbarSupportedContent1"
          aria-expanded="false"
          aria-label="Toggle navigation"
          data-testid="nav-hamburger-button"
        >
          {/* Hamburger icon */}
          <span className="[&>svg]:w-7">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="h-7 w-7"
            >
              <path
                fillRule="evenodd"
                d="M3 6.75A.75.75 0 013.75 6h16.5a.75.75 0 010 1.5H3.75A.75.75 0 013 6.75zM3 12a.75.75 0 01.75-.75h16.5a.75.75 0 010 1.5H3.75A.75.75 0 013 12zm0 5.25a.75.75 0 01.75-.75h16.5a.75.75 0 010 1.5H3.75a.75.75 0 01-.75-.75z"
                clipRule="evenodd"
              />
            </svg>
          </span>
        </button>

        {/* Collapsible navigation container */}
        <div
          className="!visible hidden flex-grow basis-[100%] items-center lg:!flex lg:basis-auto"
          id="navbarSupportedContent1"
          data-te-collapse-item
        >
          {/* Logo */}
          {/* <a
            className="mb-4 ml-2 mr-5 mt-3 flex items-center text-neutral-900 hover:text-neutral-900 focus:text-neutral-900 dark:text-neutral-200 dark:hover:text-neutral-400 dark:focus:text-neutral-400 lg:mb-0 lg:mt-0"
            href="#"
          >
            <img
              src="https://tecdn.b-cdn.net/img/logo/te-transparent-noshadows.webp"
              style="height: 15px"
              alt="TE Logo"
              loading="lazy"
            />
          </a> */}
          {/* Left navigation links */}
          <ul
            className="list-style-none mr-auto flex flex-col pl-0 lg:flex-row"
            data-te-navbar-nav-ref
          >
            {/* Home link */}
            <li className="mb-4 lg:mb-0 lg:pr-2" data-te-nav-item-ref>
              <button
                className="text-neutral-500 transition duration-200 hover:text-neutral-700 hover:ease-in-out focus:text-neutral-700 disabled:text-black/30 motion-reduce:transition-none dark:text-neutral-200 dark:hover:text-neutral-300 dark:focus:text-neutral-300 lg:px-2 [&.active]:text-black/90 dark:[&.active]:text-zinc-400"
                onClick={handleNavigateToHome}
                data-te-nav-link-ref
              >
                🍣
              </button>
            </li>
            {/* Feed link */}
            <li className="mb-4 lg:mb-0 lg:pr-2" data-te-nav-item-ref>
              <button
                className="text-neutral-500 transition duration-200 hover:text-neutral-700 hover:ease-in-out focus:text-neutral-700 disabled:text-black/30 motion-reduce:transition-none dark:text-neutral-200 dark:hover:text-neutral-300 dark:focus:text-neutral-300 lg:px-2 [&.active]:text-black/90 dark:[&.active]:text-zinc-400"
                onClick={handleNavigateToFeed}
                data-te-nav-link-ref
              >
                Feed
              </button>
            </li>
            {/* Dashboard link */}
            {/* <li className="mb-4 lg:mb-0 lg:pr-2" data-te-nav-item-ref>
              <button
                className="text-neutral-500 transition duration-200 hover:text-neutral-700 hover:ease-in-out focus:text-neutral-700 disabled:text-black/30 motion-reduce:transition-none dark:text-neutral-200 dark:hover:text-neutral-300 dark:focus:text-neutral-300 lg:px-2 [&.active]:text-black/90 dark:[&.active]:text-neutral-400"
                onClick={handleNavigateToFeed}
                data-te-nav-link-ref
              >
                Dashboard
              </button>
            </li> */}
            {/* Post link */}
            <li className="mb-4 lg:mb-0 lg:pr-2" data-te-nav-item-ref>
              <button
                className="text-neutral-500 transition duration-200 hover:text-neutral-700 hover:ease-in-out focus:text-neutral-700 disabled:text-black/30 motion-reduce:transition-none dark:text-neutral-200 dark:hover:text-neutral-300 dark:focus:text-neutral-300 lg:px-2 [&.active]:text-black/90 dark:[&.active]:text-neutral-400"
                onClick={handleNavigateToPost}
                data-te-nav-link-ref
              >
                Post
              </button>
            </li>
            {dev && (
              <li className="mb-4 lg:mb-0 lg:pr-2" data-te-nav-item-ref>
                <button
                  className="text-neutral-500 transition duration-200 hover:text-neutral-700 hover:ease-in-out focus:text-neutral-700 disabled:text-black/30 motion-reduce:transition-none dark:text-neutral-200 dark:hover:text-neutral-300 dark:focus:text-neutral-300 lg:px-2 [&.active]:text-black/90 dark:[&.active]:text-neutral-400"
                  onClick={switchAPI}
                  data-te-nav-link-ref
                >
                  {devAPI ? "Current: Local API" : "Current: Remote API"}
                </button>
              </li>
            )}
          </ul>
        </div>

        {/* Right elements */}

        <div className="relative flex items-center">
          {/* {user} */}
          {user && (
            <div className="mb-4 lg:mb-0 lg:pr-2" data-te-nav-item-ref>
              <button
                className="text-neutral-500 transition duration-200 hover:text-neutral-700 hover:ease-in-out focus:text-neutral-700 disabled:text-black/30 motion-reduce:transition-none dark:text-neutral-200 dark:hover:text-neutral-300 dark:focus:text-neutral-300 lg:px-2 [&.active]:text-black/90 dark:[&.active]:text-neutral-400"
                onClick={handleLogout}
                data-te-nav-link-ref
              >
                Sign Out
              </button>
            </div>
          )}
          {!user && (
            <div className="mb-4 lg:mb-0 lg:pr-2" data-te-nav-item-ref>
              <button
                className="text-neutral-500 transition duration-200 hover:text-neutral-700 hover:ease-in-out focus:text-neutral-700 disabled:text-black/30 motion-reduce:transition-none dark:text-neutral-200 dark:hover:text-neutral-300 dark:focus:text-neutral-300 lg:px-2 [&.active]:text-black/90 dark:[&.active]:text-neutral-400"
                onClick={handleNavigateToHome}
                data-te-nav-link-ref
              >
                Register / Login
              </button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
