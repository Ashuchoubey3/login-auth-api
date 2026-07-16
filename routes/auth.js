const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const db = require("../configure/db");

const router = express.Router();

const SECRET = "mysecretkey";


// router.get("/login", (req, res) => {
//   res.send("Login API is running. Please use POST to log in.");
// });
// router.get("/signup", (req, res) => {
//   res.send("Signup API is running. Please use POST to sign up.");
// });


router.post("/signup", async (req, res) => {
  const { name, email, password } = req.body;

  db.query(
    "SELECT * FROM users WHERE email=?",
    [email],
    async (err, result) => {
      if (err) {
        return res.status(500).json({ message: "Database error" });
      }

      if (result.length > 0) {
        return res.status(400).json({
          message: "Email already exists",
        });
      }

      const hash = await bcrypt.hash(password, 10);

      db.query(
        "INSERT INTO users(name,email,password) VALUES(?,?,?)",
        [name, email, hash],
        (err) => {
          if (err) {
            return res.status(500).json({ message: "Database error" });
          }

          res.json({
            message: "User Registered Successfully",
          });
        },
      );
    },
  );
});


    
router.post("/login", (req, res) => {
  const { email, password } = req.body;

  db.query(
    "SELECT * FROM users WHERE email=?",
    [email],
    async (err, result) => {
      if (err) {
        return res.status(500).json({ message: "Database error" });
      }

      if (result.length === 0) {
        return res.status(404).json({
          message: "User Not Found",
        });
      }

      const user = result[0];

      const match = await bcrypt.compare(password, user.password);

      if (!match) {
        return res.status(401).json({
          message: "Wrong Password",
        });
      }

      const token = jwt.sign(
        {
          id: user.id,
        },
        SECRET,
        {
          expiresIn: "1h",
        },
      );

      res.json({
        message: "Login Successful",
        token,
      });
    },
  );
});
module.exports = router;