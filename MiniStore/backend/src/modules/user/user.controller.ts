import { Response } from "express";
import { errorResponse, successResponse } from "../../utils/response";
import { AuthRequest } from "./auth.middleware";
import { UserService } from "./user.service";

export class UserController {
  private userService: UserService;

  constructor() {
    this.userService = new UserService();
  }

  getSingleUser = async (req: AuthRequest, res: Response): Promise<void> => {
    try {
      const id = req.user.id;
      const users = await this.userService.getSingleUser(id);
      successResponse(res, users);
    } catch (error) {
      errorResponse(res, error, 500);
    }
  };
}
