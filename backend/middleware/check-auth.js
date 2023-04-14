
const dotenv = require("dotenv");
dotenv.config();
//is sync working? yes
module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];

    if (token == process.env.AUTH_KEY){

      next();
    }
    next();
  } catch (error) {
    console.log("notauth");
    res.status(401).json({
      message: "AUTHFAIL",
    });
  }
};
