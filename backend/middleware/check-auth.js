
const dotenv = require("dotenv");
dotenv.config();
//is sync working? yes
module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];

    if (token == process.env.AUTH_KEY){

      next();
    } else {
      console.log(token)
      console.log(process.env.AUTH_KEY)
      console.log("notauth");
      res.status(401).json({
        message: "AUTHFAIL",
      });
    }

  } catch (error) {
    console.log(token)
    console.log("notauth");
    res.status(401).json({
      message: "AUTHFAIL",
    });
  }
};
