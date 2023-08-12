import { Ripple, Input, initTE } from "tw-elements";
import { useEffect, useState } from "react";
import { useAtom } from "jotai";
import { userAtom } from "../state";
import token from "../utils/token";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Register() {
  useEffect(() => {
    initTE({ Input, Ripple });
  }, []);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });
  const handleFormChange = ({ target: { name, value } }) => {
    setFormData({ ...formData, [name]: value });
  };
  const [user, setUser] = useAtom(userAtom);

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    try {
      console.log(formData);
      const { data } = await axios.post("http://localhost:3001/api/auth/register", formData);
      console.log("DATA FROM BACKEND", data);

      // Store token in local storage;
      token.login(data.token);
      const user = token.decode(data.token);
      
      // Update user state
      setUser(user.data);
      //maybe redirect to home page?
      navigate("/feed");
    } catch (err) {
      console.log(err);
      //failed, what do?
      //maybe some error handling? display to user?
    }
  };

  return (
    <>
      <div className="block max-w-sm rounded-lg bg-white p-6 shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] dark:bg-neutral-700">
        <form onSubmit={handleFormSubmit}>
          {/*username input*/}
          <div className="relative mb-6" data-te-input-wrapper-init>
            <input
              type="username"
              name="username"
              className="peer block min-h-[auto] w-full rounded border-0 bg-transparent px-3 py-[0.32rem] leading-[1.6] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:text-neutral-200 dark:placeholder:text-neutral-200 [&:not([data-te-input-placeholder-active])]:placeholder:opacity-0"
              id="exampleInput124"
              placeholder="Username"
              onChange={handleFormChange}
            />
            <label
              htmlFor="exampleInput124"
              className="pointer-events-none absolute left-3 top-0 mb-0 max-w-[90%] origin-[0_0] truncate pt-[0.37rem] leading-[1.6] text-neutral-500 transition-all duration-200 ease-out peer-focus:-translate-y-[0.9rem] peer-focus:scale-[0.8] peer-focus:text-primary peer-data-[te-input-state-active]:-translate-y-[0.9rem] peer-data-[te-input-state-active]:scale-[0.8] motion-reduce:transition-none dark:text-neutral-200 dark:peer-focus:text-neutral-200"
            >
              Username
            </label>
          </div>
          {/*Email input*/}
          <div className="relative mb-6" data-te-input-wrapper-init>
            <input
              type="email"
              name="email"
              className="peer block min-h-[auto] w-full rounded border-0 bg-transparent px-3 py-[0.32rem] leading-[1.6] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:text-neutral-200 dark:placeholder:text-neutral-200 [&:not([data-te-input-placeholder-active])]:placeholder:opacity-0"
              id="exampleInput125"
              placeholder="Email address"
              onChange={handleFormChange}
            />
            <label
              htmlFor="exampleInput125"
              className="pointer-events-none absolute left-3 top-0 mb-0 max-w-[90%] origin-[0_0] truncate pt-[0.37rem] leading-[1.6] text-neutral-500 transition-all duration-200 ease-out peer-focus:-translate-y-[0.9rem] peer-focus:scale-[0.8] peer-focus:text-primary peer-data-[te-input-state-active]:-translate-y-[0.9rem] peer-data-[te-input-state-active]:scale-[0.8] motion-reduce:transition-none dark:text-neutral-200 dark:peer-focus:text-neutral-200"
            >
              Email address
            </label>
          </div>

          {/*Password input*/}
          <div className="relative mb-6" data-te-input-wrapper-init>
            <input
              type="password"
              name="password"
              className="peer block min-h-[auto] w-full rounded border-0 bg-transparent px-3 py-[0.32rem] leading-[1.6] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:text-neutral-200 dark:placeholder:text-neutral-200 [&:not([data-te-input-placeholder-active])]:placeholder:opacity-0"
              id="exampleInput126"
              placeholder="Password"
              onChange={handleFormChange}
              autoComplete="current-password"
            />
            <label
              htmlFor="exampleInput126"
              className="pointer-events-none absolute left-3 top-0 mb-0 max-w-[90%] origin-[0_0] truncate pt-[0.37rem] leading-[1.6] text-neutral-500 transition-all duration-200 ease-out peer-focus:-translate-y-[0.9rem] peer-focus:scale-[0.8] peer-focus:text-primary peer-data-[te-input-state-active]:-translate-y-[0.9rem] peer-data-[te-input-state-active]:scale-[0.8] motion-reduce:transition-none dark:text-neutral-200 dark:peer-focus:text-neutral-200"
            >
              Password
            </label>
          </div>

          {/*Subscribe newsletter checkbox*/}
          <div className="mb-6 flex min-h-[1.5rem] items-center justify-center pl-[1.5rem]">
            <input
              className="relative float-left -ml-[1.5rem] mr-[6px] h-[1.125rem] w-[1.125rem] appearance-none rounded-[0.25rem] border-[0.125rem] border-solid border-neutral-300 outline-none before:pointer-events-none before:absolute before:h-[0.875rem] before:w-[0.875rem] before:scale-0 before:rounded-full before:bg-transparent before:opacity-0 before:shadow-[0px_0px_0px_13px_transparent] before:content-[''] checked:border-primary checked:bg-primary checked:before:opacity-[0.16] checked:after:absolute checked:after:-mt-px checked:after:ml-[0.25rem] checked:after:block checked:after:h-[0.8125rem] checked:after:w-[0.375rem] checked:after:rotate-45 checked:after:border-[0.125rem] checked:after:border-l-0 checked:after:border-t-0 checked:after:border-solid checked:after:border-white checked:after:bg-transparent checked:after:content-[''] hover:cursor-pointer hover:before:opacity-[0.04] hover:before:shadow-[0px_0px_0px_13px_rgba(0,0,0,0.6)] focus:shadow-none focus:transition-[border-color_0.2s] focus:before:scale-100 focus:before:opacity-[0.12] focus:before:shadow-[0px_0px_0px_13px_rgba(0,0,0,0.6)] focus:before:transition-[box-shadow_0.2s,transform_0.2s] focus:after:absolute focus:after:z-[1] focus:after:block focus:after:h-[0.875rem] focus:after:w-[0.875rem] focus:after:rounded-[0.125rem] focus:after:content-[''] checked:focus:before:scale-100 checked:focus:before:shadow-[0px_0px_0px_13px_#3b71ca] checked:focus:before:transition-[box-shadow_0.2s,transform_0.2s] checked:focus:after:-mt-px checked:focus:after:ml-[0.25rem] checked:focus:after:h-[0.8125rem] checked:focus:after:w-[0.375rem] checked:focus:after:rotate-45 checked:focus:after:rounded-none checked:focus:after:border-[0.125rem] checked:focus:after:border-l-0 checked:focus:after:border-t-0 checked:focus:after:border-solid checked:focus:after:border-white checked:focus:after:bg-transparent dark:border-neutral-600 dark:checked:border-primary dark:checked:bg-primary"
              type="checkbox"
              value=""
              id="exampleCheck25"
            />
            <label
              className="inline-block pl-[0.15rem] hover:cursor-pointer"
              htmlFor="exampleCheck25"
            >
              Subscribe to our newsletter
            </label>
          </div>

          {/*Submit button*/}
          <button
            type="submit"
            className="inline-block w-full rounded bg-primary px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)]"
            data-te-ripple-init
            data-te-ripple-color="light"
          >
            Register
          </button>
        </form>
      </div>
    </>
  );
}

export default Register;
