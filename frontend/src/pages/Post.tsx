import { useParams } from "react-router-dom";
import { IPosts } from "../interfaces/posts";
import { useEffect, useState } from "react";
import Spinner from "../components/Spinner";
import PostLarge from "../components/PostLarge";

function PostPage() {
  const { pid } = useParams();
  const [post, setPost] = useState<IPosts | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const getPost = async () => {
      const res = await fetch(`http://localhost:5000/posts/${pid}`);
      const data = await res.json();
      setPost(data);
      setIsLoading(false);
    };
    getPost();
  }, [pid]);

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <div className="w-full overflow-hidden flex flex-row items-center justify-center rounded-xl mb-16">
      <div className="w-full md:w-full m-auto flex items-center justify-center">
        {post && <PostLarge post={post} setPost={setPost} />}
      </div>
    </div>
  );
}

export default PostPage;
