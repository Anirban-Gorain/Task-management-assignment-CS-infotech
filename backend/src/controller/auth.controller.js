const userServices = require("../services/user.services");
const {
  getTokenUsingUserID,
  getUserIDUsingToken,
} = require("../config/jwtUtils");

async function register(req, res) {
  try {
    const { email, password } = req.body;

    const user = await userServices.createAdmin(email, password);
    const token = await getTokenUsingUserID(user._id);

    return res
      .status(200)
      .send({ user, token, message: "Admin is created successfully" });
  } catch (e) {
    return res.status(500).send({ error: e.message });
  }
}

async function login(req, res) {
  try {
    const { email, password } = req.body;

    const foundUser = await userServices.findUserByEmail(email);

    if (!foundUser) {
      res
        .status(400)
        .send({ message: `User with Email: ${email} is not found` });
      return;
    }

    const isPasswordMatches = foundUser.password === password;

    if (!isPasswordMatches) {
      res.status(401).send({ message: `Entered incorrect password` });
      return;
    }

    const token = getTokenUsingUserID(foundUser._id);

    foundUser.password = undefined;
    console.log(token);

    return res
      .status(200)
      .send({ user: foundUser, token, message: "login success" });
  } catch (e) {
    return res.status(500).send({ error: e.message });
  }
}

async function loginUsingToken(req, res) {
  try {
    const token = req.headers.authorization.split(" ")[1];

    const userID = getUserIDUsingToken(token);

    const foundUser = await userServices.findUserById(userID);

    if (!foundUser) {
      res.status(400).send({ message: `Toke is wrong` });
      return;
    }

    foundUser.password = undefined;

    return res
      .status(200)
      .send({ user: foundUser, token, message: "login success" });
  } catch (e) {
    return res.status(500).send({ error: e.message });
  }
}

module.exports = { register, login, loginUsingToken };
