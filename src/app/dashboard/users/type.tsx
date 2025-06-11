export type User = {
  id: number
  userId: string
  fullname: string
  email: string
  roleuser: string
  status: string
  createAt: string
  lastLogin: string
  acsition?: React.ReactNode
  password: string
}
export type StringFilter = {
  equalTo?: string;
  includesInsensitive?: string;
  notEqualTo?: string | null;
};

export type UserFilter = {
  roleuser?: StringFilter;
  status?: StringFilter;
  fullname?: StringFilter;
  email?: StringFilter;
  userId?: StringFilter;
  and?: UserFilter[];
  or?: UserFilter[];
};

 export type Variables = {
  first: number;
  offset: number;
  filter?: UserFilter;
};

