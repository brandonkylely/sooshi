import { Collapse, Ripple, initTE } from "tw-elements";
import { useEffect } from "react";
import Navbar from "../components/Navbar";
import RegisterForm from "../components/RegisterForm";
import { useNavigate } from "react-router-dom";

function HomePage() {
  const navigate = useNavigate();
  const handleNavigate = () => {
    navigate("/login");
  };
  useEffect(() => {
    initTE({ Collapse, Ripple });
  }, []);
  return (
    <div className="overflow-hidden">
      <Navbar />
      <div className="h-[860px]">
        <div className="bg-hero-pattern bg-cover w-screen min-h-full text-rose-50">
          <h1 className="text-center w-48 ml-48 pt-60 text-6xl font-sig">
            Sooshi
          </h1>
          <div className="ml-56 mt-4 font-cour">
            ..."probably the best food out there"
          </div>
          <div className="w-[500px] ml-40 mt-4 flex justify-between font-chivo">
            {/* Register */}
            <div className="">
              <button
                className="inline-block rounded bg-primary px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]"
                type="button"
                data-te-collapse-init
                data-te-ripple-init
                data-te-ripple-color="light"
                data-te-target="#collapseRegister"
                aria-expanded="false"
                aria-controls="collapseRegister"
              >
                Register
              </button>
              <div
                className="!visible hidden absolute"
                id="collapseRegister"
                data-te-collapse-item
              >
                <div className="z-40 block w-96 text-black rounded-lg bg-white p-6 shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] dark:bg-neutral-700 dark:text-neutral-50">
                  <RegisterForm />
                </div>
              </div>
            </div>
            <button className="inline-block rounded bg-primary px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]"
            onClick={handleNavigate}>
              Login
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HomePage;
