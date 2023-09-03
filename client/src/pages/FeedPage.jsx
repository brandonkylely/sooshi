// import token from "../utils/token";
// import { useEffect } from "react";
import { Collapse, Ripple, initTE } from "tw-elements";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Pagination from "../components/Pagination";
import Footer from "../components/Footer";
import SushiCard from "../components/SushiCard";

function FeedPage() {
  // useEffect(() => {
  //   console.log(token.isExpired());
  // }, []);
  // if (token.isExpired()) {
  //   token.logout();
  //   window.location.href = "/";
  // }


  useEffect(() => {
    initTE({ Collapse, Ripple });
  }, []);

  /**
   * Make API call to get all posts, render them in SushiCard components, and display them on the page.
   */

  const navigate = useNavigate();
  const handleNavigate = () => {
    navigate("/post");
  };
  return (
    <div>
      <Navbar />
      <div className="h-8 px-4 pt-1 justify-between flex">
        <h2 className="text-4xl font-medium leading-tight text-rose-400 font-sig">
          Sooshi
        </h2>
        <button
          type="button"
          className="h-9 mt-1 font-sig inline-block rounded-md bg-danger px-5 pb-2 pt-2.5 text-sm uppercase leading-normal text-white transition duration-150 ease-in-out hover:bg-danger-600 focus:bg-danger-600 focus:outline-none focus:ring-0 active:bg-danger-700"
          data-te-ripple-init
          data-te-ripple-color="light"
          onClick={handleNavigate}
        >
          Post
        </button>
        {/* <button 
        // className="h-10 px-3 py-1 font-sig text-rose-400 "
        onClick={handleNavigate}>Post</button> */}
      </div>
      <div className="grid-cols-1 sm:grid md:grid-cols-2 ">
        {/* {sushiData.map((sushi) => {
        <SushiCard title ={sushi.title} image = {sushi.image}/>
        })} */}
      </div>
      <Pagination />
      <Footer />
    </div>
  );
}

export default FeedPage;
