const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },
    username: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    isAdmin: {
      type: Boolean,
      required: true,
      default: false,
    },
    favouriteProducts: [
      {
        type: "ObjectId",
        ref: "Product",
        required: true,
      },
    ],
  },
  { timestamps: true }
);

userSchema.methods.passwordsMatch = async function (password) {
  const match = await bcrypt.compare(password, this.password);
  return match;
};

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }

  const hash = await bcrypt.hash(this.password, 10);
  this.password = hash;
});

module.exports = mongoose.model("User", userSchema);
