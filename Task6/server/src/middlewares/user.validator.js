import zod from "zod";

// Schema for user registration
const registerSchema = zod.object({
  username: zod
    .string()
    .min(3, "Username must be at least 3 characters")
    .max(30, "Username cannot exceed 30 characters"),
  email: zod
    .string()
    .email("Invalid email format")
    .min(5, "Email must be at least 5 characters")
    .max(50, "Email cannot exceed 50 characters"),
  password: zod
    .string()
    .min(6, "Password must be at least 6 characters")
    .max(50, "Password cannot exceed 50 characters")
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/,
      "Password must contain at least one uppercase letter, one lowercase letter, one number and one special character"
    ),
});

// Schema for user login
const loginSchema = zod.object({
  email: zod.string().email("Invalid email format"),
  password: zod.string().min(6, "Password is required"),
});

// Common validation middleware
export const validateUserInput = (req, res, next) => {
  if (req.path === "/register") {
    return validateRegister(req, res, next);
  } else if (req.path === "/login") {
    return validateLogin(req, res, next);
  }
  next();
};

// Middleware for validating registration
export const validateRegister = async (req, res, next) => {
  try {
    const validatedData = await registerSchema.parseAsync(req.body);
    req.body = validatedData;
    next();
  } catch (error) {
    return res.status(400).json({
      status: "error",
      message: error.errors?.[0]?.message || "Validation failed",
    });
  }
};

// Middleware for validating login
export const validateLogin = async (req, res, next) => {
  try {
    const validatedData = await loginSchema.parseAsync(req.body);
    req.body = validatedData;
    next();
  } catch (error) {
    return res.status(400).json({
      status: "error",
      message: error.errors?.[0]?.message || "Validation failed",
    });
  }
};
