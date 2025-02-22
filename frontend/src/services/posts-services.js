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
  } else {
    const data = await res.json();
    return { data: data, error: null };
  }
};

export const postComment = async (pid, commentObj) => {
  console.log(commentObj);
  const res = await fetch(`http://localhost:5000/posts/comment/${pid}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(commentObj),
  });

  if (!res.ok) {
    const errorData = await res.json();
    return { data: null, error: errorData };
  } else {
    const data = await res.json();
    return { data: data, error: null };
  }
};
