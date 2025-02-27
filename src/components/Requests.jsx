/* eslint-disable react-hooks/exhaustive-deps */
import { useDispatch, useSelector } from "react-redux";
import { BASE_URL } from "../utils/constants";
import axios from "axios";
import { addRequest, removeRequest } from "../utils/requestSlice";
import { useEffect } from "react";
import Skeleton from "./Skeleton";

const Requests = () => {
  const dispatch = useDispatch();
  const pendingRequests = useSelector((store) => store.request);

  const fetchPendingRequests = async () => {
    try {
      const res = await axios.get(BASE_URL + "/user/requests/received", {
        withCredentials: true,
      });
      dispatch(addRequest(res?.data?.data));
    } catch (error) {
      console.log(error);
    }
  };

  const reviewRequest = async (status, id) => {
    try {
      await axios.post(
        BASE_URL + `/request/review/${status}/${id}`,
        {},
        { withCredentials: true }
      );
      dispatch(removeRequest(id));
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchPendingRequests();
  }, []);

  return (
    <div>
      {!pendingRequests ? (
        <div
          className="flex
        flex-col items-center justify-center mt-20"
        >
          {[...Array(5)].map((_, index) => (
            <Skeleton key={index} />
          ))}
        </div>
      ) : pendingRequests.length === 0 ? (
        <h1 className="text-center relative text-white top-20 text-lg">
          No pending request found.
        </h1>
      ) : (
        <div className="relative top-16 flex flex-col items-center h-screen">
          <h1 className="my-4 text-white text-base md:text-lg">
            Pending connection requests
          </h1>

          {pendingRequests.map(function (request) {
            console.log(request);
            const { _id } = request;
            const { firstName, lastName, about, photoUrl } = request.fromUserId;
            return (
              <div
                key={_id}
                className="flex flex-col lg:flex-row items-center justify-between w-64 md:w-2/3 lg:w-4/5 xl:w-1/2 bg-base-300 my-1 px-4 py-4 rounded-md  shadow-lg"
              >
                <div className="flex">
                  <div>
                    <img
                      src={photoUrl}
                      alt="photo"
                      className="w-14 h-14 md:w-20 md:h-16 rounded-sm"
                    />
                  </div>
                  <div className="ms-2">
                    <h3 className="text-base md:text-xl text-white md:font-semibold">
                      {firstName + " " + lastName}
                    </h3>
                    <p className="text-[10px] w-40 md:w-[25rem] md:text-base text-gray-500">
                      {about}
                    </p>
                  </div>
                </div>
                <div className="mt-3 md:flex">
                  <button
                    onClick={() => reviewRequest("rejected", _id)}
                    className="py-1 px-3 text-[12px] md:text-base md:py-2 md:px-4 font-semibold border border-pink-500 text-white rounded-full mx-1"
                  >
                    Ignore
                  </button>
                  <button
                    onClick={() => reviewRequest("accepted", _id)}
                    className="py-1 px-3 text-[12px] md:text-base md:py-2 md:px-4 shadow-lg border border-blue-700 font-semibold rounded-full text-white mx-1"
                  >
                    Accept
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
export default Requests;
