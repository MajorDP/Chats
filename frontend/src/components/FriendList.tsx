import { useContext, useState } from "react";
import ChatContainer from "./chatModal/ChatContainer";
import { AuthContext } from "../context/UserContext";
import Spinner from "./Spinner";
import Error from "./Error";
import useFriends from "../hooks/useFriends";

function FriendList() {
  const { user } = useContext(AuthContext);
  const { friends, error, isLoading } = useFriends(user.id);
  const [selectedFriend, setSelectedFriend] = useState<{
    id: string;
    username: string;
  } | null>(null);

  return (
    <>
      {selectedFriend && (
        <ChatContainer
          currentUserId={user.id as string}
          selectedFriend={selectedFriend}
          onClose={() => setSelectedFriend(null)}
        />
      )}
      <div className="w-[15rem] m-auto h-fit bg-gradient-to-b from-gray-900 to-blue-950 rounded-xl border border-blue-900 mt-2">
        <h2 className="text-center py-4 font-semilight">Friends</h2>

        {error && <Error error={error} />}

        {isLoading ? (
          <Spinner />
        ) : friends.length > 0 ? (
          <ul>
            {friends.map((friend) => (
              <li
                className="flex flex-row justify-around p-2 mb-2 gap-1"
                key={friend.id}
              >
                <div className="w-[20%]">
                  <img
                    src={friend.img}
                    className="w-full rounded-full"
                    alt={friend.username}
                  />
                </div>
                <div className="flex justify-around flex-col text-sm w-[40%]">
                  <div className="flex flex-row justify-between">
                    <p className="truncate text-xs">{friend.username}</p>
                  </div>
                  <p className="text-[12px] truncate text-gray-400">
                    {/* {friend.status} */}status later
                  </p>
                </div>
                <button
                  className="w-fit text-[12px] cursor-pointer border h-6 m-auto px-2 py-1 rounded-xl border-blue-900 bg-gray-700 hover:bg-gray-800 duration-300"
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
        ) : (
          <p className="text-center text-gray-400 py-2 text-xs">
            No friends found, maybe add some?
          </p>
        )}
      </div>
    </>
  );
}

export default FriendList;
