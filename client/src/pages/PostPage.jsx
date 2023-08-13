import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

function PostPage() {
  const navigate = useNavigate();
  const handleNavigate = () => {
    navigate("/feed");
  };
  return (
    <div
    // className="font-black font-chivo"
    >
      <Navbar />
      <h1>Post Page</h1>
      <button onClick={handleNavigate}>Go to feed</button>
      <Footer/>
    </div>
  );
}

export default PostPage;