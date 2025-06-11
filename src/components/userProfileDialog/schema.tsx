import * as yup from 'yup'
export const userSchema = (mode: 'add' | 'edit') => {
  return yup.object().shape({
    fullname: yup
      .string()
      .required("Name is required"),
    email: yup
      .string()
      .required("Email is required")
      .matches(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i, "Email is invalid"),
    password: mode === 'add'
      ? yup
        .string()
        .required("Password is required")
        .min(8, "Password must be at least 8 characters")
        .max(20, "Password must be at most 20 characters")
        .matches(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
          "Password must contain at least one letter, one number and one special character")
      : yup.string().notRequired().nullable(),
    confirmpassword: mode === 'add'
      ? yup
        .string()
        .required("Confirm password is required")
        .test(
          'passwords',
          'Passwords must match',
          function (value) {
            return !value || value === this.parent.password;
          }
        )
      : yup.string().notRequired().nullable(),
    roleuser: yup
      .string()
      .required("Role is required"),
    status: yup
      .string()
      .required("Status is required"),
  })

}