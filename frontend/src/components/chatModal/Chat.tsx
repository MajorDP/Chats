import { useEffect, useRef } from "react";
import { IChat } from "../../interfaces/chat";

interface IChatProps {
  chat: IChat[];
  currentUserId: string;
}

function Chat({ chat, currentUserId }: IChatProps) {
  //FOR DISPLAYING CHAT BETWEEN USERS
  const chatRef = useRef(null);

  useEffect(() => {
    if (chatRef.current) {
      //@ts-expect-error ref
      chatRef.current.scrollTop = chatRef.current.scrollHeight;
    }
  }, []);
  return (
    <ul
      className="w-full h-[85%] p-2 overflow-y-scroll scrollbar-hide"
      ref={chatRef}
    >
      {chat.map((message) => (
        <li
          className={`flex mt-5 gap-2 ${
            message.userId !== currentUserId
              ? "justify-start"
              : "justify-end text-end"
          } `}
        >
          {message.userId !== currentUserId && (
            <div>
              <img
                src={message.userImg}
                className="max-w-[50px] rounded-full"
              />
            </div>
          )}
          <div className="flex flex-col">
            <p className="text-[14px] text-gray-400">{message.datePosted}</p>
            {message.message && <p>{message.message}</p>}
            {message.img && <img src={message.img} className="max-w-[200px]" />}
          </div>
          {message.userId === currentUserId && (
            <div>
              <img
                src={message.userImg}
                className="max-w-[50px] rounded-full"
              />
            </div>
          )}
        </li>
      ))}
    </ul>
  );
}

export default Chat;
