import * as mongoose from "mongoose";

const Schema = mongoose.Schema;

export const UserSchema = new Schema({
  firstName: {
    type: String,
    required: "Enter a First name"
  },
  lastName: {
    type: String,
    required: "Enter a Last name"
  },
  email: {
    type: String,
    required: "Enter a Email"
  },
  phone: {
    type: Number,
    required: "Enter a Mobile number"
  },
  key:{
    type: String,
    required: "Enter Key"
  },
  created_date: {
    type: Date,
    default: Date.now
  }
});
