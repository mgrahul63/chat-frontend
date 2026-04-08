import { useEffect, useRef } from "react";
import { useAuth } from "../../../hooks/useAuth";
import { useChat } from "../../../hooks/useChat";
import FrndHeader from "./FrndHeader";
import InputMessage from "./InputMessage";
import MessageList from "./messageList";

const ChatWindow = ({ setToggle }) => {
  const { authUser } = useAuth();
  const { messages, selectedFriend, setSelectedFriend, getMessagesByFriendId } =
    useChat();
  const bottomRef = useRef(null);

  const name = selectedFriend?.name;
  const image =
    selectedFriend?.image != ""
      ? selectedFriend?.image
      : selectedFriend?.providerAvatar != ""
        ? selectedFriend?.providerAvatar
        : "https://via.placeholder.com/150" + "?text=No+Image";
  // Filter messages between current user and selected friend

  useEffect(() => {
    getMessagesByFriendId(selectedFriend?.id);
  }, [selectedFriend]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleCloseClick = () => {
    setToggle((prev) => !prev);
  };

  const handleBack = () => {
    setSelectedFriend(null);
  };

  return (
    <div className="flex h-[90vh] flex-col overflow-y-auto bg-white border border-gray-200 shadow-sm overflow-hidden">
      {/* Header */}
      <FrndHeader
        onClick={handleBack}
        onCloseClick={handleCloseClick}
        profilePic={image}
        fullName={name}
      />

      {/* Messages area */}
      <div className="flex-1 p-4 space-y-3 overflow-y-auto bg-gray-100">
        {messages?.map((msg) => (
          <MessageList key={msg?.id} msg={msg} />
        ))}
        <div ref={bottomRef} />
      </div>

      {/* Input area */}
      <InputMessage />
    </div>
  );
};

export default ChatWindow;
