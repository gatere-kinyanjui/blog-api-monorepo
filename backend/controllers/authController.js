const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const {
  prismaClientInstance,
} = require("../orm-services/prismaClientInstance");

const opts = {};

const getLoginPage = (req, res) => {
  res.send("Login or Sign up here");
};

const postRegister = async (req, res) => {
  try {
    const { email, password, username } = req.body;
    console.log("AUTH CONTROLLER REGISTRATION BODY: ", req.body);

    const hashedPassword = await bcrypt.hash(password, 10);

    const userToRegister = await prismaClientInstance.user.create({
      data: {
        email,
        password: hashedPassword,
        userName: username,
      },
    });

    res
      .status(201)
      .json({ message: `${userToRegister.userName} created successfully` });
  } catch (error) {
    res
      .status(400)
      .json({ message: "Error registering new user", error: error.message });
  }
};

const postLogin = async (req, res) => {
  try {
    const { email, password, username } = req.body;
    console.log("AUTH CONTROLLER LOGIN BODY: ", req.body);

    const userToLogin = await prismaClientInstance.user.findUnique({
      where: { email },
    });

    if (!userToLogin || !bcrypt.compare(password, userToLogin.password)) {
      return res.status(4001).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign(
      {
        id: userToLogin.id,
        email: userToLogin.email,
        username: userToLogin.userName,
      },
      process.env.JWT_SECRET,
      { expiresIn: "70s" }
    );

    res.json({
      token,
      userToLogin: {
        id: userToLogin.id,
        email: userToLogin.email,
        username: userToLogin.userName,
      },
    });
  } catch (error) {
    res
      .status(400)
      .json({ message: "Error logging in user", error: error.message });
  }
};

// const getProtectedRoute = (req, res) => {
//   return req.status(200).send("A protected route!");
// };

module.exports = { getLoginPage, postRegister, postLogin };
