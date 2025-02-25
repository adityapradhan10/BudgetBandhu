export default {
  ERROR: {
    USER_EXISTS: "User already exists in database",
    INTERNAL_SERVER: "Internal Server Error",
    UNAUTHORIZED: "Unauthorized",
    USER_NOT_FOUND: "No user found with given email",
    TAG_NOT_FOUND: "No tag found with given id",
    INVALID_CRED: "Invalid credentials",
  },
  getDefaultTags: (userId: number) => [
    {
      name: "Salary",
      type: "income",
      isDefault: true,
      userId,
    },
    {
      name: "Interest",
      type: "income",
      isDefault: true,
      userId,
    },
    {
      name: "Groceries",
      type: "expense",
      isDefault: true,
      userId,
    },
    {
      name: "Dairy",
      type: "expense",
      isDefault: true,
      userId,
    },
    {
      name: "Clothing",
      type: "expense",
      isDefault: true,
      userId,
    },
    {
      name: "House",
      type: "expense",
      isDefault: true,
      userId,
    },
    {
      name: "Miscellaneous",
      type: "expense",
      isDefault: true,
      userId,
    },
  ],
};
