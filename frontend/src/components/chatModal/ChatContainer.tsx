import ReactDOM from "react-dom";
import ChatInput from "./ChatInput";
import Chat from "./Chat";

interface IChat {
  currentUserId: string;
  selectedFriend: {
    id: string;
    username: string;
  };
  onClose: () => void;
}

const chatMessages = [
  {
    userId: "f1",
    datePosted: "12:30AM, 19.02.2025",
    userImg:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRa8khy-blRnHeXGcPBjvyrlA2s2SumbWnHxw&s",
    message: "Hey man",
  },
  {
    userId: "67bc5eb4957cca8f7f48bdcf",
    datePosted: "12:30AM, 19.02.2025",
    userImg:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRa8khy-blRnHeXGcPBjvyrlA2s2SumbWnHxw&s",
    message: "Hey man",
    img: "https://cdn.discordapp.com/attachments/648600190919376897/1341571085082034288/IMG_8501.jpg?ex=67b67aef&is=67b5296f&hm=3266b5f53671bf22db6d5ea81fdabaafd45db7adb9297ae54cbe3b99a39d93a8&",
  },
  {
    userId: "67bc5eb4957cca8f7f48bdcf",
    datePosted: "12:30AM, 19.02.2025",
    userImg:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRa8khy-blRnHeXGcPBjvyrlA2s2SumbWnHxw&s",
    message: "Hey man",
    img: "https://cdn.discordapp.com/attachments/648600190919376897/1341571085082034288/IMG_8501.jpg?ex=67b67aef&is=67b5296f&hm=3266b5f53671bf22db6d5ea81fdabaafd45db7adb9297ae54cbe3b99a39d93a8&",
  },
];

function ChatContainer({ currentUserId, selectedFriend, onClose }: IChat) {
  console.log(currentUserId);
  console.log(selectedFriend);
  return ReactDOM.createPortal(
    <>
      <div
        className="absolute top-0 left-0 w-full h-full bg-black opacity-50 z-10"
        onClick={onClose}
      ></div>

      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full h-full md:w-[80%] md:h-[90%] bg-gradient-to-b from-gray-700 to-slate-800 rounded-xl border border-slate-500 z-20">
        <button
          className="absolute right-3 top-2 text-lg bg-gray-800 p-1 rounded-full"
          onClick={onClose}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="w-6 h-6 cursor-pointer text-white hover:text-gray-400"
          >
            <path
              d="M6 18L18 6M6 6l12 12"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>

        <h2 className="text-center mt-2 text-lg">{selectedFriend.username}</h2>

        <div className="h-full rounded-b-xl">
          <Chat chat={chatMessages} currentUserId={currentUserId} />
          <div className="h-[10%] px-2 py-1 rounded-b-xl border-t border-slate-500">
            <ChatInput />
          </div>
        </div>
      </div>
    </>,
    document.body
  );
}

export default ChatContainer;
