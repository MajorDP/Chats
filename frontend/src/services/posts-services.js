export const updateVote = async (uid, pid, voteType) => {
  const res = await fetch(`http://localhost:5000/posts/${voteType}/${pid}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ userId: uid }),
  });

  if (!res.ok) {
    const errorData = await res.json();
    return { data: null, error: errorData };
  }

  const data = await res.json();
  return { data: data, error: null };
};

export const postComment = async (uid, pid, comment) => {
  const res = await fetch(`http://localhost:5000/posts/comment/${pid}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ uid: uid, comment: comment }),
  });

  if (!res.ok) {
    const errorData = await res.json();
    return { data: null, error: errorData };
  }

  const data = await res.json();
  return { data: data, error: null };
};

export const getPosts = async () => {
  const res = await fetch("http://localhost:5000/posts");

  if (!res.ok) {
    const errorData = await res.json();
    return { data: null, error: errorData.message };
  }

  const data = await res.json();
  return { data, error: null };
};
