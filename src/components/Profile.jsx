import EditProfile from "./EditProfile";
import { useSelector } from "react-redux";

const Profile = () => {
  const user = useSelector((store) => store.user);

  return (
    user && (
      <div className="h-auto min-h-[100vh] overflow-y-auto mt-16 pb-[10rem]">
       
        <EditProfile user={user} />
      </div>
    )
  );
};

export default Profile;
