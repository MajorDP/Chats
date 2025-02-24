import { useEffect, useState } from "react";
// import { IPosts } from "../interfaces/posts";
import { getPosts } from "../services/posts-services";
import { IPosts } from "../interfaces/posts";

// interface IUsePosts {
//   posts: IPosts[] | null;
//   error: string | null;
//   isLoading: boolean;
// }
function usePosts() {
  const [postsData, setPostsData] = useState<IPosts[] | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchPosts() {
      const { data, error } = await getPosts();
      if (data) {
        setPostsData(data);
      }
      if (error) {
        setError(error);
      }
    }
    fetchPosts();
    setIsLoading(false);
  }, []);

  return {
    posts: postsData,
    setPosts: setPostsData,
    error: error,
    isLoading: isLoading,
  };
}

export default usePosts;
