import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useState, useEffect } from "react";
import axios from "axios";

function PostPage() {
  const [image, setImage] = useState(null);
  // useEffect(() => {
  //   console.log(image);
  // }, [image]);

  const handleSetImage = (e) => {
    setImage(e.target.files[0]);
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    try {
      console.log(image);
      const { data } = await axios.post("/api/auth/post", image);
      console.log("DATA FROM BACKEND", data);
      
      navigate("/feed");
    } catch (err) {
      console.log(err);
      //failed, what do?
      //maybe some error handling? display to user?
    }
  };

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
      <form 
      onSubmit={handleFormSubmit}
      className="mb-3 w-80">
        <label
          htmlFor="formFile"
          className="mb-2 inline-block text-neutral-700 dark:text-neutral-200"
        >
          Upload a photo!
        </label>
        <input
          onChange={handleSetImage}
          className="relative m-0 block w-full min-w-0 flex-auto rounded border border-solid border-neutral-300 bg-clip-padding px-3 py-[0.32rem] text-base font-normal text-neutral-700 transition duration-300 ease-in-out file:-mx-3 file:-my-[0.32rem] file:overflow-hidden file:rounded-none file:border-0 file:border-solid file:border-inherit file:bg-neutral-100 file:px-3 file:py-[0.32rem] file:text-neutral-700 file:transition file:duration-150 file:ease-in-out file:[border-inline-end-width:1px] file:[margin-inline-end:0.75rem] hover:file:bg-neutral-200 focus:border-primary focus:text-neutral-700 focus:shadow-te-primary focus:outline-none dark:border-neutral-600 dark:text-neutral-200 dark:file:bg-neutral-700 dark:file:text-neutral-100 dark:focus:border-primary"
          type="file"
          id="formFile"
        />
        <button
        type="submit"
        >
          Upload
        </button>
      </form>
      <button onClick={handleNavigate}>Go to feed</button>
      <Footer />
    </div>
  );
}

export default PostPage;
