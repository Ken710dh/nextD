
export type UserProfile = {
  name: string
  email: string
  role: string
  status: string
  lastLogin: string 
  createdAt: string
}

export type UserProfileDialogProps = {
  mode: 'add' | 'edit';
  defaultValues?: UserProfile
  handleClose: () => void
}