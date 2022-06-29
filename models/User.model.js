const {
  default: InitGenerator,
} = require("@webpack-cli/generators/lib/init-generator");
const { Schema, model } = require("mongoose");

const userSchema = new Schema({
  email: {
    type: String,
    unique: true,
  },
  password: String,
  username: String,
  dailyKanjis: { type: Number, default: 15 },
  // EFFICIENCY MAYBE??
  // lastStudiedKanji: Integer
  dailyKanjisAddedToday: { type: Number, default: 15 },
});
const User = model("User", userSchema);
module.exports = User;
