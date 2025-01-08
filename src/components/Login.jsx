import { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { BASE_URL } from "../utils/constants";
import { useNavigate } from "react-router";

const Login = () => {
  const [emailId, setEmailId] = useState("pankaj@gmail.com");
  const [password, setPassword] = useState("Pankaj@123");
  const [error, setError] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = async function () {
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
      setError(err.response.data);
    }
  };
  return (
    <div className="flex justify-center mt-12">
      <div className="card bg-base-300 shadow-md  w-96 h-[380px]">
        <div className="card-body">
          <h2 className="card-title mx-auto text-2xl relative bottom-3">
            Login
          </h2>
          <label className="form-control w-full max-w-xs">
            <div className="label">
              <span className="label-text">Email ID :</span>
            </div>
            <input
              type="text"
              placeholder="Type here"
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
              type="text"
              placeholder="Type here"
              className="input input-bordered w-full max-w-xs"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </label>
          <p className="text-red-500 mt-1">{error}</p>
          <button
            className="btn btn-primary mt-[15px] w-20 h-8 font-semibold mx-auto"
            onClick={handleLogin}
          >
            Login
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
