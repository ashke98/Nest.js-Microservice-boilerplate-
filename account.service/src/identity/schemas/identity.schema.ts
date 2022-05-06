import * as mongoose from 'mongoose';

export const IdentitySchema = new mongoose.Schema({
  name: String,
  username: String,
  password: String,
});