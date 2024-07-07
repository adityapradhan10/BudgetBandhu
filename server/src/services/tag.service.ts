import BASE_CONST from "@/common/constants";
import { CreateTagPayload } from "@/common/interfaces";
import type { Tag } from "@prisma/client";
import { PrismaClient } from "@prisma/client";

export default class TagService {
  private prisma: PrismaClient;

  constructor() {
    this.prisma = new PrismaClient();
  }

  async createDefaultTags(userId: number): Promise<void> {
    await this.prisma.tag.createMany({
      data: BASE_CONST.getDefaultTags(userId) as Tag[],
    });
  }

  async createTag(data: CreateTagPayload, userId: number): Promise<void> {
    await this.prisma.tag.create({
      data: {
        name: data.name,
        type: data.type,
        userId,
      },
    });
  }

  async getTags(userId: number): Promise<Tag[]> {
    return await this.prisma.tag.findMany({
      where: {
        userId,
      },
    });
  }

  async deleteTag(tagId: number, userId: number): Promise<void> {
    const tag = await this.prisma.tag.findFirst({ where: { tagId } });
    if (!tag) {
      throw new Error(BASE_CONST.ERROR.TAG_NOT_FOUND);
    }
    if (tag.userId !== userId) {
      throw new Error(BASE_CONST.ERROR.UNAUTHORIZED);
    }

    await this.prisma.tag.delete({ where: { tagId: tag.tagId } });
  }
}
