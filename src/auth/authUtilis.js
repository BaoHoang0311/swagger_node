"use strict";
const jwt = require("jsonwebtoken");
const BaoResponse = require("../auth/bao.response");

const authenticationMiddlewareV2 = async (req, res, next) => {
  try {
    const accessToken = req.headers['authorization'];
    if (!accessToken)
      return res.status(401).json(BaoResponse.Fail(401,"Yeu cau dang nhap"));
    try {
      const decodeUser = await jwt.verify(
        accessToken.split(' ')[1],
        "this_is_my_secret_key_051125"
      );
      if (!decodeUser.userid) {
        return res.status(500).json(BaoResponse.Fail("ko tim dc User"));
      }
      req.user = decodeUser;
      next();
    } catch (error) {
      return res.status(500).json(BaoResponse.Fail(error.message));
    }
  } catch (error) {
    return res.status(500).json(BaoResponse.Fail(error.message));
  }
};

module.exports = {
  authenticationMiddlewareV2,
};
