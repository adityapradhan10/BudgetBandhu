import BASE_CONST from "@/common/constants";
import { LoginUserPayload } from "@/common/interfaces";
import { isObjectEmpty } from "@/common/utils";
import { hashSync } from "bcrypt";
import { sign } from "jsonwebtoken";
import UserService from "./user.service";

export default class AuthService {
  async userLogin(data: LoginUserPayload): Promise<string> {
    let user = null;
    try {
      user = await new UserService().getUserByEmail(data.email);
    } catch (error) {
      throw new Error(BASE_CONST.ERROR.INTERNAL_SERVER);
    }
    if (!user || isObjectEmpty(user)) {
      throw new Error(BASE_CONST.ERROR.USER_NOT_FOUND);
    }

    const hashedPassword = hashSync(data.password, user.salt);
    if (hashedPassword !== user.passwordHash) {
      throw new Error(BASE_CONST.ERROR.INVALID_CRED);
    }

    const privateKey = process.env.PRIVATE_KEY as string;
    const token = sign(
      {
        data: {
          user: user.email,
        },
      },
      privateKey,
      {
        expiresIn: "2h",
      }
    );
    return token;
  }
}
