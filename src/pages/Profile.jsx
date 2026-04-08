import ProfileActivites from "../components/profile/ProfileActivites";
import ProfileDetails from "../components/profile/ProfileDetails";
 
const Profile = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-[1fr_2.5fr] p-3 sm:p-4 md:px-6 md:py-2 lg:px-6 lg:py-2 min-h-screen bg-linear-to-br from-blue-600 via-purple-600 to-pink-300">
      {/* LEFT SIDE */}
      <ProfileDetails />
      {/* RIGHT SIDE (Future Scope) */}
      <ProfileActivites />
    </div>
  );
};

export default Profile;
