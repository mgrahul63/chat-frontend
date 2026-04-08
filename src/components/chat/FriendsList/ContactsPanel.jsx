import { useEffect, useState } from "react";
import { useAuth } from "../../../hooks/useAuth";
import { useChat } from "../../../hooks/useChat";
import { getFriendsAPI } from "../../../services/message/api";
import FriendCard from "./FriendCard";
const ContactsPanel = () => {
  const { onlineUsers } = useAuth();
  const { setSelectedFriend, setUnseenMessages, setLastMessages } = useChat();

  const [users, setUsers] = useState([]);
  useEffect(() => {
    const fetchFriends = async () => {
      try {
        const friendsData = await getFriendsAPI(); 
        setUsers(friendsData?.friends || []); 
        setUnseenMessages(friendsData?.unseenMessages);
        setLastMessages(friendsData?.lastMessages);
      } catch (error) {
        console.error("Error fetching friends:", error);
      }
    };
    fetchFriends();
  }, [onlineUsers]);

  const handleClick = (friend) => {
    setSelectedFriend(friend);
    setUnseenMessages((prev) => ({
      ...prev,
      [friend?.id]: 0,
    }));
  };
  return (
    <div className="flex flex-col overflow-y-auto h-[90vh] bg-gray-100 shadow-sm overflow-hidden z-10">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3">
        <h2 className="font-semibold text-gray-800 text-lg">Messages</h2>
        <button className="text-gray-500 hover:text-blue-500 text-xl">✚</button>
      </div>

      {/* Search */}
      <div className="px-4 py-2 border-b border-gray-300">
        <input
          type="text"
          placeholder="Search..."
          className="w-full px-3 py-2 text-sm border bg-gray-300 border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
      </div>

      {/* Contacts List */}
      <div className="flex-1 overflow-y-auto ">
        {users?.map((friend) => (
          <FriendCard
            key={friend.id}
            friend={friend}
            OnClick={() => handleClick(friend)}
          />
        ))}
      </div>
    </div>
  );
};

export default ContactsPanel;
