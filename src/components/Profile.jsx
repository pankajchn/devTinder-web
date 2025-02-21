import EditProfile from "./EditProfile";
import { useSelector } from "react-redux";

const Profile = () => {
  const user = useSelector((store) => store.user);
  if (!user) return null;

  return (
    user && (
      <div className="relative top-16">
        <EditProfile user={user} />
      </div>
    )
  );
};

export default Profile;
