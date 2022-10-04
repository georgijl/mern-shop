const routerAuth = require("express").Router();
const verify = require("./verifyToken");

routerAuth.get("/", verify, (req, res) => {
  res.send(req.user);
});

module.exports = routerAuth;
