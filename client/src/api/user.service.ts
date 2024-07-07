import Request from "@/common/utils/request";

export const getCurrentUser = async () => {
  const request = new Request();
  const user = await request.get("/api/v1/auth");
  return user;
};
