import Navbar from "../components/Navbar";
import LoginForm from "../components/LoginForm";
import Footer from "../components/Footer";

function LoginPage() {
  return (
    <div className="overflow-hidden">
      <Navbar />
      <div className="h-[860px]">
        <div className="bg-hero-pattern bg-cover w-screen min-h-full text-rose-50">
          <h1 className="text-center w-48 ml-48 pt-60 text-6xl font-sig">
            Sooshi
          </h1>
          <div className="w-[500px] ml-40 mt-4 text-black font-chivo">
            <LoginForm />
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default LoginPage;
