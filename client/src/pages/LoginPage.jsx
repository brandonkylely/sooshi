import { Collapse, Ripple, initTE } from "tw-elements";
import { useEffect } from "react";
import Navbar from "../components/Navbar";
import LoginForm from "../components/LoginForm";

function LoginPage() {

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
          <LoginForm />
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
