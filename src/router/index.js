const express = require("express");
const jwt = require("jsonwebtoken");
const BaoResponse = require("../auth/bao.response");
const { authenticationMiddlewareV2 } = require("../auth/authUtilis");
const router = express.Router();

router.post("/api/login", async (req, res, next) => {
  const { username, password } = req.body;

  if (username == "bao" && password == "1234") {
    let accesstoken = await jwt.sign(
      { userid: 1, name: "bao", age: "30", title: "dev" },
      "this_is_my_secret_key_051125",
      {
        expiresIn: "1 days",
      }
    );
    return res
      .status(200)
      .json(BaoResponse.Success("", { token: accesstoken }));
  }
  return res.status(500).json("login failed");
});

router.get("/api/get1", authenticationMiddlewareV2, async (req, res, next) => {
  return res.status(200).json({ data: "/api/get1", info: req.user });
});

router.get("/api/get2", async (req, res, next) => {
  return res.status(200).json({ data: "/api/get2" });
});

router.get("/api/get3/:name", async (req, res, next) => {
  return res.status(200).json({ data: `get3: params: ${req.params.name} / query (id/name): ${req.query.id}/${req.query.age}` });
});

module.exports = router;
