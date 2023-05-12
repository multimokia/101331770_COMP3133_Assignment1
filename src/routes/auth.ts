import { Router, json } from 'express';
import { loginUser, registerUser } from '../services/userService.js';
import { getUserFromToken } from '../services/jwt.js';

const router = Router();
router.use(json());

router.post('/login', async (req, res) => {
  const { username, password } = req.body;
  const user = await loginUser(username, password);

  if (!user) {
    return res.status(401).send('Invalid username or password.');
  }

  res.status(200).json({
    id: user.id,
    username: user.username,
    email: user.email,
    token: user.token
  });
});

router.post('/signup', async (req, res) => {
  const { username, email, password } = req.body;

  try {
    const newUser = await registerUser({ username, email, password });
    res.status(201).json({
      id: newUser._id,
      username: newUser.username,
      email: newUser.email
    });
  }

  catch (err) {
    const error = err as Error;
    res.status(400).send(error.message);
    return;
  }
});

router.get('/user', async (req, res) => {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).send('No token provided.');
  }

  try {
    return res.status(200).json(await getUserFromToken(token));
  }

  catch (err) {
    const error = err as Error;
    return res.status(401).send(error.message);
  }
});

export { router as authRouter };
