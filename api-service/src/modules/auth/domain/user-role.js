const UserRole = {
  USER: "user",
  ADMIN: "admin",
};

const isAdmin = (user) => !!user.role && user.role == UserRole.ADMIN;

module.exports = { UserRole, isAdmin };
