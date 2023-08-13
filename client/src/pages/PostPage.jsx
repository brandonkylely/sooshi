import { useNavigate } from "react-router-dom";

function PostPage() {
  const navigate = useNavigate();
  const handleNavigate = () => {
    navigate("/feed");
  };
  return (
    <div
    className="font-black font-chivo">
      <h1>Post Page</h1>
      <button onClick={handleNavigate}>Go to feed</button>
    </div>
  );
}

export default PostPage;