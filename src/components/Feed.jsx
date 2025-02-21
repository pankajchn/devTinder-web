/* eslint-disable react-hooks/exhaustive-deps */
import axios from "axios";
import { BASE_URL } from "../utils/constants.js";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addFeed } from "../utils/feedSlice.js";
import UserCard from "./UserCard.jsx";

const Feed = () => {
  const dispatch = useDispatch();
  const feed = useSelector((store) => store.feed);

  const getFeed = async function () {
    if (feed) return;
    try {
      const res = await axios.get(BASE_URL + "/user/feed", {
        withCredentials: true,
      });
      console.log(res);
      dispatch(addFeed(res?.data?.data));
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(function () {
    getFeed();
  }, []);

  if (!feed) return;
  if (feed.length === 0) {
    return <h1 className="text-center my-24 text-lg">No new users found</h1>;
  }

  return (
    feed && (
      <div className="flex justify-center  my-[90px]">
        <UserCard data={feed[0]} />
      </div>
    )
  );
};

export default Feed;
