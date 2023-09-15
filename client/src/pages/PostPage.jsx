import { Input, Ripple, initTE } from "tw-elements";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useState } from "react";
import axios from "axios";
import tokenUtil from "../utils/token";
import { devAPIAtom } from "../state";
import { useAtom } from "jotai";

function PostPage() {
  const [title, setTitle] = useState("");
  const [image, setImage] = useState(null);
  // useEffect(() => {
  //   console.log(image);
  // }, [image]);

  useEffect(() => {
    initTE({ Input, Ripple });
  }, []);

  const handleSetImage = (e) => {
    setImage(e.target.files[0]);
  };
  const handleSetTitle = (e) => {
    setTitle(e.target.value);
  };
  const navigate = useNavigate();
  const handleNavigate = () => {
    navigate("/feed");
  };
  const [devAPI] = useAtom(devAPIAtom);

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    try {
      const token = tokenUtil.getToken();
      // console.log("TOKEN", token);
      const decodedUID = token.uid;
      // console.log("DECODED UID", decodedUID);
      const formData = new FormData();
      formData.append("title", title);
      formData.append("image", image);
      formData.append("decodedUID", decodedUID);
      let apiURL;
      if (devAPI) {
        apiURL = "http://localhost:3001";
      } else {
        apiURL =
          "https://f997a554a1.execute-api.us-west-1.amazonaws.com/latest";
      }
      await axios.post(`${apiURL}/api/auth/upload`, formData);
      // console.log("DATA FROM BACKEND", data);
      navigate("/feed");
    } catch (err) {
      console.log(err);
      //failed, what do?
      //maybe some error handling? display to user?
    }
  };

  return (
    <div className="h-screen text-neutral-600">
      <Navbar />
      <div className="h-12 px-4 pt-1 justify-between flex">
        <h2 className="text-4xl font-medium leading-tight text-rose-400 font-sig">
          Sooshi
        </h2>
        <button
          type="button"
          className="h-9 mt-1 font-sig inline-block rounded-md bg-danger px-5 pb-2 pt-2 text-sm uppercase leading-normal text-white transition duration-150 ease-in-out hover:bg-danger-600 focus:bg-danger-600 focus:outline-none focus:ring-0 active:bg-danger-700"
          data-te-ripple-init
          data-te-ripple-color="light"
          onClick={handleNavigate}
        >
          Go to feed
        </button>
      </div>
      <form
        onSubmit={handleFormSubmit}
        encType="multipart/form-data"
        className="h-2/3 w-80 mx-auto pt-32"
      >
        <div className="relative mb-12" data-te-input-wrapper-init>
          <input
            type="title"
            className="peer block min-h-[auto] w-full rounded border-0 bg-transparent px-3 py-[0.32rem] leading-[1.6] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:text-neutral-200 dark:placeholder:text-neutral-200 [&:not([data-te-input-placeholder-active])]:placeholder:opacity-0"
            id="inputTitle"
            aria-describedby="titleHelp"
            placeholder="Enter title"
            onChange={handleSetTitle}
          />
          <label
            htmlFor="imputTitle"
            className="text-neutral-500 pointer-events-none absolute left-3 top-0 mb-0 max-w-[90%] origin-[0_0] truncate pt-[0.37rem] leading-[1.6] transition-all duration-200 ease-out peer-focus:-translate-y-[0.9rem] peer-focus:scale-[0.8] peer-focus:text-primary peer-data-[te-input-state-active]:-translate-y-[0.9rem] peer-data-[te-input-state-active]:scale-[0.8] motion-reduce:transition-none dark:text-neutral-200 dark:peer-focus:text-primary"
          >
            Enter a title
          </label>
          <small
            id="titleHelp"
            className="absolute w-full dark:text-neutral-200"
            data-te-input-helper-ref
          >
            Make it catchy!
          </small>
        </div>
        <label
          htmlFor="formFile"
          className="mb-2 inline-block  dark:text-neutral-200"
        >
          Upload a photo
        </label>
        <input
          onChange={handleSetImage}
          className="relative m-0 block w-full min-w-0 flex-auto rounded border border-solid border-neutral-300 bg-clip-padding px-3 py-[0.32rem] text-base font-normal text-neutral-700 transition duration-300 ease-in-out file:-mx-3 file:-my-[0.32rem] file:overflow-hidden file:rounded-none file:border-0 file:border-solid file:border-inherit file:bg-neutral-100 file:px-3 file:py-[0.32rem] file:text-neutral-700 file:transition file:duration-150 file:ease-in-out file:[border-inline-end-width:1px] file:[margin-inline-end:0.75rem] hover:file:bg-neutral-200 focus:border-primary focus:text-neutral-700 focus:shadow-te-primary focus:outline-none dark:border-neutral-600 dark:text-neutral-200 dark:file:bg-neutral-700 dark:file:text-neutral-100 dark:focus:border-primary"
          type="file"
          id="formFile"
        />
        <button
          className="h-9 mt-10 font-sig inline-block rounded-md bg-danger px-5 pb-2 pt-2 text-sm uppercase leading-normal text-white transition duration-150 ease-in-out hover:bg-danger-600 focus:bg-danger-600 focus:outline-none focus:ring-0 active:bg-danger-700"
          data-te-ripple-init
          data-te-ripple-color="light"
          type="submit"
        >
          Upload
        </button>
      </form>

      <Footer />
    </div>
  );
}

export default PostPage;
