import express from 'express';
import { registerUser, loginUser, getUserProfile, validateToken } from '../controllers/userController';

const router = express.Router();

router.post('/signup', registerUser);
router.post('/login', loginUser);
router.get('/profile', getUserProfile);
router.get('/validate-token', validateToken);

export default router;