const router = require("express").Router();
const bcryptjs = require("bcryptjs");
const UserModel = require("../models/User.model.js");
const UserKanjiModel = require("../models/UserKanji.model.js");
const KanjiModel = require("../models/Kanji.model.js");

const jwt = require("jsonwebtoken");
const isAuthenticated = require("../middlewares/isAuthenticated.js");
const { default: mongoose } = require("mongoose");

//POST "/api/auth/signup" User register
router.post("/signup", async (req, res, next) => {
  const { email, password, repeatPassword, username } = req.body;
  // Checking all inputs
  if (!email || !password || !repeatPassword) {
    res.status(400).json({ errorMessage: "All inputs must be filled." });
    return;
  }
  // Password.length >= 8
  if (password.length < 8) {
    res
      .status(400)
      .json({ errorMessage: "Passwords need to have more than 8 characters." });
    return;
  }
  // Passwords match
  if (password !== repeatPassword) {
    res.status(400).json({ errorMessage: "Passwords don't match." });
    return;
  }
  // Regex for password
  const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
  if (passwordRegex.test(password) === false) {
    res.status(400).json({
      errorMessage:
        "Invalid password, need 8 characters, one letter and one number.",
    });
    return;
  }

  try {
    // Check email exists
    const foundUser = await UserModel.findOne({ email });
    const foundUsername = await UserModel.findOne({ username });
    if (foundUsername !== null) {
      res.status(400).json({ errorMessage: "Registered username." });
      return;
    }
    if (foundUser !== null) {
      res.status(400).json({ errorMessage: "Email in use." });
      return;
    }

    // Hash password
    const salt = await bcryptjs.genSalt(10);
    const hashPassword = await bcryptjs.hash(password, salt);

    // Create User
    const dailyKanjisDefault = 15;
    const userId = new mongoose.Types.ObjectId();
    await UserModel.create({
      _id: userId,
      username,
      email,
      password: hashPassword,
      dailyKanjis: dailyKanjisDefault,
      dailyKanjisAddedToday: dailyKanjisDefault,
    });

    // Add First 15 User Kanjis
    const todayDate = new Date().toLocaleDateString();
    const kanjis = await KanjiModel.find({}, { _id: 1 })
      .sort({ number: 1 })
      .limit(dailyKanjisDefault);
    kanjis.forEach((kanjiId) => {
      UserKanjiModel.create({
        user: userId,
        kanji: kanjiId,
        scheduledReview: todayDate,
        new: true,
      });
    });
    res.status(200).json("OK, user created");
  } catch (error) {
    next(error);
  }
});

router.post("/login", async (req, res, next) => {
  const { email, password } = req.body;

  try {
    // Check if email exists
    const foundUser = await UserModel.findOne({ email });
    if (!foundUser) {
      res.status(400).json({ errorMessage: "User not found" });
      return;
    }
    // Validate password
    const passwordMatch = await bcryptjs.compare(password, foundUser.password);
    if (!passwordMatch) {
      res.status(400).json({ errorMessage: "Incorrect password" });
      return;
    }
    // Creation of token JWT
    const payload = {
      id: foundUser._id,
      email: foundUser.email,
    };
    const authToken = jwt.sign(payload, process.env.TOKEN_SECRET, {
      algorithm: "HS256",
      expiresIn: "12h",
    });
    // Send the token
    res.json({ authToken: authToken });
  } catch (error) {
    next(error);
  }
});

router.get("/verify", isAuthenticated, (req, res, next) => {
  // Verify the token each request
  res.json(req.payload);
});

module.exports = router;
