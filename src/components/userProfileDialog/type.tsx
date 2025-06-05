
export type UserProfile = {
  id: number
  userId: string,
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
  onRefetchUser?: () => void
}

export type UserProfileForm = {
  fullname: string,
  email: string,
  roleuser: string,
  status: string,
}
