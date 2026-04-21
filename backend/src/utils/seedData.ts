import mongoose from 'mongoose';
import dotenv from 'dotenv';
import bcrypt from 'bcryptjs';
import { UserModel } from '../models/User';
import { BatchModel } from '../models/Batch';
import { StudentModel } from '../models/Student';
import { TeacherModel } from '../models/Teacher';
import { AdminModel } from '../models/Admin';

dotenv.config();

const DB = process.env.DATABASE!.replace('<PASSWORD>', process.env.DATABASE_PASSWORD!);

const seed = async () => {
  try {
    await mongoose.connect(DB);
    console.log('Connected to DB...');

    // Clear existing
    await UserModel.deleteMany({});
    await BatchModel.deleteMany({});

    const password = await bcrypt.hash('password123', 12);

    // 1. Create Admin
    const admin = await AdminModel.create({
      name: 'Super Admin',
      email: 'admin@school.com',
      password,
      role: 'ADMIN'
    });

    // 2. Create Teachers
    const teacher1 = await TeacherModel.create({
      name: 'Dr. Sarah Smith',
      email: 'sarah@school.com',
      password,
      role: 'TEACHER',
      specialization: 'Computer Science',
      employeeId: 'T001'
    });

    const teacher2 = await TeacherModel.create({
      name: 'Prof. James Wilson',
      email: 'james@school.com',
      password,
      role: 'TEACHER',
      specialization: 'Mathematics',
      employeeId: 'T002'
    });

    // 3. Create Batches
    const batchA = await BatchModel.create({
      name: 'CS-2024-A',
      year: 2024,
      capacity: 30,
      teacherId: teacher1._id
    });

    const batchB = await BatchModel.create({
      name: 'MATH-2024-B',
      year: 2024,
      capacity: 25,
      teacherId: teacher2._id
    });

    // 4. Create Students
    await StudentModel.create([
      {
        name: 'Alice Johnson',
        email: 'alice@student.com',
        password,
        role: 'STUDENT',
        rollNumber: 'S001',
        batchId: batchA._id,
        guardianName: 'Robert Johnson'
      },
      {
        name: 'Bob Miller',
        email: 'bob@student.com',
        password,
        role: 'STUDENT',
        rollNumber: 'S002',
        batchId: batchA._id,
        guardianName: 'Linda Miller'
      },
      {
        name: 'Charlie Davis',
        email: 'charlie@student.com',
        password,
        role: 'STUDENT',
        rollNumber: 'S003',
        batchId: batchB._id,
        guardianName: 'Karen Davis'
      }
    ]);

    console.log('Data seeded successfully! 🌱');
    process.exit();
  } catch (error) {
    console.error('Error seeding data:', error);
    process.exit(1);
  }
};

seed();
