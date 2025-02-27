/* eslint-disable react-hooks/exhaustive-deps */
import axios from "axios";
import { BASE_URL } from "../utils/constants.js";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addFeed } from "../utils/feedSlice.js";
import UserCard from "./UserCard.jsx";
import SkeletonCard from "./SkeletonCard.jsx";

const Feed = () => {
  const dispatch = useDispatch();
  const feed = useSelector((store) => store.feed);

  const getFeed = async function () {
    if (feed) return;
    try {
      const res = await axios.get(BASE_URL + "/user/feed", {
        withCredentials: true,
      });
      dispatch(addFeed(res?.data?.data));
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(function () {
    getFeed();
  }, []);

  return (
    <div>
      {!feed ? (
        <div className="h-screen flex justify-center items-center">
          <SkeletonCard />
        </div>
      ) : feed.length === 0 ? (
        <h1 className="text-center text-white my-24 text-lg">
          No new users found
        </h1>
      ) : (
        <div className="flex justify-center items-center  my-[90px]">
          <UserCard data={feed[0]} />
        </div>
      )}
    </div>
  );
};

export default Feed;
