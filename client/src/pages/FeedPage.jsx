import token from "../utils/token";
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
      <h1>Feed Page</h1>
      <button onClick={handleNavigate}>Post</button>
      <div className="grid-cols-1 sm:grid md:grid-cols-2 ">
        <SushiCard />
        <SushiCard />
        <SushiCard />
        <SushiCard />
      </div>
      <Pagination />
      <Footer />
    </div>
  );
}

export default FeedPage;
