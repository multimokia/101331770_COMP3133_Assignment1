import { StoredUser } from '../schemas/user';
import jwt, { Secret, JwtPayload } from 'jsonwebtoken';
import { getUserById } from './userService.js';
import { API_SECRET } from '../index.js';

export function signUserToken(user: StoredUser): string {
  return jwt.sign(
    { id: user._id, username: user.username },
    API_SECRET as Secret, { expiresIn: '1h' }
  );
}

export async function getUserFromToken(token: string) {
  // Strip the Bearer prefix from the token and decode
  const _token = token.split(' ')[1];
  const decoded = jwt.verify(_token, API_SECRET as Secret) as JwtPayload;

  // Verify the user id exists in the db
  return await getUserById(decoded.id);
}

export async function verifyUserToken(token: string) {
  const _token = token.split(' ')[1];
  const decoded = jwt.verify(_token, API_SECRET as Secret) as JwtPayload;
  const db_user = await getUserFromToken(token);

  // No user? Token must be invalid
  if (!db_user) {
    return false;
  }

  return decoded.id == db_user._id;
}
