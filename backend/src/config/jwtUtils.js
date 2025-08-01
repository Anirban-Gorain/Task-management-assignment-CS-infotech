const JWT = require("jsonwebtoken");

const SECRET_KEY = process.env.JWT_SECRET;

function getTokenUsingUserID(userID) {
  try {
    const token = JWT.sign({ userID }, SECRET_KEY, { expiresIn: "2d" });

    return token;
  } catch (error) {
    console.log(error.message);
  }
}

function getUserIDUsingToken(token) {
  try {
    const decodedToken = JWT.verify(token, SECRET_KEY);
    console.log(decodedToken);

    return decodedToken.userID;
  } catch (error) {}
}

module.exports = { getTokenUsingUserID, getUserIDUsingToken };
