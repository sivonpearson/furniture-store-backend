import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({ // will edit
  username: { type: String, required: true }, // will delete
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

const User = mongoose.model('User', UserSchema);
export default User;