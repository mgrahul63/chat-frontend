import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { useChat } from "../../hooks/useChat";
import ChatWindow from "./ChatWindow/ChatWindow";
import FriendDetails from "./FriendDetails/FriendDetails";
import ContactsPanel from "./FriendsList/ContactsPanel";
import DummyUI from "./dummyUi";

const ChatDashboard = () => {
  const [toggle, setToggle] = useState(true);
  const { selectedFriend } = useChat(); 
  return (
    <div
      className={`px-5 h-[90vh] grid grid-cols-1 bg-gray-800
    ${
      selectedFriend
        ? "md:grid-cols-[1.5fr_1.5fr] xl:grid-cols-[1fr_2fr]"
        : "md:grid-cols-2"
    }`}
    >
      <ContactsPanel />

      {selectedFriend ? (
        <AnimatePresence mode="wait">
          {toggle ? (
            <motion.div
              key="chat"
              initial={{ x: toggle ? -200 : 200, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: toggle ? -200 : 200, opacity: 0 }}
              transition={{ duration: 0.25 }}
            >
              <ChatWindow setToggle={setToggle} />
            </motion.div>
          ) : (
            <motion.div
              key="details"
              initial={{ x: toggle ? -200 : 200, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: toggle ? -200 : 200, opacity: 0 }}
              transition={{ duration: 0.25 }}
            >
              <FriendDetails setToggle={setToggle} />
            </motion.div>
          )}
        </AnimatePresence>
      ) : (
        <DummyUI />
      )}
    </div>
  );
};

export default ChatDashboard;
