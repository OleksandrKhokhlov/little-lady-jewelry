const { Schema, model } = require("mongoose");
const { handlerMongooseErr } = require("../helpers");

const adminSchema = new Schema(
  {
    email: {
      type: String,
      required: [true, "Email is required"],
    },
    password: {
      type: String,
      required: [true, "Set password for admin"],
    },

    token: String,
  },
  { versionKey: false }
);

adminSchema.post('save', handlerMongooseErr);

const Admin = model('admin', adminSchema);

module.exports = Admin;