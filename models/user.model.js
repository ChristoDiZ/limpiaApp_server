const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  firstname: { type: String },
  lastname: { type: String },
  email: {
    type: String,
    unique: true,
    required: true
  },
  password: { type: String },
  active: { type: Boolean, default: true },
  role: {
    type: String,
    enum: ['usuario', 'limpiador'],
    default: 'usuario',
    required: true
  }
});

module.exports = mongoose.model("User", UserSchema);
