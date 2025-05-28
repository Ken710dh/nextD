"use client"
import { Button } from "@radix-ui/themes";
import React, { useEffect } from "react";
import { UserProfile, UserProfileDialogProps } from "./type";
import SelectItem from "../selectItem";
import { log } from "node:console";
/**
 * A dialog component to display user profile information.
 *
 * The component displays the user's avatar, name, email, bio, phone number, and role.
 *
 * @param {Object} props The component props.
 * @param {() => void} props.handleClose The function to call when the cancel Button is clicked.
 * @returns {React.ReactElement} The dialog component.
 */
export default function UserProfileDialog({
  mode,
  handleClose,
  defaultValues
}: UserProfileDialogProps) {

  const ROLE_SELECT_OPTION = ['admin', 'teacher', 'student', 'parent'];
  const STATUS_SELECT_OPTION = ['active', 'inactive'];

  const [form, setForm] = React.useState<UserProfile>({
    name: '',
    email: '',
    role: '',
    status: '',
    createdAt: '',
    lastLogin: '',
  });

  useEffect(() => {
    if (mode === 'edit' && defaultValues) {
      setForm(defaultValues)
    } else {
      setForm({
        name: '',
        email: '',
        role: '',
        status: '',
        createdAt: '',
        lastLogin: '',
      })
    }
  }, [mode, defaultValues]);
  const avatarUrl = 'https://cdn-icons-png.flaticon.com/512/40/40387.png';
  const handleChange = (field: keyof UserProfile, value: string) => {
    setForm((prev) => ({
      ...prev,
      [field]: value
    }))
  } 
  
  return (
    <>
      <div className="w-full max-w-md mx-auto bg-white p-6 rounded-xl shadow space-y-6">
        <div className="flex flex-col items-center text-center">
          <img
            src={avatarUrl}
            alt={form.name}
            className="w-24 h-24 rounded-full border shadow"
          />
          <input
            value={form.name}
            onChange={e => handleChange('name', e.target.value)}
            placeholder="Name"
            className="w-full p-2 border rounded"
          />
          <input
            value={form.email}
            onChange={e => handleChange('email', e.target.value)}
            placeholder="Email"
            className="w-full p-2 border rounded"
          />
        </div>

        {mode === 'edit' ? (
          form.role && form.status ? (
            <div className="flex gap-4">
              <SelectItem label="Role" defaultValue={form.role} selectOption={ROLE_SELECT_OPTION} onValueChange={(value) => handleChange('role', value)} />
              <SelectItem label="Status" defaultValue={form.status} selectOption={STATUS_SELECT_OPTION}  onValueChange={(value) => handleChange('role', value)} />
            </div>
          ) : null
        ) : (
          <div className="flex gap-4">
            <SelectItem
              label="Role"
              defaultValue={form.role && form.role !== '' ? form.role : ROLE_SELECT_OPTION[0]}
              selectOption={ROLE_SELECT_OPTION} onValueChange={(value) => handleChange('role', value)} 
            />
            <SelectItem
              label="Status"
              defaultValue={form.status && form.status !== '' ? form.status : STATUS_SELECT_OPTION[0]}
              selectOption={STATUS_SELECT_OPTION} onValueChange={(value) => handleChange('role', value)} 
            />
          </div>
        )}

        <div className="text-xs text-zinc-500 space-y-1">
          <div><span className="font-medium">Last login:</span> {formatDate(form.lastLogin)}</div>
          <div><span className="font-medium">Created at:</span> {formatDate(form.createdAt)}</div>
        </div>
        <Button onClick={handleClose}>Cancel</Button>
      </div>

    </>
  );
}


function formatDate(dateString: string) {
  const parsedDate = new Date(Date.parse(dateString));
  if (isNaN(parsedDate.getTime())) return 'Invalid date';

  return new Intl.DateTimeFormat('en-US', {
    dateStyle: 'medium',
    timeStyle: 'short',
  }).format(parsedDate);
}