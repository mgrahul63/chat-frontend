import {
  IoArrowBackCircleOutline,
  IoCallOutline,
  IoEllipsisVertical,
  IoVideocamOutline,
} from "react-icons/io5";
import { useAuth } from "../../../hooks/useAuth";
import { useChat } from "../../../hooks/useChat";

const FrndHeader = ({ onClick, onCloseClick, profilePic, fullName }) => {
  const { selectedFriend } = useChat();
  const { onlineUsers } = useAuth();
  const status = onlineUsers.includes(selectedFriend?.id); // online/offline

  const image =
    profilePic?.image != ""
      ? profilePic?.image
      : profilePic?.providerAvatar != ""
        ? profilePic?.providerAvatar
        : "https://via.placeholder.com/150" + "?text=No+Image";
  return (
    <div className="flex items-center justify-between px-4 py-3 border-b bg-gray-50">
      <div className="flex items-center gap-3">
        {/* Back button */}
        <button
          onClick={onClick}
          className=" rounded hover:bg-gray-200 transition cursor-pointer"
        >
          <IoArrowBackCircleOutline size={30} />
        </button>
        <img
          src={profilePic}
          alt={fullName}
          className="w-10 h-10 rounded-full"
        />
        <div>
          <h2 className="font-semibold text-gray-800">{fullName}</h2>

          <p
            className={`text-sm ${status ? "text-green-600" : "text-red-600"}`}
          >
            {status ? "Online" : "Offline"}
          </p>
        </div>
      </div>
      <div className="flex items-center gap-3 text-gray-600">
        <button className="p-1 rounded hover:text-blue-500 transition cursor-pointer">
          <IoCallOutline size={20} />
        </button>

        <button className="p-1 rounded hover:text-blue-500 transition cursor-pointer">
          <IoVideocamOutline size={22} />
        </button>

        <button
          onClick={onCloseClick}
          className="p-1 rounded hover:text-blue-500 transition cursor-pointer"
        >
          <IoEllipsisVertical size={22} />
        </button>
      </div>
    </div>
  );
};

export default FrndHeader;
