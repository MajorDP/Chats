import { useState } from "react";
import ChatContainer from "./chatModal/ChatContainer";

function FriendList() {
  const [selectedFriend, setSelectedFriend] = useState<{
    id: string;
    username: string;
  } | null>(null);
  const currentUser = {
    id: "1",
    email: "asura@abv.bg",
    username: "Asura",
    img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRa8khy-blRnHeXGcPBjvyrlA2s2SumbWnHxw&s",
    status: "Feeling strong rn",
  };

  const mockFriendsData = [
    {
      id: "f1",
      username: "Friend1",
      img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRa8khy-blRnHeXGcPBjvyrlA2s2SumbWnHxw&s",
      status: "I am Friend1, hello",
    },
    {
      id: "f1",
      username: "Friend1",
      img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRa8khy-blRnHeXGcPBjvyrlA2s2SumbWnHxw&s",
      status: "I am Friend1, hello",
    },
  ];
  return (
    <>
      {selectedFriend !== null && (
        <ChatContainer
          currentUserId={currentUser.id}
          selectedFriend={selectedFriend}
          onClose={() => setSelectedFriend(null)}
        />
      )}
      <div className="w-[15rem] m-auto h-fit bg-gradient-to-b from-gray-700 to-slate-800 rounded-xl border border-slate-500 mt-2">
        <h2 className="text-center py-4 font-semilight">Friends</h2>
        <ul>
          {mockFriendsData.map((friend, index) => (
            <li
              className="flex flex-row justify-around p-2 mb-2 gap-1"
              key={index}
            >
              <div className="w-[20%]">
                <img src={friend.img} className="w-full rounded-full" />
              </div>
              <div className="flex justify-around flex-col text-sm w-[40%]">
                <div className="flex flex-row justify-between">
                  <p className="truncate text-xs">{friend.username}</p>
                </div>
                <p className="text-[12px] truncate text-gray-400">
                  {friend.status}
                </p>
              </div>
              <button
                className="w-fit text-[12px] cursor-pointer border h-6 m-auto px-2 py-1 rounded-xl border-slate-400 bg-gray-800 hover:bg-gray-700 duration-300"
                onClick={() =>
                  setSelectedFriend({
                    id: friend.id,
                    username: friend.username,
                  })
                }
              >
                Open chat
              </button>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}

export default FriendList;
