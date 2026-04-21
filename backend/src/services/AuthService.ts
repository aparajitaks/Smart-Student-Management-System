import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { UserModel } from '../models/User';
import { AppError } from '../utils/AppError';
import { IUser } from '../interfaces/User.interface';

export class AuthService {
  private signToken(id: string) {
    return jwt.sign({ id }, process.env.JWT_SECRET!, {
      expiresIn: process.env.JWT_EXPIRES_IN
    });
  }

  private signRefreshToken(id: string) {
    return jwt.sign({ id }, process.env.JWT_REFRESH_SECRET!, {
      expiresIn: process.env.JWT_REFRESH_EXPIRES_IN
    });
  }

  async login(email: string, password: string) {
    const user = await UserModel.findOne({ email }).select('+password');

    if (!user || !(await bcrypt.compare(password, user.password))) {
      throw new AppError('Incorrect email or password', 401);
    }

    const token = this.signToken(user._id as string);
    const refreshToken = this.signRefreshToken(user._id as string);

    user.refreshToken = refreshToken;
    await user.save({ validateBeforeSave: false });

    return { user, token, refreshToken };
  }

  async refreshToken(token: string) {
    try {
      const decoded = jwt.verify(token, process.env.JWT_REFRESH_SECRET!) as any;
      const user = await UserModel.findById(decoded.id).select('+refreshToken');

      if (!user || user.refreshToken !== token) {
        throw new AppError('Invalid refresh token', 401);
      }

      const newToken = this.signToken(user._id as string);
      const newRefreshToken = this.signRefreshToken(user._id as string);

      user.refreshToken = newRefreshToken;
      await user.save({ validateBeforeSave: false });

      return { token: newToken, refreshToken: newRefreshToken };
    } catch (error) {
      throw new AppError('Invalid refresh token', 401);
    }
  }

  async register(data: Partial<IUser>) {
    const hashedPassword = await bcrypt.hash(data.password!, 12);
    const user = await UserModel.create({
      ...data,
      password: hashedPassword
    });

    const token = this.signToken(user._id as string);
    return { user, token };
  }
}
