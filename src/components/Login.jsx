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
      console.log(res);
      dispatch(addUser(res.data));
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
      console.log(res);
      dispatch(addUser(res?.data?.data));
      navigate("/profile");
    } catch (error) {
      setError(error.response.data.message || "Something went wrong");
      console.log(error)
    }
  };

  return (
    <div className="w-[430px] h-screen md:w-screen md:flex">
      <img
        src={bg_banner_two}
        alt="bg_banner"
        className="h-screen md:w-full md:object-cover md:object-center"
      />
      <div className="hidden md:block absolute inset-0 bg-black bg-opacity-40"></div>

      <div className="absolute bottom-[39rem] md:top-8 md:left-20">
        <h2 className="text-2xl md:text-4xl text-white font-bold">🧑‍💻 DevTinder</h2>
      </div>

      <div className="absolute left-[38rem] top-28">
        <form
          className="px-12 py-5 pb-8 rounded-lg bg-black opacity-90"
          onSubmit={(e) => e.preventDefault()}
        >
          <h2 className="text-center text-2xl font-bold mb-8 text-white">
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
                  className="my-2 py-3 px-3 rounded-md w-72 text-white"
                />
                <input
                  value={lastName}
                  onChange={function (e) {
                    setLastName(e.target.value);
                  }}
                  type="text"
                  placeholder="Last Name"
                  className="my-2 py-3 px-3 rounded-md w-72 text-white"
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
              className="my-2 py-3 px-3 rounded-md w-72 text-white"
            />
            <div className="relative flex items-center">
              <input
                value={password}
                onChange={function (e) {
                  setPassword(e.target.value);
                }}
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                className="my-2 py-3 px-3 rounded-md w-72 text-white"
              />

              <span
                className="absolute left-64 cursor-pointer"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? "👁️" : "🙈"}
              </span>
            </div>

            <p className="text-red-700">{error}</p>

            {isUserRegister ? (
              <button
                onClick={handleLoginClick}
                className="bg-blue-800 hover:opacity-80 py-2 px-4 rounded-full text-white font-bold mt-5"
              >
                Log In
              </button>
            ) : (
              <button
                onClick={handleSignupClick}
                className="bg-blue-800 hover:opacity-80 py-2 px-4 rounded-full text-white font-bold mt-5"
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
                    Sign Up
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
