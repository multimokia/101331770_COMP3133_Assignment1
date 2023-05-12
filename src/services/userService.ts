import { StoredUser, User } from '../schemas/user.js';
import bcrypt from 'bcrypt';
import { signUserToken } from './jwt.js';


export async function registerUser(userInfo: User) {
  return await new User({
    username: userInfo.username,
    email: userInfo.email,
    password: bcrypt.hashSync(userInfo.password, 8)
  }).save();
}

export async function loginUser(username: string, password: string) {
  const user = await User.findOne({ username }) as StoredUser;

  if (user === null) {
    return null;
  }

  // compare pws
  const isPasswordValid = bcrypt.compareSync(
    password,
    user.password
  );

  if (!isPasswordValid) {
    return null;
  }

  // Now we know the user is valid, let's generate a token to return with the user
  return {
    id: user._id,
    username: user.username,
    email: user.email,
    token: signUserToken(user)
  };
}

export async function getUserById(id: string) {
  return await User.findById(id);
}
