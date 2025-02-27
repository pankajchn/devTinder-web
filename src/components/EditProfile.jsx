import { useState } from "react";
import UserCard from "./UserCard";
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addUser } from "../utils/userSlice";
import { useNavigate } from "react-router";

const EditProfile = () => {
  const data = useSelector((store) => store.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [firstName, setFirstName] = useState(data.firstName);
  const [lastName, setLastName] = useState(data.lastName);
  const [photoUrl, setPhotoUrl] = useState(data.photoUrl || "");
  const [age, setAge] = useState(data.age || "");
  const [gender, setGender] = useState(data.gender || "");
  const [about, setAbout] = useState(data.about || "");
  const [showToast, setShowToast] = useState(false);
  const [errorToast, setErrorToast] = useState(false);
  const [error, setError] = useState(false);
  const [textError, setTextError] = useState("");

  const handleSaveProfile = async function () {
    setError("");
    setTextError("");

    if (age < 18) {
      setError(true);
    }

    if (!firstName || !lastName || !age || !gender || !photoUrl || !about) {
      setError(false);
      setTextError(false);
      setErrorToast(true);

      setTimeout(() => {
        setErrorToast(false);
      }, 2000);
    }

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
        navigate("/feed");
      }, 2000);
    } catch (error) {
      setTextError(error?.response?.data?.message);
      console.log(error);
    }
  };

  const firstLetterCapital = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  return (
    <div className="flex items-center justify-center px-8 md:px-0 py-4 md:py-0">
      
      <form
        onSubmit={(e) => e.preventDefault()}
        className="flex w-80 md:w-[40%] lg:w-[22%] flex-col items-center justify-center bg-base-300 py-2 mt-5 rounded-lg shadow-lg"
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
          {error && (
            <p className="text-red-700">
              Invalid age: Minimum required age is 18.
            </p>
          )}
        </div>

        <div className="my-1 w-[80%]">
          <label className="block">
            Gender<span className="text-gray-600">*</span>
          </label>
          <input
            type="text"
            placeholder="(Male, Female, Others)"
            className="w-[100%] px-3 py-3 rounded-md text-white placeholder:text-gray-500 placeholder:text-sm"
            value={firstLetterCapital(gender)}
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

        <p className="text-red-700 text-center">{textError}</p>

        <button
          type="submit"
          className="my-2 bg-blue-700 hover:opacity-45 px-12 py-2 text-white font-semibold rounded-xl"
          onClick={handleSaveProfile}
        >
          Save
        </button>
      </form>
      <div className="ms-16 mb-28 hidden md:block ">
        <UserCard
          data={{ firstName, lastName, age, gender, photoUrl, about }}
        />
      </div>
      {showToast && (
        <div className="toast toast-top toast-center z-[1]">
          <div className="alert alert-info">
            <span>Your profile saved successfully!</span>
          </div>
        </div>
      )}

      {errorToast && (
        <div className="toast toast-top toast-center z-[1]">
          <div className="alert alert-error">
            <span>All fields are required.</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default EditProfile;
