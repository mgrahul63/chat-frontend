import { IoArrowBackCircleOutline, IoClose } from "react-icons/io5";
import { useAuth } from "../../../hooks/useAuth";
import { useChat } from "../../../hooks/useChat";
const FriendDetails = ({ setToggle }) => {
  const { onlineUsers } = useAuth();
  const { selectedFriend } = useChat();
  const handleClick = () => {
    setToggle((prev) => !prev);
  };
  const status = onlineUsers.includes(selectedFriend?.id); // online/offline

  const image =
    selectedFriend?.image != ""
      ? selectedFriend?.image
      : selectedFriend?.providerAvatar != ""
        ? selectedFriend?.providerAvatar
        : "https://via.placeholder.com/150" + "?text=No+Image";
  return (
    <div className="flex flex-col h-[90vh] overflow-y-auto bg-white border-l border-gray-200 shadow-lg">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b bg-gray-50">
        <div className="flex items-center gap-3">
          {/* Back button */}
          <button
            onClick={handleClick}
            className=" rounded hover:bg-gray-200 transition cursor-pointer"
          >
            <IoArrowBackCircleOutline size={30} />
          </button>
          <img
            src={image}
            alt="friend avatar"
            className="w-12 h-12 rounded-full"
          />
          <div>
            <h2 className="font-semibold text-gray-800">
              {selectedFriend?.name}
            </h2>
            <p className="text-sm text-green-600">
              {status ? "Online" : "offline"}
            </p>
          </div>
        </div>

        <button
          onClick={handleClick}
          className="p-1 rounded hover:bg-gray-200 transition"
        >
          <IoClose size={22} className="text-gray-700" />
        </button>
      </div>

      {/* About */}
      <div className="px-4 py-4 border-b">
        <h3 className="text-sm font-semibold text-gray-600 mb-1">About</h3>
        <p className="text-sm text-gray-700 leading-relaxed">
          {selectedFriend?.bio}
        </p>
      </div>

      {/* Contact Info */}
      <div className="px-4 py-4 border-b">
        <h3 className="text-sm font-semibold text-gray-600 mb-2">
          Contact Info
        </h3>
        <div className="text-sm text-gray-700 space-y-1">
          <p> {selectedFriend?.email}</p>
          <p> {selectedFriend?.phone}</p>
        </div>
      </div>

      {/* Actions */}
      <div className="px-4 py-4 border-b flex flex-col gap-2">
        <button className="w-full px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition">
          Send Message
        </button>
        <button className="w-full px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 transition">
          Call
        </button>
        <button className="w-full px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 transition">
          Video Call
        </button>
      </div>

      {/* Shared Media */}
      <div className="flex-1 px-4 py-4">
        <h3 className="text-sm font-semibold text-gray-600 mb-3">
          Shared Media
        </h3>

        <div className="grid grid-cols-3 gap-2">
          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15].map((n) => (
            <img
              key={n}
              src={`https://picsum.photos/seed/${n}/100`}
              alt="shared"
              className="w-full h-20 object-cover rounded-md"
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default FriendDetails;
