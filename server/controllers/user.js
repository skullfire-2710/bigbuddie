import { User } from "../models/User.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import sendMail, { sendForgotMail } from "../middlewares/sendMail.js";
import TryCatch from "../middlewares/TryCatch.js";

export const register = TryCatch(async (req, res) => {
  const { parentName, parentEmail, studentName, studentEmail, password, age, studentClass, mobile } = req.body;

  // Check if either email already exists
  let parentUser = await User.findOne({ email: parentEmail });
  let studentUser = await User.findOne({ email: studentEmail });

  if (parentUser || studentUser) {
    return res.status(400).json({
      message: "Parent or Student already registered with these emails.",
    });
  }

  const hashPassword = await bcrypt.hash(password, 10);

  // Create parent user
  parentUser = {
    name: parentName,
    email: parentEmail,
    password: hashPassword,
    role: "parent",
    mainrole: "parent",
    age,
    studentClass,
    mobile,
    childEmail: studentEmail, // for reference
  };

  // Create student user
  studentUser = {
    name: studentName,
    email: studentEmail,
    password: hashPassword,
    role: "user",
    mainrole: "user",
    age,
    studentClass,
    mobile,
    parentEmail: parentEmail, // for reference
  };

  const otp = Math.floor(Math.random() * 1000000);

  const activationToken = jwt.sign(
    {
      user: parentUser,
      otp,
      studentUser,
    },
    process.env.Activation_Secret,
    {
      expiresIn: "5m",
    }
  );

  const data = {
    name: parentName,
    otp,
  };

  await sendMail(parentEmail, "E learning", data);
  // Optionally send to student as well
  // await sendMail(studentEmail, "E learning", data);

  res.status(200).json({
    message: "Otp sent to parent email.",
    activationToken,
  });
});

export const verifyUser = TryCatch(async (req, res) => {
  const { otp, activationToken } = req.body;

  const verify = jwt.verify(activationToken, process.env.Activation_Secret);

  if (!verify)
    return res.status(400).json({
      message: "Otp Expired",
    });

  if (verify.otp !== otp)
    return res.status(400).json({
      message: "Wrong Otp",
    });

  // Create both parent and student users
  await User.create({
    name: verify.user.name,
    email: verify.user.email,
    password: verify.user.password,
    role: verify.user.role || "parent",
    mainrole: verify.user.mainrole || "parent",
    age: verify.user.age,
    studentClass: verify.user.studentClass,
    mobile: verify.user.mobile,
    childEmail: verify.user.childEmail,
  });
  await User.create({
    name: verify.studentUser.name,
    email: verify.studentUser.email,
    password: verify.studentUser.password,
    role: verify.studentUser.role || "user",
    mainrole: verify.studentUser.mainrole || "user",
    age: verify.studentUser.age,
    studentClass: verify.studentUser.studentClass,
    mobile: verify.studentUser.mobile,
    parentEmail: verify.studentUser.parentEmail,
  });

  res.json({
    message: "Parent and Student Registered",
  });
});

export const loginUser = TryCatch(async (req, res) => {
  const { email, password } = req.body;

  // Try to find user by either parent or student email
  const user = await User.findOne({ email });

  if (!user)
    return res.status(400).json({
      message: "No User with this email",
    });

  const mathPassword = await bcrypt.compare(password, user.password);

  if (!mathPassword)
    return res.status(400).json({
      message: "Wrong Password",
    });

  const token = jwt.sign({ _id: user._id }, process.env.Jwt_Sec, {
    expiresIn: "15d",
  });

  res.json({
    message: `Welcome back ${user.name}`,
    token,
    user,
  });
});

export const myProfile = TryCatch(async (req, res) => {
  const user = await User.findById(req.user._id);
  res.json({ user });
});

// --- Parent-Child Management Endpoints ---

// Parent: Add a child by student email
export const addChild = TryCatch(async (req, res) => {
  const parent = await User.findById(req.user._id);
  if (!parent || parent.role !== 'parent') {
    return res.status(403).json({ message: 'Only parents can add children.' });
  }
  const { studentEmail, studentPassword } = req.body;
  const student = await User.findOne({ email: studentEmail, role: 'user' });
  if (!student) {
    return res.status(404).json({ message: 'No student found with that email.' });
  }
  const passwordMatch = await bcrypt.compare(studentPassword, student.password);
  if (!passwordMatch) {
    return res.status(401).json({ message: 'Incorrect student password.' });
  }
  if (parent.children.includes(student._id)) {
    return res.status(400).json({ message: 'Student already linked.' });
  }
  parent.children.push(student._id);
  await parent.save();
  res.json({ message: 'Student linked successfully.', children: parent.children });
});

// Parent: Remove a child
export const removeChild = TryCatch(async (req, res) => {
  const parent = await User.findById(req.user._id);
  if (!parent || parent.role !== 'parent') {
    return res.status(403).json({ message: 'Only parents can remove children.' });
  }
  const { studentId } = req.body;
  parent.children = parent.children.filter(
    (id) => id.toString() !== studentId
  );
  await parent.save();
  res.json({ message: 'Student removed.', children: parent.children });
});

// Parent: Get all linked children
export const getChildren = TryCatch(async (req, res) => {
  const parent = await User.findById(req.user._id).populate('children');
  if (!parent || parent.role !== 'parent') {
    return res.status(403).json({ message: 'Only parents can view children.' });
  }
  res.json({ children: parent.children });
});

// Parent: Get linked child's course progress
export const getChildProgress = TryCatch(async (req, res) => {
  const parent = await User.findById(req.user._id);
  if (!parent || parent.role !== 'parent') {
    return res.status(403).json({ message: 'Only parents can view child progress.' });
  }
  const { studentId } = req.body;
  if (!parent.children.includes(studentId)) {
    return res.status(403).json({ message: 'This student is not linked to your account.' });
  }
  // Fetch student's courses and progress
  const student = await User.findById(studentId);
  if (!student) {
    return res.status(404).json({ message: 'Student not found.' });
  }
  // Import Progress and Courses models here or at top
  const { Progress } = await import('../models/Progress.js');
  const { Courses } = await import('../models/Courses.js');
  const progresses = await Progress.find({ user: student._id });
  const courseProgress = await Promise.all(progresses.map(async (p) => {
    const course = await Courses.findById(p.course);
    return {
      courseId: course._id,
      courseTitle: course.title,
      completedLectures: p.completedLectures.length,
      progressId: p._id
    };
  }));
  res.json({ courses: courseProgress });
});

export const forgotPassword = TryCatch(async (req, res) => {
  const { email } = req.body;

  const user = await User.findOne({ email });

  if (!user)
    return res.status(404).json({
      message: "No User with this email",
    });

  const token = jwt.sign({ email }, process.env.Forgot_Secret);

  const data = { email, token };

  await sendForgotMail("E learning", data);

  user.resetPasswordExpire = Date.now() + 5 * 60 * 1000;

  await user.save();

  res.json({
    message: "Reset Password Link is send to you mail",
  });
});

export const resetPassword = TryCatch(async (req, res) => {
  const decodedData = jwt.verify(req.query.token, process.env.Forgot_Secret);

  const user = await User.findOne({ email: decodedData.email });

  if (!user)
    return res.status(404).json({
      message: "No user with this email",
    });

  if (user.resetPasswordExpire === null)
    return res.status(400).json({
      message: "Token Expired",
    });

  if (user.resetPasswordExpire < Date.now()) {
    return res.status(400).json({
      message: "Token Expired",
    });
  }

  const password = await bcrypt.hash(req.body.password, 10);

  user.password = password;

  user.resetPasswordExpire = null;

  await user.save();

  res.json({ message: "Password Reset" });
});
