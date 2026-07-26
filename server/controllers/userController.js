
import User from '../models/user.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import Resume from '../models/resume.js';

const generateToken = (userId) => {
    const token = jwt.sign({ id: userId }, process.env.JWT_SECRET, { expiresIn: '7d' });
    return token;
};

//controller for user registration
//POST:/api/users/register
export const registerUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        //check if required fields are present
        if (!name || !email || !password) {
            return res.status(400).json({ message: "Please provide name, email, and password" });
        }
        //check if user already exists
        const user = await User.findOne({ email });
        if(user){
            return res.status(400).json({ message: "User already exists" });
        }
        //create new user
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = await User.create({ name, email, password: hashedPassword });
        //return success response with user data and token
        const token = generateToken(newUser._id);
        newUser.password = undefined; // Remove password from the response
        return res.status(201).json({ message: "User registered successfully", user: newUser, token });
    } catch (error) {
        console.error("Error registering user:", error);
        return res.status(400).json({ message:error.message });
    }
};

//controller for user login
//POST:/api/users/login

export const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body; 
        
        
        //check if user exists
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: "Invalid email or password" });
        }


        //check if password is correct
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: "Invalid email or password" });
        }


        //return success response with user data and token
        const token = generateToken(user._id);
        user.password = undefined; // Remove password from the response
        return res.status(200).json({ message: "Login successful", user, token });
    } catch (error) {
        console.error("Error logging in user:", error);
        return res.status(400).json({ message: error.message });
    }

};

//controller for getting user by id
//GET:/api/users/:id
export const getUserById = async (req, res) => {
    try {
        const { id } = req.userId; // Assuming userId is set in the request object by authentication middleware

        //check if user exists
        const user = await User.findById(id);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        //return user
        user.password = undefined; // Remove password from the response
        return res.status(200).json({ user });
    } catch (error) {
        console.error("Error fetching user:", error);
        return res.status(400).json({ message: error.message });
    }


};


//controller for getting user resumes
//GET:/api/users/resumes

export const getUserResumes = async (req, res) => {
    try {
        const userId = req.userId;
        //return user resumes
        const resumes = await Resume.find({ userId }); 
        return res.status(200).json({ resumes });
    } catch (error) {
        return res.status(400).json({ message: error.message });
    }   

};