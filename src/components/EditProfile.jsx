import { useState } from "react";
import UserCard from "./UserCard";
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { useNavigate } from "react-router";

const EditProfile = ({ user }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate()

  const [firstName, setFirstName] = useState(user.firstName);
  const [lastName, setLastName] = useState(user.lastName);
  const [age, setAge] = useState(user.age);
  const [gender, setGender] = useState(user.gender);
  const [photoUrl, setPhotoUrl] = useState(user.photoUrl);
  const [about, setAbout] = useState(user.about);
  const [showToast, setShowToast] = useState(false);

  const handleSaveProfile = async function () {
    try {
      const res = await axios.post(
        BASE_URL + "/profile/edit",
        { firstName, lastName, age, gender, photoUrl, about },
        { withCredentials: true }
      );

      dispatch(addUser(res?.data?.data));
      setShowToast(true);
      setTimeout(function () {
        setShowToast(false);
        navigate("/feed")
      }, 3000);
      
      
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="flex justify-center">
      <div className="hidden md:block ">
      <UserCard data={{ firstName, lastName, age, gender, photoUrl, about }} />
      </div>
      <div className="flex flex-col items-center md:bg-base-300 md:w-[22rem] me-44 my-5 ms-48 rounded-xl mx-10">
        <h2 className="text-2xl font-bold mt-3 mb-3">Edit Profile</h2>
        <div className="mt-1">
          <label className="form-control  max-w-xs">
            <div className="label">
              <span className="label-text">First Name :</span>
            </div>
            <input
              type="text"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              className=" input input-bordered w-full max-w-xs"
            />
          </label>
          <label className="form-control max-w-xs">
            <div className="label">
              <span className="label-text">Last Name :</span>
            </div>
            <input
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              type="text"
              className=" input input-bordered w-full max-w-xs"
            />
          </label>
          <label className="form-control max-w-xs">
            <div className="label">
              <span className="label-text">Age :</span>
            </div>
            <input
              value={age}
              onChange={(e) => setAge(e.target.value)}
              type="text"
              className=" input input-bordered w-full max-w-xs"
            />
          </label>
          <label className="form-control max-w-xs">
            <div className="label">
              <span className="label-text">Gender :</span>
            </div>
            <input
              value={gender}
              onChange={(e) => setGender(e.target.value)}
              type="text"
              className=" input input-bordered w-full max-w-xs"
            />
          </label>
          <label className="form-control max-w-xs">
            <div className="label">
              <span className="label-text">Photo URL :</span>
            </div>
            <input
              value={photoUrl}
              onChange={(e) => setPhotoUrl(e.target.value)}
              type="text"
              className=" input input-bordered w-full max-w-xs"
            />
          </label>
          <label className="form-control max-w-xs">
            <div className="label">
              <span className="label-text">About :</span>
            </div>
            <textarea
              value={about}
              onChange={(e) => setAbout(e.target.value)}
              className=" textarea w-[250px] textarea-bordered textarea-xs  max-w-xs"
            ></textarea>
          </label>
        </div>
        <button
          className="btn btn-primary my-8 font-bold text-slate-900"
          onClick={handleSaveProfile}
        >
          Save Profile
        </button>
        {showToast && (
          <div className="toast toast-top toast-center z-10">
            <div className="alert alert-info">
              <span>Your profile saved succesfully!</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default EditProfile;
