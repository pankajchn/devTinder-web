/* eslint-disable react-hooks/exhaustive-deps */
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useEffect } from "react";
import { addConnections } from "../utils/connectionSlice";
import Skeleton from "./Skeleton";

const Connections = () => {
  const dispatch = useDispatch();
  const connections = useSelector((store) => store.connection);

  const fetchConnections = async () => {
    try {
      const res = await axios.get(BASE_URL + "/user/connections", {
        withCredentials: true,
      });
      dispatch(addConnections(res?.data?.data));
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchConnections();
  }, []);

  return (
    <div className="relative top-20">
      {!connections ? (
        <div className="flex
        flex-col items-center justify-center mt-4">
          {[...Array(5)].map((_, index) => (
            <Skeleton key={index} />
          ))}
        </div>
      ) : connections.length === 0 ? (
        <h1 className="relative top-16 text-center mb-7 text-lg text-white">
          You have no connections.
        </h1>
      ) : (
        <div className="flex flex-col items-center justify-center">
          <h1 className="mb-5 md:text-lg text-white">All connections</h1>
          {connections.map((connection) => {
            const { firstName, lastName, photoUrl, about, age, gender, _id } =
              connection;
            return (
              <div
                key={_id}
                className="flex bg-base-300 my-1 px-4 py-2 md:px-6 md:py-4 rounded-md shadow-lg w-64 md:w-2/3 lg:w-2/4"
              >
                <div>
                  <img
                    className="w-14 h-14 md:w-20 md:h-16 rounded-sm"
                    src={photoUrl}
                    alt="Photo"
                  />
                </div>
                <div className="ms-6">
                  <h1 className="text-base md:text-xl text-white font-normal md:font-semibold">
                    {firstName + " " + lastName}
                  </h1>
                  <p className=" text-[10px] text-white  md:text-base">
                    {age + ", " + gender}
                  </p>
                  <p className="text-gray-500 w-32 md:w-full text-[10px] md:text-base">
                    {about}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
export default Connections;
