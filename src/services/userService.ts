import { User } from '../schemas/user.js';
import bcrypt from 'bcrypt';


export async function registerUser(userInfo: User) {
  return await new User({
    username: userInfo.username,
    email: userInfo.email,
    password: bcrypt.hashSync(userInfo.password, 8)
  }).save();
}

export async function loginUser(username: string, password: string) {
  const user = await User.findOne({ username });

  if (user === null) {
    return user;
  }

  // compare pws
  const isPasswordValid = bcrypt.compareSync(
    password,
    user.password
  );

  if (!isPasswordValid) {
    return null;
  }

  return user;
}
