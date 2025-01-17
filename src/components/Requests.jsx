import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addRequest, removeRequest } from "../utils/requestSlice";

const Requests = () => {
  const dispatch = useDispatch();
  const pendingRequests = useSelector((store) => store.request);

  const fetchRequest = async function () {
    try {
      const res = await axios.get(BASE_URL + "/user/requests/received", {
        withCredentials: true,
      });

      dispatch(addRequest(res?.data?.data));
    } catch (err) {
      console.log(err);
    }
  };

  const reviewRequest = async function (status, _id) {
    try {
      await axios.post(
        BASE_URL + "/request/review/" + status + "/" + _id,
        {},
        { withCredentials: true }
      );
      dispatch(removeRequest(_id));
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(function () {
    fetchRequest();
  }, []);

  if (!pendingRequests) return;

  if (pendingRequests.length === 0)
    return <h1 className="flex justify-center mt-24"> No Requests Found</h1>;

  return (
    pendingRequests && (
      <div className="flex flex-col items-center my-16">
        <h1 className="font-semibold text-[18px] my-5 text-opacity-100 ">
          Pending Requests
        </h1>
        {pendingRequests.map(function (req) {
          const { firstName, lastName, _id, age, about, gender, photoUrl } =
            req.fromUserId;
          return (
            <div
              key={_id}
              className="flex rounded-md bg-base-300 md:w-[40rem] w-[400px] my-2 items-center"
            >
              <div>
                <img
                  src={photoUrl}
                  alt="Photo"
                  className="md:w-16 md:h-16 w-12 h-12 rounded-full mt-[6px] ms-[10px]"
                />
              </div>
              <div className="mx-10 w-[20rem] ms-4">
                <h2 className="md:text-xl md:font-bold text-base">{firstName + " " + lastName}</h2>
                {age && gender && (
                  <p className="md:text-[16px] text-[10px] ">{age + ", " + gender}</p>
                )}
                <p className="md:text-[16px] text-[10px] md:w-80 w-52">{about}</p>
              </div>
              <div className="flex">
                <button
                  className="btn btn-outline btn-info hidden md:block"
                  onClick={function () {
                    reviewRequest("accepted", req._id);
                  }}
                >
                  Accept
                </button>
                <button
                  className="btn btn-outline btn-error mx-2 hidden md:block"
                  onClick={function () {
                    reviewRequest("rejected", req._id);
                  }}
                >
                  Reject
                </button>
              </div>


              <div className="flex md:hidden">
                <button
                  className="btn btn-circle me-1"
                  onClick={function () {
                    reviewRequest("accepted", req._id);
                  }}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-3 w-3"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                    />
                  </svg>
                </button>
                <button
                  className="btn btn-circle"
                  onClick={function () {
                    reviewRequest("rejected", req._id);
                  }}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-3 w-3"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>
            </div>
          );
        })}
      </div>
    )
  );
};

export default Requests;
