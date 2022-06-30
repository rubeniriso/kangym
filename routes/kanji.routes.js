const isAuthenticated = require("../middlewares/isAuthenticated.js");
const UserModel = require("../models/User.model.js");
const KanjiModel = require("../models/Kanji.model.js");
const UserKanjiModel = require("../models/UserKanji.model.js");
const router = require("express").Router();

// GET "/api/kanji/:userId" => get Kanji list by user id
router.get("/:userId", isAuthenticated, async (req, res, next) => {
  const { userId } = req.params;
  if (userId === undefined) {
    res.json({ errorMessage: "User not found" });
    return;
  }
  try {
    const kanjiIds = await UserKanjiModel.find({}, { kanji: 1, _id: 0 })
      .where("user")
      .equals(userId)
      .where("scheduledReview")
      .lte(new Date().toLocaleDateString()).lean();
    if (kanjiIds.length === 0) {
      res.json({ errorMessage: "Kanjis finished" });
      return;
    }
    const arrayIds = []
    kanjiIds.forEach(element => {
        arrayIds.push(element['kanji'].toString());
    })
    const response = await KanjiModel.find({
        '_id': {$in: arrayIds}
    }, {kanji: 1, _id:0, meaning: 1})
    .sort({ number: 1 })

    return res.json(response).status(200);
  } catch (error) {
    console.log(error);
    //next(error);
  }
});

module.exports = router;
