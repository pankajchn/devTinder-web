import { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { BASE_URL } from "../utils/constants";
import { useNavigate } from "react-router";

const Login = () => {
  const [emailId, setEmailId] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [isUserLogin, setIsUserLogin] = useState(true);
  const [error, setError] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = async function () {
    setError("");
    try {
      const response = await axios.post(
        BASE_URL + "/login",
        {
          emailId,
          password,
        },
        { withCredentials: true }
      );

      dispatch(addUser(response.data));
      navigate("/feed");
    } catch (err) {
      setError(err.response.data || "Something went wrong");
    }
  };

  const handleSignup = async function () {
    setError("");
    try {
      const res = await axios.post(
        BASE_URL + "/signup",
        { firstName, lastName, emailId, password },
        { withCredentials: true }
      );

      dispatch(addUser(res?.data?.data));
      navigate("/profile");
    } catch (err) {
      setError(err.res.data || "Something went wrong");
    }
  };

  return (
    <div className="flex justify-center pb-24">
      <div className="card bg-base-300 shadow-md w-64 md:w-96 mt-24">
        <div className="card-body">
          <h2 className="card-title mx-auto text-2xl relative bottom-3">
            {!isUserLogin ? "SignUp" : "Login"}
          </h2>

          {!isUserLogin && (
            <>
              {" "}
              <label className="form-control w-full max-w-xs">
                <div className="label">
                  <span className="label-text">First Name :</span>
                </div>
                <input
                  type="text"
                  className="input input-bordered w-full max-w-xs"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                />
              </label>
              <label className="form-control w-full max-w-xs">
                <div className="label">
                  <span className="label-text">Last Name :</span>
                </div>
                <input
                  type="text"
                  className="input input-bordered w-full max-w-xs"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                />
              </label>{" "}
              <p>{error}</p>
            </>
          )}

          <label className="form-control w-full max-w-xs">
            <div className="label">
              <span className="label-text">Email ID :</span>
            </div>
            <input
              type="text"
              className="input input-bordered w-full max-w-xs"
              value={emailId}
              onChange={(e) => setEmailId(e.target.value)}
            />
          </label>
          <label className="form-control w-full max-w-xs mt-2">
            <div className="label">
              <span className="label-text">Password :</span>
            </div>
            <input
              type="password"
              className="input input-bordered w-full max-w-xs"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </label>

          <p className="text-red-500 mt-1">{error}</p>
          <button
            className="btn btn-primary mt-[15px] w-20 h-8 font-semibold mx-auto"
            onClick={!isUserLogin ? handleSignup : handleLogin}
          >
            {!isUserLogin ? "SignUp" : "Login"}
          </button>

          <p className="text-center mt-3">
            {!isUserLogin ? (
              <>
                Existing User?{" "}
                <span
                  className="hover:underline cursor-pointer text-blue-500"
                  onClick={() => setIsUserLogin((value) => !value)}
                >
                  Log In
                </span>
              </>
            ) : (
              <>
                New User?{" "}
                <span
                  className="hover:underline cursor-pointer text-blue-500"
                  onClick={() => setIsUserLogin((value) => !value)}
                >
                  Sign Up
                </span>
              </>
            )}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
