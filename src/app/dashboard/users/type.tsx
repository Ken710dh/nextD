export type User = {
  id: number
  userId: string
  fullname: string
  email: string
  roleuser: string
  status: string
  createAt: string
  lastLogin: string
  action?: string
  password: string
}
export type StringEqualToFilter = {
  equalTo: string;
};

export type UserFilter = {
  roleuser?: StringEqualToFilter;
  status?: StringEqualToFilter;
};