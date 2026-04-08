import { useEffect, useState } from "react";
import { ChatContext } from "../context/ChatContext";
import { useAuth } from "../hooks/useAuth";
import {
  getMessagesAPI,
  sendMessageMarkAPI,
  sendMessagesAPI,
} from "../services/message/api";

const ChatProvider = ({ children }) => {
  const [friends, setFriends] = useState([]);
  const [messages, setMessages] = useState([]);
  const [lastMessages, setLastMessages] = useState([]);
  const [unseenMessages, setUnseenMessages] = useState({});
  const [selectedFriend, setSelectedFriend] = useState(null);

  const { socket } = useAuth();

  // ------------------------------------------------------------
  // Fetch the user's friend list + unseen message counts.
  // Runs during chat sidebar load. Updates only on success.
  // ------------------------------------------------------------
  // const getFriends = async () => {
  //   try {
  //     const { data } = await getFriendsAPI();
  //     if (data.success) {
  //       setFriends(data.friends);
  //       setUnseenMessages(data.unseenMessages);
  //       setLastMessages(data?.lastMessages);
  //     }
  //   } catch (error) {
  //     console.log(error.message);
  //   }
  // };

  // ------------------------------------------------------------
  // Load chat history for the selected friend.
  // Used when a user clicks a friend from the friends list.
  // ------------------------------------------------------------
  const getMessagesByFriendId = async (friendId) => {
    try {
      const { data } = await getMessagesAPI(friendId);
      if (data.success) {
        setMessages(data.messages);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  // ------------------------------------------------------------
  // Send a message to the currently active chat.
  // Adds the new message locally after backend confirms delivery.
  // ------------------------------------------------------------
  const sendMessage = async (messageData) => {
    try {
      const { data } = await sendMessagesAPI(selectedFriend?.id, messageData);

      if (data.success) {
        setMessages((prevMsg) => [...prevMsg, data.data]);

        const newLastMsg = lastMessages.map((item) => {
          if (item.friendId === selectedFriend?.id) {
            return {
              ...item,
              lastMessage:
                data.data.text || (data.data.image && "sent a photo"),
              lastMessageSenderId: data.data.senderId,
            };
          }
          return item;
        });

        setLastMessages(newLastMsg);
      } else {
        console.log(data.message);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  // ------------------------------------------------------------
  // Listen for new incoming socket messages.
  // If it's from the opened chat → append + mark as seen.
  // If it's from another user → increase unseen count.
  // ------------------------------------------------------------
  const subscribeToMessages = () => {
    if (!socket) return;

    socket.on("newMessage", async (newMessage) => {
      const isCurrentChat =
        selectedFriend && newMessage.senderId === selectedFriend.id;

      if (isCurrentChat) {
        setMessages((prevMsg) => [...prevMsg, newMessage]);

        // Mark as seen in backend
        await sendMessageMarkAPI(newMessage?.id);
      } else {
        // User is online but not currently viewing this friend
        setUnseenMessages((prev) => ({
          ...prev,
          [newMessage.senderId]: prev[newMessage.senderId]
            ? prev[newMessage.senderId] + 1
            : 1,
        }));
      }

      // FIXED: update by friendId, not lastMessageSenderId
      setLastMessages((prev) =>
        prev.map((item) => {
          if (item.friendId === newMessage?.senderId) {
            return {
              ...item,
              lastMessage:
                newMessage.text || (newMessage.image && "sent a photo"),
              lastMessageSenderId: newMessage.senderId,
            };
          }
          return item;
        }),
      );
    });
  };

  // ------------------------------------------------------------
  // Remove socket listener on chat switch + unmount.
  // Prevents duplicate "newMessage" events.
  // ------------------------------------------------------------
  const unsubscribeMessages = () => {
    if (socket) socket.off("newMessage");
  };

  // ------------------------------------------------------------
  // Re-subscribe whenever the socket connects OR the user switches chats.
  // ------------------------------------------------------------
  useEffect(() => {
    subscribeToMessages();
    return () => unsubscribeMessages();
  }, [socket, selectedFriend]);

  // ------------------------------------------------------------
  // Values provided to all child components via context.
  // ------------------------------------------------------------
  const value = {
    friends,
    unseenMessages,
    setUnseenMessages,
    messages,
    lastMessages,
    setLastMessages,
    selectedFriend,
    setMessages,
    setSelectedFriend,

    getMessagesByFriendId,
    sendMessage,
  };

  return <ChatContext value={value}>{children}</ChatContext>;
};

export default ChatProvider;
