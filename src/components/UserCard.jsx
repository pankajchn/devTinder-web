import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useDispatch } from "react-redux";
import { removeUserFromFeed } from "../utils/feedSlice";

const UserCard = ({ data }) => {
  const dispatch = useDispatch();
  

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

  const { firstName, lastName, photoUrl, about, age, gender, _id } = data;
  return (
    <div className="card bg-base-300 w-80 h-[33rem] shadow-xl mt-8">
      <div className="h-60">
        <img
          src={photoUrl}
          alt="Photo"
          className="w-full h-[120%] object-fill rounded-t-lg"
        />
      </div>
      <div className="card-body">
        <div className="mt-8">
          <h2 className="card-title">
            {firstName} {lastName}
          </h2>
          {age && gender && (
            <h4>
              {age}, {gender}
            </h4>
          )}
          <p>{about}</p>
        </div>
        <div className="card-actions flex justify-center mt-8 relative top-[14px]">
          <button
            className="btn bg-primary"
            onClick={function () {
              handleSendRequest("ignored", _id);
            }}
          >
            Ignored
          </button>
          <button
            className="btn bg-pink-500"
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
