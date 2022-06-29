const router = require("express").Router();

router.get("/", (req, res, next) => {
  res.json("All good in here");
});

// You put the next routes here 👇

const authRoutes = require('./auth.routes')
router.use("/auth", authRoutes)

const userRoutes = require('./user.routes')
router.use("/user", userRoutes)

const kanjiRoutes = require('./kanji.routes')
router.use("/kanji", kanjiRoutes)


module.exports = router;