import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addConnections } from "../utils/connectionSlice";

const Connections = () => {
  const dispatch = useDispatch();
  const connections = useSelector((store) => store.connection);

  const fetchConnections = async function () {
    if (connections) return;
    try {
      const res = await axios.get(BASE_URL + "/user/connections", {
        withCredentials: true,
      });
      dispatch(addConnections(res?.data?.data));
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(function () {
    fetchConnections();
  }, []);

  if (!connections) return;

  if (connections.length === 0)
    return <h1 className="flex justify-center mt-24"> No Connections Found</h1>;

  return (
    connections && (
      <div className="flex flex-col items-center pb-96 pt-16">
        <h1 className="font-semibold text-[16px] md:text-xl my-5 text-opacity-100 ">
          All Connections
        </h1>
        {connections.map(function (connection) {
          const { firstName, lastName, _id, age, about, gender, photoUrl } =
            connection;
          return (
            <div
              key={_id}
              className="flex rounded-md bg-base-300 w-80 md:w-[35rem] my-2 px-2 py-2"
            >
              <div>
                <img
                  src={photoUrl}
                  alt="Photo"
                  className="w-16 h-16 rounded-full mt-[6px] ms-[10px]"
                />
              </div>
              <div className="mx-10">
                <h2 className="text-lg font-bold">
                  {firstName + " " + lastName}
                </h2>
                {age && gender && <p>{age + ", " + gender}</p>}
                <p>{about}</p>
              </div>
            </div>
          );
        })}
      </div>
    )
  );
};

export default Connections;
