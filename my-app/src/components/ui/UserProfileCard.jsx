import { FaUserCircle } from "react-icons/fa";

const UserProfileCard = () => {
  const user = JSON.parse(localStorage.getItem("user") || "null");

  if (!user) return null;

  return (
    <div className="profile-card">
      <FaUserCircle size={48} />
      <div>
        <h4>{user.name}</h4>
        <p>{user.email}</p>
      </div>
    </div>
  );
};

export default UserProfileCard;
