import BASE_CONST from "@/common/constants";
import { RegisterUserPayload } from "@/common/interfaces";
import { isObjectEmpty } from "@/common/utils";
import type { User } from "@prisma/client";
import { PrismaClient } from "@prisma/client";
import { genSaltSync, hashSync } from "bcrypt";
import TagService from "./tag.service";

export default class UserService {
  private prisma: PrismaClient;

  constructor() {
    this.prisma = new PrismaClient();
  }

  async getUserByEmail(email: string): Promise<User | null> {
    try {
      let user = await this.prisma.user.findFirst({ where: { email } });
      return user;
    } catch (error) {
      throw new Error(BASE_CONST.ERROR.INTERNAL_SERVER);
    }
  }

  async createUser(data: RegisterUserPayload): Promise<string> {
    const existingUser = await this.getUserByEmail(data.email);
    if (!isObjectEmpty(existingUser)) {
      throw new Error(BASE_CONST.ERROR.USER_EXISTS);
    }

    try {
      const salt = genSaltSync(10);
      const passwordHash = hashSync(data.password, salt);
      const user = await this.prisma.user.create({
        data: {
          firstName: data.firstName,
          lastName: data.lastName,
          email: data.email,
          passwordHash: passwordHash,
          salt,
        },
      });
      await new TagService().createDefaultTags(user.userId);
      return user.email;
    } catch (error) {
      throw new Error(BASE_CONST.ERROR.INTERNAL_SERVER);
    }
  }
}
