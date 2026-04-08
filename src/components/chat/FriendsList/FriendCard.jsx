import { useAuth } from "../../../hooks/useAuth";
import { useChat } from "../../../hooks/useChat";

const FriendCard = ({ friend, OnClick }) => {
  const { authUser, onlineUsers } = useAuth();
  const { selectedFriend, unseenMessages, lastMessages } = useChat();

  const status = onlineUsers.includes(friend?.id); // online/offline

  const count = unseenMessages[friend?.id];

  const lastMsg = lastMessages.find((msg) => msg.friendId === friend?.id);
  const yourMessage =
    lastMsg?.lastMessageSenderId === authUser?._id ? lastMsg.lastMessage : null;
  const friendMessage =
    lastMsg?.lastMessageSenderId !== authUser?._id ? lastMsg.lastMessage : null;

  const isSelected = selectedFriend?.id === friend?.id;

  const image =
    friend?.image != ""
      ? friend?.image
      : friend?.providerAvatar != ""
        ? friend?.providerAvatar
        : "https://via.placeholder.com/150" + "?text=No+Image";
  return (
    <div
      onClick={OnClick}
      className={`flex items-center justify-between px-3 py-2 cursor-pointer border-b border-gray-300 shadow ${isSelected ? "bg-blue-100" : ""}`}
    >
      {/* LEFT: Avatar + Info */}
      <div className="flex items-center gap-3">
        {/* Avatar */}
        <div className="relative w-10 h-10">
          <img
            src={image}
            alt={friend?.name}
            className="w-10 h-10 rounded-full object-cover"
          />

          {/* Online badge */}
          {status && (
            <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-400 border-2 border-white rounded-full" />
          )}
        </div>

        {/* Name + Last Message */}
        <div className="flex flex-col">
          <h3 className="font-semibold text-gray-700 text-sm">
            {friend?.name}
          </h3>

          <p
            className={`text-xs max-w-40 truncate ${yourMessage ? "text-gray-500" : count ? "text-gray-950 text-bold" : "text-gray-500"}`}
          >
            {yourMessage
              ? `You: ${yourMessage}`
              : friendMessage
                ? friendMessage.length > 20
                  ? friendMessage.slice(0, 20) + "..."
                  : friendMessage
                : null}
          </p>
        </div>
      </div>

      {/* RIGHT: Unseen Count */}
      {count > 0 && (
        <span className="min-w-5 h-5 flex items-center justify-center bg-blue-600 text-white text-xs rounded-full">
          {count}
        </span>
      )}
    </div>
  );
};

export default FriendCard;
