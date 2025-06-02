
export type UserProfile = {
  fullname: string,
  email: string,
  roleuser: string,
  status: string,
  lastLogin: string, 
  createAt: string,
}

export type UserProfileDialogProps = {
  mode: 'add' | 'edit';
  defaultValues?: UserProfile
  handleClose: () => void
}

export type UserProfileForm = {
  fullname: string,
  email: string,
  roleuser: string,
  status: string,
  password: string,
  confirmpassword: string,
}
