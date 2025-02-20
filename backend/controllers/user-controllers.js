const HttpError = require("../models/httpError");

const mockUserData = [
  {
    id: "1",
    email: "asura@abv.bg",
    password: "123123",
    username: "Asura",
  },
];

const login = async (req, res, next) => {
  const { email, password } = req.body;

  const user = mockUserData.find(
    (user) => user.email === email && user.password === password
  );

  if (!user) {
    return next(new HttpError("Invalid credentials", 404));
  }

  res.json({ id: user.id, email: user.email, username: user.username });
};

exports.login = login;
