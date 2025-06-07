import User from '../models/user.model.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import hashProvide from '../providers/hash.provide.js';
import AuthProvider from '../providers/auth.provide.js';  
import authModel from '../models/user.model.js';
import emailProvider from '../providers/email.provider.js';

class userService {
  async createUser(name, email, password, role) {
    try {
      const newUser = new User({ username: name, email, password, role });
      await newUser.save();
      return newUser._id;
    } catch (err) {
      throw err;
    }
  }

  async getAllUsers() {
    try {
      const users = await User.find();
      return users;
    } catch (err) {
      throw err;
    }
  }

  async getUser(userId) {
    try {
      const user = await User.findById(userId);
      return user;
    } catch (err) {
      throw err;
    }
  }

  async updateUser(userId, userName) {
    try {
      const user = await User.findByIdAndUpdate(userId, { username: userName }, { new: true });
      return user;
    } catch (err) {
      throw err;
    }
  }

  async deleteUser(userId) {
    try {
      const user = await User.findByIdAndDelete(userId);
      if (!user) return null;
      const users = await User.find();
      return users;
    } catch (err) {
      throw err;
    }
  }

  async isEmailExisted(email) {
    const user = await User.findOne({ email });
    return !!user;
  }

  async register(name, email, password, role = 'user') {
      try {
        const isExisted = await User.findOne({ email });
        if (isExisted) {
          throw new Error("Email already exists");
        }

        const newUser = new User({ username: name, email, password, role });
        await newUser.save();
        return newUser._id;
      } catch (err) {
        throw err;
      }
    }

  async login(email, password) {
    try {
      const user = await User.findOne({ email });
      if (!user) throw new Error("Wrong email or password");

      const isMatch = await hashProvide.compareHash(password, user.password);
      if (!isMatch) throw new Error("Wrong email or password");

      const token = await AuthProvider.encodeToken(user);
      return token;
    } catch (err) {
      throw err;
    }
  }

  async getMe(id) {
    try {
      const user = await User.findById(id);
      if (!user) throw new Error("User not found");
      return user;
    } catch (err) {
      throw err;
    }
  }
  async updateProfile(userId, updateData) {
    try {
        const updatedUser = await User.findByIdAndUpdate(
            userId,
            {
                ...(updateData.name && { username: updateData.name }),
                ...(updateData.email && { email: updateData.email })
            },
            { new: true }
        );
        return updatedUser;
    } catch (err) {
        throw err;
    }
}
  async forgotPassword(email) {
    try {
      const user = await User.findOne({ email });
      if (!user) throw new Error("User not found");

      const resetPasswordToken = await bcrypt.genSalt(10);
      const resetPasswordExpiration = new Date(Date.now() + 10 * 60 * 1000);

      const result = await authModel.setResetPasswordToken(resetPasswordToken, resetPasswordExpiration, email);
      if (!result) throw new Error("Cannot reset password");

      emailProvider.sendEmail({
        emailFrom: process.env.SMTP_USER,
        emailTo: email,
        emailSubject: "Reset password",
        emailText: `Here is your token to reset password: ${resetPasswordToken}`
      });
      return true;
    } catch (err) {
      throw err;
    }
  }

  async resetPassword(email, token, newPassword) {
    try {
      const check = await User.checkResetPasswordToken(email, token);
      if (!check) throw new Error("Invalid token or token has expired");

      const hashedPassword = await hashProvide.generateHash(newPassword);
      const result = await authModel.resetPassword(email, hashedPassword);
      if (!result) throw new Error("Cannot reset password");

      return true;
    } catch (err) {
      throw err;
    }
  }
}

export default new userService();
