const { Schema, model } = require("mongoose");

const userKanjiSchema = new Schema({
    user: [{
        type: Schema.Types.ObjectId,
        ref: 'User',
    }],  
    kanji: [{
        type: Schema.Types.ObjectId,
        ref: 'Kanji',
    }],
    scheduledReview: Date,
    new: Boolean,
})    
const UserKanji = model("UserKanji", userKanjiSchema);
module.exports = UserKanji;