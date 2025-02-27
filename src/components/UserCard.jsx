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
    <div className="card bg-base-300 h-[26rem] w-64 md:h-[32rem] md:w-80 md:pb-[34rem]">
      <div>
        <img src={photoUrl} alt="Photo" className="w-full h-64 md:h-80 object-fill rounded-t-lg" />
      </div>
      <div className="card-body text-white">
        <div>
          {firstName && lastName && (
            <h2 className="card-title text-lg font-semibold md:text-2xl">
              {capitalizeFirstLetter(firstName) +
                " " +
                capitalizeFirstLetter(lastName)}
            </h2>
          )}

          <p className="text-gray-300 text-xs md:text-base">
            {`${age} years, ${gender}`}
          </p>

          <p className="text-gray-500 text-xs md:text-base">{about}</p>
        </div>
        <div className="flex flex-row items-center justify-center mt-3">
          <button
            className="bg-blue-600 text-white text-xs md:text-base px-3 py-2 md:px-4 md:py-2 mx-2 rounded-md md:font-semibold hover:bg-opacity-80"
            onClick={function () {
              handleSendRequest("ignored", _id);
            }}
          >
            Ignored
          </button>
          <button
            className=" bg-pink-600 text-white text-xs md:text-base px-3 py-2 md:px-4 md:py-2 mx-2 rounded-md md:font-semibold hover:bg-opacity-80"
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
