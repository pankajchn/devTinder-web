import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useDispatch } from "react-redux";
import { removeUserFromFeed } from "../utils/feedSlice";

const UserCard = ({ data }) => {
  const dispatch = useDispatch();
  const { firstName, lastName, photoUrl, about, age, gender, _id } = data;

  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  const handleSendRequest = async function (status, userId) {
    try {
      await axios.post(
        BASE_URL + "/request/send/" + status + "/" + userId,
        {},
        { withCredentials: true }
      );
      dispatch(removeUserFromFeed(userId));
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="card bg-base-300 w-80 shadow-xl">
      <div className="h-60">
        <img
          src={photoUrl}
          alt="Photo"
          className="w-full h-[120%] object-fill rounded-t-lg"
        />
      </div>
      <div className="card-body text-white">
        <div className="mt-8">
          <h2 className="card-title text-2xl">
            {capitalizeFirstLetter(firstName) +
              " " +
              capitalizeFirstLetter(lastName)}
          </h2>
          
            <p className="text-gray-300">
              {age}, {gender}
            </p>
          
          <p className="text-gray-400">{about}</p>
        </div>
        <div className="flex flex-row justify-around mt-4">
          <button
            className="bg-blue-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-opacity-80"
            onClick={function () {
              handleSendRequest("ignored", _id);
            }}
          >
            Ignored
          </button>
          <button
            className=" bg-pink-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-opacity-80"
            onClick={function () {
              handleSendRequest("interested", _id);
            }}
          >
            Interested
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserCard;
