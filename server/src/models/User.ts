import mongoose, { Schema, Document, CallbackError } from 'mongoose';
import bcrypt from 'bcryptjs';
import { v4 as uuidv4 } from 'uuid';

export interface IUser extends Document {
    userId: string;
    firstName: string;
    lastName: string;
    email: string;
    role: string;
    mobileNumber: string;
    password: string;
}

const UserSchema: Schema = new Schema({
    userId: { type: String, default: uuidv4 },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    role: { type: String, required: true },
    mobileNumber: { type: String, required: true },
    password: { type: String, required: true },
});

UserSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next();
    try {
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password as string, salt);
        next();
    } catch (error: unknown) {
        next(error as CallbackError);
    }
});

const User = mongoose.model<IUser>('User', UserSchema);
export { User };
