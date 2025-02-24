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

export const sendFriendRequest = async (id, username) => {
  const res = await fetch(`http://localhost:5000/auth/friends/add`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ id, username }),
  });
  if (!res.ok) {
    const errorData = await res.json();
    return { success: false, message: errorData.message };
  } else {
    const data = await res.json();
    return { success: true, message: data.message };
  }
};

export const singIn = async (authData) => {
  const res = await fetch("http://localhost:5000/auth/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email: authData.email,
      password: authData.password,
    }),
  });

  if (!res.ok) {
    const errorData = await res.json();
    return { data: false, error: errorData.message };
  } else {
    const data = await res.json();
    return { data: data, error: null };
  }
};

export const singUp = async (authData) => {
  const res = await fetch("http://localhost:5000/auth/register", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email: authData.email,
      username: authData.username,
      password: authData.password,
      repeatPassword: authData.repeatPassword,
    }),
  });

  if (!res.ok) {
    const errorData = await res.json();
    return { data: false, error: errorData.message };
  } else {
    const data = await res.json();
    return { data: data, error: null };
  }
};
