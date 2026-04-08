import { useRef, useState } from "react";
import {
  IoAttachOutline,
  IoDocumentTextOutline,
  IoFileTrayOutline,
} from "react-icons/io5";
import { useChat } from "../../../hooks/useChat";

// File type icons
const fileTypeIcons = {
  pdf: <IoDocumentTextOutline size={24} className="text-red-500" />,
  csv: <IoDocumentTextOutline size={24} className="text-green-500" />,
  docx: <IoDocumentTextOutline size={24} className="text-blue-500" />,
  default: <IoFileTrayOutline size={24} className="text-gray-500" />,
};

const InputMessage = () => {
  const { sendMessage } = useChat();

  const [message, setMessage] = useState("");
  const [filePreviews, setFilePreviews] = useState([]); // array of { type, url or name }, this state only display
  const fileInputRef = useRef(null);

  const handleFileClick = () => fileInputRef.current.click();

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const ext = file.name.split(".").pop().toLowerCase();

    if (file.type.startsWith("image/")) {
      setFilePreviews((prev) => [
        ...prev,
        { type: "image", file, url: URL.createObjectURL(file) }, // keep file for sending
      ]);
    } else {
      setFilePreviews((prev) => [
        ...prev,
        { type: ext in fileTypeIcons ? ext : "default", file, name: file.name }, // keep file for sending
      ]);
    }
  };

  const removeFile = (index) => {
    setFilePreviews((prev) => prev.filter((_, i) => i !== index));
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleSend = async (e) => {
    // If triggered by keyboard, prevent form submit
    if (e) e.preventDefault();

    // Stop only if both are empty
    if (message.trim() === "" && filePreviews.length === 0) {
      return;
    }
    const messageData = {
      text: message.trim(),
      // image: filePreviews ? filePreviews : "",
    };
    await sendMessage(messageData);

    // const formData = new FormData();

    // // Add message only if it exists
    // if (trimmed !== "") {
    //   formData.append("text", trimmed);
    // }

    // // Add files only if they exist
    // if (filePreviews.length > 0) {
    //   filePreviews.forEach((f) => {
    //     formData.append("files[]", f.file);
    //   });
    // }

    // TODO: send to backend API
    // await axios.post("/sendMessage.php", formData);

    // reset input and previews
    setMessage("");
    setFilePreviews([]);
  };

  return (
    <div className="flex flex-col gap-2 px-4 py-3 border-t bg-white">
      {filePreviews?.length > 0 && (
        <div className="flex items-center gap-2 overflow-x-auto mb-2">
          {filePreviews?.map((file, index) => (
            <div key={index} className="relative flex items-center">
              {file?.type === "image" ? (
                <img
                  src={file?.url}
                  alt="preview"
                  className="w-16 h-16 object-cover rounded"
                />
              ) : (
                <div className="flex items-center gap-1 p-2 border rounded bg-gray-100">
                  {fileTypeIcons[file?.type] || fileTypeIcons?.default}
                  <span className="text-sm">{file?.name}</span>
                </div>
              )}
              <button
                onClick={() => removeFile(index)}
                className="absolute -top-2 -right-2 text-gray-500 hover:text-red-500 bg-white rounded-full p-1"
              >
                ✕
              </button>
            </div>
          ))}
        </div>
      )}

      <div className="flex items-center gap-2">
        {/* Hidden file input */}
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileChange}
          className="hidden"
        />

        <button
          type="button"
          onClick={handleFileClick}
          className="p-2 rounded-full hover:bg-gray-200 transition"
        >
          <IoAttachOutline size={24} />
        </button>

        <input
          type="text"
          placeholder="Type a message..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={handleKeyDown}
          className="flex-1 px-4 py-2 border border-gray-300 rounded-full focus:ring-2 focus:ring-blue-400 outline-none"
        />

        <button
          onClick={handleSend}
          className="bg-blue-500 text-white px-4 py-2 rounded-full hover:bg-blue-600 transition"
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default InputMessage;
