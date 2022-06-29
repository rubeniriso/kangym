const { Schema, model } = require("mongoose");

const kanjiSchema = new Schema({
    kanji: String,
    number: Number,
    chapter: Number,
    meaning: String,
}, { collection: 'kanji'});
const Kanji = model("Kanji", kanjiSchema);
module.exports = Kanji;