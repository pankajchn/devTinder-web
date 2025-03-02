import { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { BASE_URL } from "../utils/constants";
import { useNavigate } from "react-router";
import bg_banner_two from "../assets/bg_banner_two.jpeg";

const Login = () => {
  const [emailId, setEmailId] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [isUserRegister, setIsUserRegister] = useState(true);
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLoginClick = async function () {
    setError("");
    try {
      const res = await axios.post(
        BASE_URL + "/login",
        {
          emailId,
          password,
        },
        { withCredentials: true }
      );
      dispatch(addUser(res?.data?.data));
      navigate("/feed");
    } catch (error) {
      setError(error.response.data.message || "Something went wrong");
    }
  };

  const handleSignupClick = async function () {
    setError("");
    try {
      const res = await axios.post(
        BASE_URL + "/signup",
        { firstName, lastName, emailId, password },
        { withCredentials: true }
      );
      dispatch(addUser(res?.data?.data));
      navigate("/profile");
    } catch (error) {
      setError(error.response.data.message || "Something went wrong");
      console.log(error);
    }
  };

  return (
    <div className="flex justify-center items-center w-screen h-screen">
      <img
        src={bg_banner_two}
        alt="bg_banner"
        className="hidden md:block w-full h-full object-cover object-center"
      />
      <div className="hidden md:block absolute inset-0 bg-black bg-opacity-40 w-full"></div>

      <div className="absolute top-4 left-4 lg:top-8 lg:left-20">
        <h2 className="text-xl md:4xl lg:text-4xl text-white font-bold">
          🧑‍💻 DevTinder
        </h2>
      </div>

      <div className=" absolute top-32  ">
        <form
          className="bg-base-300 px-10 py-3 md:px-16 md:py-10 pb-8 rounded-lg md:bg-black opacity-90 shadow-xl"
          onSubmit={(e) => e.preventDefault()}
        >
          <h2 className="text-center text-xl md:text-2xl font-bold mb-8 text-white">
            {isUserRegister ? "Log In" : "Sign Up"}
          </h2>
          <div className="flex flex-col">
            {!isUserRegister && (
              <>
                <input
                  type="text"
                  value={firstName}
                  onChange={function (e) {
                    setFirstName(e.target.value);
                  }}
                  placeholder="First Name"
                  className="my-2 py-3 px-3 rounded-md md:w-72 text-white"
                />
                <input
                  value={lastName}
                  onChange={function (e) {
                    setLastName(e.target.value);
                  }}
                  type="text"
                  placeholder="Last Name"
                  className="my-2 py-3 px-3 rounded-md md:w-72 text-white"
                />
              </>
            )}

            <input
              value={emailId}
              onChange={function (e) {
                setEmailId(e.target.value);
              }}
              type="email"
              placeholder="Email"
              className="my-2 py-3 px-3 rounded-md md:w-72 text-white"
            />
            <div className="relative flex items-center md:w-72">
              <input
                value={password}
                onChange={function (e) {
                  setPassword(e.target.value);
                }}
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                className="my-2 py-3 px-3 rounded-md text-white w-full"
              />

              <span
                className="absolute left-44 md:left-64 cursor-pointer"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? "👁️" : "🙈"}
              </span>
            </div>

            <p className="text-red-700 text-sm md:text-base w-48 md:w-72">{error}</p>

            {isUserRegister ? (
              <button
                onClick={handleLoginClick}
                className="bg-blue-800 hover:opacity-80 py-2 px-4 rounded-md text-white font-bold mt-5"
              >
                Log In
              </button>
            ) : (
              <button
                onClick={handleSignupClick}
                className="bg-blue-800 hover:opacity-80 py-2 px-4 rounded-md text-white font-bold mt-5"
              >
                Sign Up
              </button>
            )}

            <div className="text-center mt-5">
              {isUserRegister ? (
                <p className="text-gray-500 text-sm">
                  New to DevTinder?{" "}
                  <span
                    className="cursor-pointer hover:underline text-white text-base"
                    onClick={() => setIsUserRegister(!isUserRegister)}
                  >
                    Sign up now
                  </span>
                </p>
              ) : (
                <p className="text-gray-500 text-sm">
                  Already registered?{" "}
                  <span
                    className="cursor-pointer hover:underline text-white text-base"
                    onClick={() => setIsUserRegister(!isUserRegister)}
                  >
                    Log In
                  </span>
                </p>
              )}
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
