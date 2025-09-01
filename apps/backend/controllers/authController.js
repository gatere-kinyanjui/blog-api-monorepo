const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const {
  prismaClientInstance,
} = require("../orm-services/prismaClientInstance");
const dashboardRouter = require("../routes/dashboardRouter");

const getLoginPage = async (req, res) => {
  res.send("Login or Sign up here");
};

const postRegister = async (req, res) => {
  try {
    const { email, password, username } = req.body;

    const userExists = await prismaClientInstance.user.findUnique({
      where: { email: email },
    });

    if (userExists) {
      console.log("user exists");
      res.status(400).json({ message: "user already exists." });
    } else {
      console.log("AUTH CONTROLLER REGISTRATION BODY: ", req.body);

      const hashedPassword = await bcrypt.hash(password, 10);

      const userToRegister = await prismaClientInstance.user.create({
        data: {
          email,
          password: hashedPassword,
          user_name: username,
        },
      });

      console.log("[AUTH CONTROLLER USER REGISTERED]: ", userToRegister);

      res
        .status(201)
        .json({ message: `${userToRegister.user_name} created successfully` });
    }
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error registering new user", error: error.message });
  }
};
// TODO: LOGIN IS NOT PASSWORD-PROTECTED..!!!
const postLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log("AUTH CONTROLLER LOGIN BODY: ", req.body);

    const userToLogin = await prismaClientInstance.user.findUnique({
      where: { email },
    });

    if (!userToLogin) {
      console.error("[AUTH CONTROLLER]: User to login does not exist");
      return res.status(401).json({ message: "user does not exist" });
    }

    if (!bcrypt.compareSync(password, userToLogin.password)) {
      console.error("[AUTH CONTROLLER]: Invalid password");
      return res.status(401).json({ message: "Invalid password" });
    }

    const token = jwt.sign(
      {
        id: userToLogin.id,
        email: userToLogin.email,
        username: userToLogin.user_name,
      },
      process.env.JWT_SECRET,
      { expiresIn: "600s" }
    );

    res.json({
      token,
      userToLogin: {
        id: userToLogin.id,
        email: userToLogin.email,
        username: userToLogin.user_name,
      },
    });

    console.log(
      `AUTH CONTROLLER LOGIN TOKEN: , ${token} WHOSE DATA TYPE IS ${typeof token}`
    );
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error logging in user", error: error.message });
  }
};

module.exports = { getLoginPage, postRegister, postLogin };
