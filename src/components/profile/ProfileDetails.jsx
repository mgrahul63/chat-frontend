import { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
import {
  FiCalendar,
  FiCheck,
  FiEdit2,
  FiMapPin,
  FiPhone,
} from "react-icons/fi";
import { useAuth } from "../../hooks/useAuth";
import dateConvert from "../../utils/dateConvert";

const ProfileDetails = () => {
  const { authUser, updateProfile } = useAuth();
  const fileInputRef = useRef(null);

  const [profileImage, setProfileImage] = useState(authUser?.image || null);
  const [name, setName] = useState(authUser?.name || "");
  const [bio, setBio] = useState(authUser?.bio || "");
  const [phone, setPhone] = useState(authUser?.phone || "");
  const [location, setLocation] = useState(authUser?.location || "");

  const [isEditingLocation, setIsEditingLocation] = useState(false);
  const [isEditingName, setIsEditingName] = useState(false);
  const [isEditingBio, setIsEditingBio] = useState(false);
  const [isEditingPhone, setIsEditingPhone] = useState(false);

  useEffect(() => {
    if (authUser) {
      setName(authUser.name || "");
      setBio(authUser.bio || "");
      setPhone(authUser.phone || "");
      setLocation(authUser.location || "");
      setProfileImage(authUser.image || null);
    }
  }, [authUser]);

  const handleImageClick = () => fileInputRef.current.click();

  const handleImageChange = async (e) => {
    const imageFile = e.target.files[0];

    if (!imageFile) return;

    if (!imageFile.type.startsWith("image/")) {
      toast.error("Please select an image file.");
      return;
    }

    if (imageFile.size > 2 * 1024 * 1024) {
      toast.error("Image too large (max 2MB).");
      return;
    }

    const reader = new FileReader();

    reader.readAsDataURL(imageFile);

    reader.onload = async () => {
      const base64Image = reader.result;
      setProfileImage(base64Image);
      await updateProfile({ image: base64Image });
    };

    reader.onerror = () => {
      toast.error("Error reading file.");
    };
  };

  const handleSave = async (field, value) => {
    await updateProfile({ [field]: value });

    if (field === "name") setIsEditingName(false);
    if (field === "bio") setIsEditingBio(false);
    if (field === "phone") setIsEditingPhone(false);
    if (field === "location") setIsEditingLocation(false);
  };
  const status = true;

const image =
    authUser?.image != ""
      ? authUser?.image
      : authUser?.providerAvatar != ""
        ? authUser?.providerAvatar
        : "https://via.placeholder.com/150" + "?text=No+Image";
  return (
    <div className="border border-gray-200 bg-white shadow-lg p-6 w-full max-w-md mx-auto">
      {/* Header */}
      <div className="flex flex-col items-center">
        <div className="relative group">
          <div
            onClick={handleImageClick}
            className="w-32 h-32 rounded-full overflow-hidden shadow-md cursor-pointer"
          >
            <input
              type="file"
              accept="image/*"
              hidden
              ref={fileInputRef}
              onChange={handleImageChange}
            />

            <img
              src={image}
              alt="profile"
              className="w-full h-full object-cover"
            />
          </div>

          {/* Online Status */}
          <span
            className={`absolute bottom-2 right-2 w-4 h-4 rounded-full border-2 border-white ${
              status ? "bg-green-500" : "bg-gray-400"
            }`}
          />
        </div>

        {/* Name */}
        <div className="mt-4 flex items-center gap-2">
          {isEditingName ? (
            <>
              <input
                autoFocus
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="border px-3 py-1 rounded-lg text-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              />

              <FiCheck
                size={20}
                className="cursor-pointer text-green-600"
                onClick={() => handleSave("name", name)}
              />
            </>
          ) : (
            <>
              <h2
                className="text-xl font-semibold hover:text-blue-600 cursor-pointer"
                onClick={() => setIsEditingName(true)}
              >
                {name || "No Name"}
              </h2>

              <FiEdit2
                size={18}
                onClick={() => setIsEditingName(true)}
                className="cursor-pointer text-gray-500"
              />
            </>
          )}
        </div>

        <p className="text-gray-500 text-sm mt-1">
          Joined {dateConvert(authUser?.createdAt) || "N/A"}
        </p>
      </div>

      <hr className="my-5" />

      {/* Bio */}
      <div>
        <div className="flex justify-between items-center mb-2">
          <h3 className="font-semibold text-gray-700">Bio</h3>

          {isEditingBio ? (
            <FiCheck
              size={20}
              className="cursor-pointer text-green-600"
              onClick={() => handleSave("bio", bio)}
            />
          ) : (
            <FiEdit2
              size={18}
              onClick={() => setIsEditingBio(true)}
              className="cursor-pointer text-gray-500"
            />
          )}
        </div>

        {isEditingBio ? (
          <textarea
            rows={3}
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            className="w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-400 resize-none"
            placeholder="Write something about yourself..."
          />
        ) : (
          <div className="px-4 py-3 border rounded-xl bg-gray-50 text-sm text-gray-600">
            {bio || "No bio added yet"}
          </div>
        )}
      </div>

      <hr className="my-5" />

      {/* Info Section */}
      <div className="space-y-3 text-sm text-gray-600">
        {/* Location */}
        <div className="flex items-center gap-3">
          <FiMapPin />

          {isEditingLocation ? (
            <>
              <input
                autoFocus
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="border px-3 py-1 rounded-lg text-sm focus:ring-2 focus:ring-blue-400"
                placeholder="Enter location"
              />

              <FiCheck
                size={18}
                className="cursor-pointer text-green-600"
                onClick={() => handleSave("location", location)}
              />
            </>
          ) : (
            <>
              <span>{location || "Location not specified"}</span>

              <FiEdit2
                size={16}
                onClick={() => setIsEditingLocation(true)}
                className="cursor-pointer text-gray-500"
              />
            </>
          )}
        </div>

        {/* Phone */}
        <div className="flex items-center gap-3">
          <FiPhone />

          {isEditingPhone ? (
            <>
              <input
                autoFocus
                type="text"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="border px-3 py-1 rounded-lg text-sm focus:ring-2 focus:ring-blue-400"
                placeholder="Enter phone"
              />

              <FiCheck
                size={18}
                className="cursor-pointer text-green-600"
                onClick={() => handleSave("phone", phone)}
              />
            </>
          ) : (
            <>
              <span>{phone || "Not specified"}</span>

              <FiEdit2
                size={16}
                onClick={() => setIsEditingPhone(true)}
                className="cursor-pointer text-gray-500"
              />
            </>
          )}
        </div>

        {/* Joined */}
        <div className="flex items-center gap-3">
          <FiCalendar />
          <span>Joined {dateConvert(authUser?.createdAt)}</span>
        </div>
      </div>
    </div>
  );
};

export default ProfileDetails;
