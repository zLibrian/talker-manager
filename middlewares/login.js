const express = require('express');
const crypto = require('crypto');
const loginSchema = require('../schemas/loginSchema');

const router = express.Router();

const handleLogin = (req, res) => {
  const { email, password } = req.body;
  const { error } = loginSchema.validate({ email, password });
  if (error) throw (error);
  const token = crypto.randomBytes(12).toString('base64');
  req.user = { email, password, token };
  return res.status(200).json({ token });
};

router.post('/', handleLogin);

module.exports = router;