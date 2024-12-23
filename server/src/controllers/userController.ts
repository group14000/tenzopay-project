import { Request, Response } from 'express';
import { User } from '../models/User';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret';
const JWT_REFRESH_SECRET = process.env.JWT_REFRESH_SECRET || 'your_refresh_secret';

// Sign up User

export const registerUser = async (req: Request, res: Response): Promise<void> => {
    const { firstName, lastName, email, role, mobileNumber, password } = req.body;

    try {
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            res.status(400).json({ message: 'Email already exists' });
            return;
        }

        const newUser = new User({ firstName, lastName, email, role, mobileNumber, password });
        await newUser.save();

        res.status(201).json({
            message: 'User registered successfully',
            user: {
                userId: newUser.userId,
                firstName: newUser.firstName,
                lastName: newUser.lastName,
                email: newUser.email,
                role: newUser.role,
                mobileNumber: newUser.mobileNumber,
            },
        });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};

// login user
export const loginUser = async (req: Request, res: Response): Promise<void> => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });
        if (!user) {
            res.status(404).json({ message: 'User not found' });
            return;
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            res.status(401).json({ message: 'Invalid credentials' });
            return;
        }

        const mainToken = jwt.sign({ userId: user.userId, email: user.email }, JWT_SECRET, { expiresIn: '1h' });
        const refreshToken = jwt.sign({ userId: user.userId, email: user.email }, JWT_REFRESH_SECRET, { expiresIn: '7d' });

        res.status(200).json({
            tokens: {
                mainToken,
                refreshToken,
            },
        });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};

// profile

export const getUserProfile = async (req: Request, res: Response): Promise<void> => {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        res.status(401).json({ message: 'Authorization token missing or invalid' });
        return;
    }

    const token = authHeader.split(' ')[1];

    try {
        const decoded = jwt.verify(token, JWT_SECRET) as { userId: string };
        const user = await User.findOne({ userId: decoded.userId }).select('-password');

        if (!user) {
            res.status(404).json({ message: 'User not found' });
            return;
        }

        res.status(200).json({ user });
    } catch (error) {
        res.status(401).json({ message: 'Invalid or expired token', error });
    }
};

//validate-token

export const validateToken = async (req: Request, res: Response): Promise<void> => {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        res.status(200).json({ isValid: false });
        return;
    }

    const token = authHeader.split(' ')[1];

    try {
        jwt.verify(token, JWT_SECRET);
        res.status(200).json({ isValid: true });
    } catch (error) {
        res.status(200).json({ isValid: false });
    }
};
