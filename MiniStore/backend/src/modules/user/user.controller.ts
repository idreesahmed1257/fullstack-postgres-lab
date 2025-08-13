import { compare, hash } from "bcrypt";
import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../../config/env";
import { errorResponse, successResponse } from "../../utils/response";
import { UserService } from "./user.service";

export class UserController {
  private userService: UserService;

  constructor() {
    this.userService = new UserService();
  }

  getAllUsers = async (req: Request, res: Response): Promise<void> => {
    try {
      const users = await this.userService.getUsers("idrees");
      successResponse(res, users);
    } catch (error) {
      errorResponse(res, error, 500);
    }
  };

  register = async (req: Request, res: Response): Promise<void> => {
    try {
      const input = req.body;
      const hashedPassword = await hash(input.password, 10);
      const user = await this.userService.registerUser({
        name: input.name,
        email: input.email,
        password: hashedPassword,
      });
      user.password = "";
      successResponse(res, user, "User registered successfully");
    } catch (error) {
      errorResponse(res, error);
    }
  };

  login = async (req: Request, res: Response): Promise<void> => {
    try {
      const input = req.body;
      const user = await this.userService.findUserByEmail(input.email);
      if (!user) throw new Error("Invalid email or password");
      const isMatch = await compare(input.password, user.password);
      if (!isMatch) throw new Error("Invalid email or password");
      const token = jwt.sign({ userId: user.id, email: user.email }, JWT_SECRET, { expiresIn: "7d" });
      const { password, ...userWithoutPassword } = user;
      successResponse(res, { user: userWithoutPassword, token }, "Login successful");
    } catch (error) {
      errorResponse(res, error);
    }
  };

  validateToken = async (req: any, res: Response): Promise<void> => {
    try {
      if (!req.user) throw new Error("No user info found in token");
      successResponse(res, req.user, "Token is valid");
    } catch (error) {
      errorResponse(res, error, 401);
    }
  };
}
