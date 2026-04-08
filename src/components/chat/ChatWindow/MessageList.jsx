import { useAuth } from "../../../hooks/useAuth";

const MessageList = ({ msg }) => {
  const { authUser } = useAuth();
  const yourId = authUser?.id;
  const isYourMessage = msg.senderId === yourId;

  return (
    <div className={`flex ${isYourMessage ? "justify-end" : "justify-start"}`}>
      <div>
        <p
          className={`max-w-xs px-2 py-2 rounded-lg shadow
                ${
                  isYourMessage
                    ? "bg-blue-500 text-white rounded-br-none"
                    : "bg-white text-gray-800 rounded-bl-none"
                }
              `}
        >
          {msg.text}
        </p>
        <span
          className={`text-xs text-gray-400 mt-1 ms-1 block 
                  ${isYourMessage ? "text-right" : "text-left"}
                  `}
        >
          {new Date(msg?.createdAt).toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          })}
        </span>
      </div>
    </div>
  );
};

export default MessageList;
