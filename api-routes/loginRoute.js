const fs = require('fs');
const path = require('path');

const router = require('express').Router();

// POST
// /api/login
router.post('/', (req, res) => {
  try {
    const username = req.body.username;
    const password = req.body.password;

    if (!username || !password) {
      res.send({ message: 'Need username & password' });
      return;
    }

    if (username === 'adib' && password === 'adib') {
      res.send({ message: 'Valid credential', token: 'ayamgoreng' });
      return;
    } else {
      res.status(401).send({ message: 'Invalid credential', token: null });
      return;
    }
  } catch (err) {
    res.send({ message: err });
  }
});

module.exports = router;
