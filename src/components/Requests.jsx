/* eslint-disable react-hooks/exhaustive-deps */
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import axios from "axios";
import { BASE_URL } from "../utils/constants.js";
import { addRequest } from "../utils/requestSlice.js";

const Requests = () => {
  const dispatch = useDispatch();
  const pendingRequests = useSelector((store) => store.request);
  console.log(pendingRequests);

  const fetchPendingRequests = async () => {
    try {
      const res = await axios.get(BASE_URL + "/user/requests/received", {
        withCredentials: true,
      });
      dispatch(addRequest(res?.data?.data));
      console.log(res);
    } catch (error) {
      console.log(error);
    }
  };

 

  useEffect(() => {
    fetchPendingRequests();
  }, []);

  return (
    <div className="relative top-16 flex flex-col items-center">
      <h1 className="my-4 text-white text-lg">Pending Connection Requests</h1>

      {pendingRequests.map(function (request) {
        const { _id } = request;
        const { firstName, lastName, about, photoUrl } = request.fromUserId;
        return (
          <div
            key={_id}
            className="flex items-center justify-between w-2/4 bg-base-300 my-1 px-8 py-4 rounded-sm"
          >
            <div className="flex">
              <div>
                <img src={photoUrl} alt="photo" className="w-20 rounded-md" />
              </div>
              <div className="ms-2">
                <h3 className="text-xl text-white font-semibold">
                  {firstName + " " + lastName}
                </h3>
                <p className="text-gray-500">{about}</p>
              </div>
            </div>
            <div>
              <button className="py-2 px-4 font-semibold text-white rounded-lg mx-1">
                Ignore
              </button>
              <button className="py-2 px-4 bg-blue-800 font-semibold rounded-lg text-white mx-1">
                Accept
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
};
export default Requests;
