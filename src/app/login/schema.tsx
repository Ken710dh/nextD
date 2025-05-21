import * as yup from 'yup'
export const loginSchema = yup.object({
  email: yup
  .string()
  .required("Email is required")
  .matches(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i, "Email is invalid"),
  password: yup
  .string()
  .required("Password is required")
  .min(8, "Password must be at least 8 characters")
  .max(16, "Password must be at most 20 characters")
  .matches(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/, 
    "Password must contain at least one letter, one number and one special character"),})