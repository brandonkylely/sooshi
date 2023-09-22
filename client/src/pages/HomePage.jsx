import { Collapse, Ripple, initTE } from "tw-elements";
import { useEffect } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import RegisterForm from "../components/RegisterForm";
import LoginForm from "../components/LoginForm";
import Scene from "../components/Model";
import { useAtom } from "jotai";
import { homePageFormChangeAtom } from "../state";

function HomePage() {
  const [formChange, setFormChange] = useAtom(homePageFormChangeAtom);
  const handleSetForm = () => {
    setFormChange(true);
  };

  useEffect(() => {
    initTE({ Collapse, Ripple });
  }, []);
  return (
    <div className="overflow-hidden">
      <Navbar />
      <Scene />
      <div className="h-[820px]">
        <div className="absolute">
          <div className="w-full min-h-full text-rose-50">
            <h1 className="text-center w-48 ml-48 pt-60 text-6xl font-sig">
              Sooshi
            </h1>
            <div className="ml-56 mt-4 font-cour">
                  ...a sooshi-al media platform
                </div>
            {formChange ? (
              <>
                <div className="w-[500px] ml-40 mt-24 text-black font-chivo">
                  <LoginForm />
                </div>
              </>
            ) : (
              <>

                <div className="w-[500px] ml-40 mt-4 pt-24 flex justify-between font-chivo">
                  {/* Register */}
                  <div className="">
                    <button
                      className="inline-block bg-neutral-100 bg-opacity-20 rounded px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white transition duration-150 ease-in-out hover:bg-slate-700 hover:text-rose-50 focus:text-rose-50 focus:outline-none focus:ring-0 active:text-rose-50"
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
                  <div className="">

                  <button
                    className="inline-block bg-neutral-100 bg-opacity-20 rounded px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white transition duration-150 ease-in-out hover:bg-slate-700 hover:text-rose-50 focus:text-rose-50 focus:outline-none focus:ring-0 active:text-rose-50"
                    onClick={handleSetForm}
                    >
                    Login
                  </button>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>


      <Footer />
    </div>
  );
}

export default HomePage;
