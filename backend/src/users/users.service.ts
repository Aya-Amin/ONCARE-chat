import { Injectable, ConflictException, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';
import * as admin from 'firebase-admin';
import { SignupDto } from './dto/signup.dto';
import { LoginDto } from './dto/login.dto';
import { User } from './schemas/user.schema';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  async signup(signupDto: SignupDto): Promise<any> {
    const { email, password, userName } = signupDto;
  
    // Check if user exists
    const existingUser = await this.userModel.findOne({ email });
    if (existingUser) {
      throw new ConflictException('User already exists');
    }
  
    // Hash password before saving
    const hashedPassword = await bcrypt.hash(password, 10);
  
    // Create user in Firebase
    const firebaseUser = await admin.auth().createUser({
      email,
      password,
      displayName: userName, // Ensure display name is stored in Firebase
    });
  
    // Save user in MongoDB
    const newUser = new this.userModel({ userName, email, password: hashedPassword });
    await newUser.save();
  
    return { message: 'User registered successfully', uid: firebaseUser.uid };
  }
  
  async login(loginDto: LoginDto): Promise<any> {
    const { email, password } = loginDto;
  
    // Find user in MongoDB
    const user = await this.userModel.findOne({ email });
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }
  
    // Validate password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid credentials');
    }
  
    // Generate Firebase Auth token
    const customToken = await admin.auth().createCustomToken(user.email);
  
    return { token: customToken, user };
  }
}
