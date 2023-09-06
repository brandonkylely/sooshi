// import axios from "axios";
// import { useState } from "react";


function SushiCard(props) {
  // const [sushi, setSushi] = useState({})

  // const fetchSushiData = async (event) => {
  //   event.preventDefault();
  //   try {
  //     const { data } = await axios.post("/api/auth/getSushiURL", props.sushi);

  //   } catch (err) {
  //     console.log(err);
  //   }
  // };

  return (
    <div className="mx-3 mt-6 flex flex-col self-start rounded-lg bg-white shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] dark:bg-neutral-700 sm:shrink-0 sm:grow sm:basis-0"
    key={props.key}
    >
      <a href="#!">
        <img
          className="rounded-t-lg max-h-96"
          src={props.image}
          alt={props.title + " alt"}
        />
      </a>
      <div className="p-6">
        <h5 className="mb-2 text-xl font-medium leading-tight text-neutral-800 dark:text-neutral-50">
          {props.title}
        </h5>
        {/* <p className="mb-4 text-base text-neutral-600 dark:text-neutral-200">
          This is a longer card with supporting text below as a natural lead-in
          to additional content. This content is a little bit longer.
        </p> */}
      </div>
    </div>
  );
}

export default SushiCard;
