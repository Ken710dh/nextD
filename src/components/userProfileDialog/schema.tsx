import * as yup from 'yup'
export const userSchema = yup.object({
  fullname: yup
  .string()
  .required("Name is required"),
  email: yup
  .string()
  .required("Email is required")
  .matches(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i, "Email is invalid"),
  roleuser: yup
  .string()
  .required("Role is required"),
  status: yup
  .string()
  .required("Status is required"),
})
