export const getFriends = async (uid) => {
  const res = await fetch(`http://localhost:5000/auth/friends/${uid}`);

  if (!res.ok) {
    const errorData = await res.json();
    return { data: null, error: errorData.message };
  } else {
    const data = await res.json();
    return { data: data, error: null };
  }
};
