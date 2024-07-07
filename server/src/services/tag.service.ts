import BASE_CONST from "@/common/constants";
import type { Tag } from "@prisma/client";
import { PrismaClient } from "@prisma/client";

export default class TagService {
  private prisma: PrismaClient;

  constructor() {
    this.prisma = new PrismaClient();
  }

  async createDefaultTags(userId: number): Promise<void> {
    try {
      await this.prisma.tag.createMany({
        data: BASE_CONST.getDefaultTags(userId) as Tag[],
      });
      return;
    } catch (error) {
      throw new Error(BASE_CONST.ERROR.INTERNAL_SERVER);
    }
  }
}
