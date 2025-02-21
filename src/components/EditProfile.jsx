/* eslint-disable no-unused-vars */
import { useState } from "react";
import UserCard from "./UserCard";
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { useNavigate } from "react-router";

const EditProfile = ({ user }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [id, setId] = useState(user._id);
  const [firstName, setFirstName] = useState(user.firstName);
  const [lastName, setLastName] = useState(user.lastName);
  const [photoUrl, setPhotoUrl] = useState(user.photoUrl || "");
  const [age, setAge] = useState(user.age || "");
  const [gender, setGender] = useState(user.gender || "");
  const [about, setAbout] = useState(user.about || "");
  const [showToast, setShowToast] = useState(false);

  const handleSaveProfile = async function () {
    try {
      const res = await axios.post(
        BASE_URL + "/profile/edit",
        { firstName, lastName, age, gender, photoUrl, about },
        { withCredentials: true }
      );
      console.log(res)
      dispatch(addUser(res?.data?.data));
      setShowToast(true);
      setTimeout(function () {
        setShowToast(false);
        navigate("/feed");
      }, 3000);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="flex items-center justify-center h-screen">
      <form
        onSubmit={function (e) {
          e.preventDefault();
        }}
        className="w-[23%] flex flex-col items-center justify-center bg-base-300 py-2 mt-5 rounded-lg shadow-lg"
      >
        <h2 className="text-xl font-medium text-white mb-2">Edit Profile</h2>

        <div className="my-1 w-[80%]">
          <label className="block">
            First Name<span className="text-gray-600">*</span>
          </label>
          <input
            type="text"
            className="w-[100%] px-3 py-3 rounded-md text-white "
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
        </div>

        <div className="my-1 w-[80%]">
          <label className="block">
            Last Name<span className="text-gray-600">*</span>
          </label>
          <input
            type="text"
            className="w-[100%] px-3 py-3 rounded-md text-white "
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
        </div>

        <div className="my-1 w-[80%]">
          <label className="block">
            Age<span className="text-gray-600">*</span>
          </label>
          <input
            type="number"
            className="w-[100%] px-3 py-3 rounded-md text-white "
            value={age}
            onChange={(e) => setAge(e.target.value)}
          />
        </div>

        <div className="my-1 w-[80%]">
          <label className="block">
            Gender<span className="text-gray-600">*</span>
          </label>
          <input
            type="text"
            className="w-[100%] px-3 py-3 rounded-md text-white"
            value={gender}
            onChange={(e) => setGender(e.target.value)}
          />
        </div>

        <div className="my-1 w-[80%]">
          <label className="block">
            Photo URL<span className="text-gray-600">*</span>
          </label>
          <input
            type="text"
            className="w-[100%] px-3 py-3 rounded-md text-white"
            value={photoUrl}
            onChange={(e) => setPhotoUrl(e.target.value)}
          />
        </div>

        <div className="my-1 w-[80%]">
          <label className="block">
            About<span className="text-gray-600">*</span>
          </label>
          <textarea
            type="text"
            className="w-[100%] px-3 py-3 rounded-md text-white"
            value={about}
            onChange={(e) => setAbout(e.target.value)}
          ></textarea>
        </div>

        <button
          type="submit"
          className="my-2 bg-blue-700 hover:opacity-45 px-7 py-2 text-white font-semibold rounded-full"
          onClick={handleSaveProfile}
        >
          Save
        </button>
      </form>
      <div className="ms-16">
        <UserCard
          data={{ id, firstName, lastName, age, gender, photoUrl, about }}
        />
      </div>
      {showToast && (
        <div className="toast toast-top toast-center z-[1]">
          <div className="alert alert-info">
            <span>Your profile saved successfully!</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default EditProfile;
