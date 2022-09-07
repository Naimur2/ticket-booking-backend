import { compare, hash } from "bcrypt";
import dotenv from "dotenv";
import { RequestHandler } from "express";
import { sign } from "jsonwebtoken";
import { ITokenData, IUserProps } from "../interfaces/main";
import User from "../schemas/user-schema";

dotenv.config();

export const loginController: RequestHandler = async (req, res) => {
    try {
        const user = await User.find({ email: req.body.email });
        const userData = await User.find({ email: req.body.email }).select({
            password: 0,
        });

        if (user && user.length > 0) {
            const isValidPassword = await compare(
                req.body.password,
                user[0].password
            );
            if (isValidPassword) {
                // generate Token
                const token = sign(
                    {
                        email: user[0].email,
                        _id: user[0]._id,
                        role: user[0].role,
                    },
                    process.env.JWT_SECRET as string,
                    {
                        expiresIn: "2d",
                    }
                );

                res.status(200).json({
                    user: userData[0],
                    access_token: token,
                    message: "Login Successfull",
                });
            } else {
                res.status(401).json({ error: "Authentication failed! 1" });
            }
        } else {
            res.status(401).json({ error: "Authentication failed! 2" });
        }
    } catch (err) {
        res.status(500).json({ error: "There was a server side error!" });
    }
};

export const registerController: RequestHandler = async (req, res) => {
    const { email, password, role, firstName, lastName, termsAccepted } =
        req.body as IUserProps;

    const user = await User.find({ email }).select({ password: 0 });

    if (user?.length > 0) {
        res.status(400).json({
            message: "Registration failed. Try with another email.",
        });
    } else {
        const hashedPassword = await hash(password, 10);

        const newUser = new User({
            email,
            password: hashedPassword,
            role,
            firstName,
            lastName,
            termsAccepted,
        });

        await newUser.save();

        const token = sign(
            {
                email: newUser.email,
                _id: newUser._id,
                role: newUser.role,
            },
            process.env.JWT_SECRET as string,
            {
                expiresIn: "2d",
            }
        );

        console.log("Registration successful.");

        res.status(201).json({
            message: "Registration successful.",
            user: newUser,
            access_token: token,
        });
    }
};

export const validationController: RequestHandler = async (req, res) => {
    const { email, _id }: ITokenData = req.body.user;
    console.log(email, _id);
    const user = await User.find({ email, _id }).select({ password: 0 });
    if (user?.length > 0) {
        res.status(200).json({
            message: "Validation successful.",
            user: user[0],
        });
    } else {
        res.status(401).json({
            message: "Validation failed.",
        });
    }
};

export const getUserInfo: RequestHandler = async (req, res) => {
    const { email } = req.body.user;
    const user = await User.find({ email }).select({ password: 0 });
    if (user?.length > 0) {
        res.status(200).json({
            message: "Validation successful.",
            user: user[0],
        });
    } else {
        res.status(401).json({
            message: "Validation failed.",
        });
    }
};

export const updateUserInfo: RequestHandler = async (req, res) => {
    const { email, password, firstName, lastName, phone } =
        req.body as IUserProps;

    const user = await User.find({ email });

    if (user?.length > 0) {
        const hashedPassword = await hash(password, 10);
        const oldPassword = user[0].password;
        let newPassword = oldPassword;

        if (password.length > 0 && oldPassword !== hashedPassword) {
            newPassword = hashedPassword;
        }

        await User.findByIdAndUpdate(user[0]._id, {
            email,
            password: newPassword,
            firstName,
            lastName,
            phone,
        });

        const updatedUser = await User.findById(user[0]._id).select({
            password: 0,
        });

        res.status(201).json({
            message: "Data updated.",
            user: updatedUser[0],
        });
    } else {
        res.status(400).json({
            message: "Data update failed.",
        });
    }
};
