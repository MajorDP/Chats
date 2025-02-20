import { useEffect, useState } from "react";
import FriendList from "../components/FriendList";
import PostsList from "../components/PostsList";
import { IPosts } from "../interfaces/posts";

function Dashboard() {
  const [posts, setPosts] = useState<IPosts[] | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    const getPosts = async () => {
      const res = await fetch("http://localhost:5000/posts");
      const data = await res.json();
      setPosts(data);
      setIsLoading(false);
    };
    getPosts();
  }, []);

  return (
    <div className="w-full overflow-hidden flex flex-row ml-2 rounded-xl">
      {!isLoading && posts ? (
        <div className="w-full md:w-[70%]">
          <PostsList posts={posts} setPosts={setPosts} />
        </div>
      ) : (
        <p className="w-full overflow-hidden flex flex-row ml-2 rounded-xl">
          Loading...
        </p>
      )}
      <div className="hidden md:block md:w-[70%]">
        <FriendList />
      </div>
    </div>
  );
}

export default Dashboard;
