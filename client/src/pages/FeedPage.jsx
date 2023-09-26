// import token from "../utils/token";
// import { useEffect } from "react";
import { Collapse, Ripple, initTE } from "tw-elements";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Pagination from "../components/Pagination";
import Footer from "../components/Footer";
import SushiCard from "../components/SushiCard";
import Loading from "../components/Loading";
import axios from "axios";
import { paginationAtom, feedLoadingAtom, devAPIAtom } from "../state";
import { useAtom } from "jotai";

function FeedPage() {
  // useEffect(() => {
  //   console.log(token.isExpired());
  // }, []);
  // if (token.isExpired()) {
  //   token.logout();
  //   window.location.href = "/";
  // }
  const [sushiData, setSushiData] = useState([]);
  const [error, setError] = useState(false);
  const [pagination, setPagination] = useAtom(paginationAtom);
  const [feedLoading, setFeedLoading] = useAtom(feedLoadingAtom);
  const [devAPI] = useAtom(devAPIAtom);

  useEffect(() => {
    initTE({ Collapse, Ripple });
    setFeedLoading(true);
    fetchSushiFeed();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    setFeedLoading(true);
    fetchSushiFeed();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pagination.pageNumber]);

  /**
   * Make API call to get all posts, render them in SushiCard components, and display them on the page.
   */

  const fetchSushiFeed = async () => {
    try {
      let query;
      if (pagination.lastKeyData === null) {
        query = "";
      } else {
        query = `?lastKeyId=${pagination.lastKeyData.id}&lastKeyStatus=${pagination.lastKeyData.status}&lastKeyTimestamp=${pagination.lastKeyData.timestamp}`;
      }
      let apiURL;
      if (devAPI){
        apiURL = "http://localhost:3001";
      } else {
        apiURL = "https://f997a554a1.execute-api.us-west-1.amazonaws.com/latest";
      }
      const { data } = await axios.get(`${apiURL}/api/auth/getSushiFeed${query}`);
      // console.log("DATA FROM BACKEND", data);

      for (let i = 0; i < data.sushiData.length; i++) {
        data.sushiData[i].signedURL = `${await fetchSushiURL(
          data.sushiData[i].image
        )}`;
      }

      setSushiData(data.sushiData);
      let newPagination;
      // prevents error if last ket doesnt exist, IE: reaching the last page
      if (data.lastKey) {
        newPagination = {
          pageNumber: pagination.pageNumber,
          lastKeyData: data.lastKey
        };
      } else {
        newPagination = {
          pageNumber: pagination.pageNumber,
          lastKeyData: null
        };
      }

      // console.log("NEW PAGINATION", newPagination);
      setPagination(newPagination);
      setTimeout(() => {
        setFeedLoading(false);
      }, 30);
    } catch (err) {
      console.log(err);
      // Set Error to trigger toast
      setError(true);
    }
  };

  const fetchSushiURL = async (s3Key) => {
    try {
      let apiURL;
      if (devAPI){
        apiURL = "http://localhost:3001";
      } else {
        apiURL = "https://f997a554a1.execute-api.us-west-1.amazonaws.com/latest";
      }
      const { data } = await axios.get(
        `${apiURL}/api/auth/getSushiURL?fileName=${s3Key}`
      );
      // console.log("DATA FROM BACKEND", data);

      return data;
    } catch (err) {
      console.log(err);
      // Set Error to trigger toast
      setError(true);
    }
  };

  const navigate = useNavigate();
  const handleNavigate = () => {
    navigate("/post");
  };

  const handleRemoveError = () => {
    setError(false);
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
      </div>
      {error && (
        <div
          className="pointer-events-auto mx-auto mb-4 hidden w-96 max-w-full rounded-lg bg-warning-100 bg-clip-padding text-sm text-warning-700 shadow-lg shadow-black/5 data-[te-toast-show]:block data-[te-toast-hide]:hidden"
          id="static-example"
          role="alert"
          aria-live="assertive"
          aria-atomic="true"
          data-te-autohide="false"
          data-te-toast-init
          data-te-toast-show
        >
          <div className="flex items-center justify-between rounded-t-lg border-b-2 border-warning-200 bg-warning-100 bg-clip-padding px-4 pb-2 pt-2.5 text-warning-700">
            <p className="flex items-center font-bold text-warning-700">
              <svg
                aria-hidden="true"
                focusable="false"
                data-prefix="fas"
                data-icon="exclamation-triangle"
                className="mr-2 h-4 w-4 fill-current"
                role="img"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 576 512"
              >
                <path
                  fill="currentColor"
                  d="M569.517 440.013C587.975 472.007 564.806 512 527.94 512H48.054c-36.937 0-59.999-40.055-41.577-71.987L246.423 23.985c18.467-32.009 64.72-31.951 83.154 0l239.94 416.028zM288 354c-25.405 0-46 20.595-46 46s20.595 46 46 46 46-20.595 46-46-20.595-46-46-46zm-43.673-165.346l7.418 136c.347 6.364 5.609 11.346 11.982 11.346h48.546c6.373 0 11.635-4.982 11.982-11.346l7.418-136c.375-6.874-5.098-12.654-11.982-12.654h-63.383c-6.884 0-12.356 5.78-11.981 12.654z"
                ></path>
              </svg>
              Oops!
            </p>
            <div className="flex items-center">
              <button
                type="button"
                className="ml-2 box-content rounded-none border-none opacity-80 hover:no-underline hover:opacity-75 focus:opacity-100 focus:shadow-none focus:outline-none"
                data-te-toast-dismiss
                aria-label="Close"
                onClick={handleRemoveError}
              >
                <span className="w-[1em] focus:opacity-100 disabled:pointer-events-none disabled:select-none disabled:opacity-25 [&.disabled]:pointer-events-none [&.disabled]:select-none [&.disabled]:opacity-25">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="h-6 w-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </span>
              </button>
            </div>
          </div>
          <div className="break-words rounded-b-lg bg-warning-100 px-4 py-4 text-warning-700">
            An error occured while loading the feed.
          </div>
        </div>
      )}
      <div className="grid-cols-1 sm:grid md:grid-cols-1 ">
        {feedLoading ? <Loading /> : sushiData.map((sushi, index) => (
          <div key={index}>
            <SushiCard title={sushi.title} image={sushi.signedURL} />
          </div>
        ))}
      </div>
      <Pagination />
      <Footer />
    </div>
  );
}

export default FeedPage;
