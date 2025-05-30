"use client"
import { Button } from "@radix-ui/themes";
import React, { useEffect, useRef } from "react";
import { UserProfileDialogProps, UserProfileForm } from "./type";
import SelectItem from "../selectItem";
import { userSchema } from "./schema";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
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

  const { handleSubmit, formState: { errors }, control, reset, register, watch } =
    useForm<UserProfileForm>({
      resolver: yupResolver(userSchema), mode: "onBlur", defaultValues: {
        fullname: '',
        email: '',
        roleuser: '',
        status: '',
      },
    });
  const ROLE_SELECT_OPTION = ['admin', 'teacher', 'student', 'parent'];
  const STATUS_SELECT_OPTION = ['active', 'inactive'];

  const formRef = useRef<HTMLFormElement>(null);

  const role = watch('roleuser');
  const status = watch('status');

  const handleCustomSubmit = () => {
    formRef.current?.requestSubmit();
  };

  useEffect(() => {
    if (mode === 'edit' && defaultValues) {
      reset(defaultValues);
    } else {
      reset({
        fullname: '',
        email: '',
        roleuser: ROLE_SELECT_OPTION[0],
        status: STATUS_SELECT_OPTION[0],
      });
    }
  }, [mode, defaultValues]);
  const avatarUrl = 'https://cdn-icons-png.flaticon.com/512/40/40387.png';

  const onSubmit = (data: UserProfileForm) => {
    console.log('SUBMITTED');
    console.log(data);
    handleClose();
    reset();
  }

  return (
    <>
      <div className="w-full bg-white p-6 rounded-xl shadow space-y-6">
        <div className="flex flex-col">
          <img
            src={avatarUrl}
            alt={'avatar'}
            className="w-24 h-24 rounded-full border shadow divide-y divide-gray-300"
          />
          <form ref={formRef} onSubmit={handleSubmit(onSubmit)}>
            <div className="flex flex-col gap-4 p-4 text-base">
              <label htmlFor="name">Name</label>
              <input
                {...register('fullname')}
                placeholder="Enter the name here"
                className="w-1/2 p-2 rounded 
                border border-gray-300 
                focus:outline-none focus:border-gray-500
              hover:border-gray-700 
                transition-colors duration-200"
              />
              {errors.fullname && <small className="text-red-500 text-sm">{errors.fullname.message}</small>}
              <label htmlFor="email">Email</label>
              <input
                {...register('email')}
                placeholder="Enter a Email"
                className="w-1/2 p-2 rounded 
                border border-gray-300 
                focus:outline-none focus:border-gray-500
              hover:border-gray-700 
                transition-colors duration-200"
              />{errors.email && <small className="text-red-500 text-sm">{errors.email.message}</small>}
            </div>
          </form>
        </div>

        {mode === 'edit' ? (
          role && status ? (
            <div className="flex gap-4 p-4 text-base flex-row">
              <Controller
                control={control}
                name="roleuser"
                render={({ field }) => (
                  <SelectItem
                    label="Role"
                    value={field.value}
                    onValueChange={field.onChange}
                    selectOption={ROLE_SELECT_OPTION}
                  />
                )}
              />
              {errors.roleuser && <p className="text-red-500 text-sm">{errors.roleuser.message}</p>}
              <Controller
                control={control}
                name="status"
                render={({ field }) => (
                  <SelectItem label="Status" value={field.value} selectOption={STATUS_SELECT_OPTION} onValueChange={field.onChange} />
                )} />
              <div className="text-xs text-zinc-500 space-y-1 flex flex-row gap-4">
                <div><span className="font-medium">Last login:</span> {formatDateSimple(defaultValues?.lastLogin ?? '')}</div>
                <div><span className="font-medium">Created at:</span> {formatDateSimple(defaultValues?.createAt ?? '')}</div>
              </div>
            </div>
          ) : null
        ) : (
          <div className="flex gap-4 p-4 text-base">
            <Controller
              control={control}
              name="roleuser"
              render={({ field }) => (
                <SelectItem
                  label="Role"
                  value={field.value}
                  selectOption={ROLE_SELECT_OPTION} onValueChange={field.onChange}
                />)}
            />
            <Controller
              control={control}
              name="status"
              render={({ field }) => (
                <SelectItem
                  label="Status"
                  value={field.value}
                  selectOption={STATUS_SELECT_OPTION} onValueChange={field.onChange}
                />
              )} />
          </div>
        )}

        <div className="flex gap-4 justify-end">
          <button className=" px-4 py-2 rounded 
            bg-gray-200 text-gray-800 
            hover:bg-orange-200 
            active:bg-orange-300 
            cursor-pointer 
            transition-colors duration-200" onClick={handleClose}>Cancel</button>
          <button className="px-4 py-2 rounded 
            bg-orange-400 text-white 
            hover:bg-orange-300 
            active:bg-orange-500 
            cursor-pointer 
            transition-colors duration-200" onClick={handleCustomSubmit}>{mode === 'edit' ? 'Update' : 'Create'}</button>
        </div>
      </div>
    </>
  );
}


function formatDateSimple(dateString: string): string {
  const parsedDate = new Date(dateString);
  if (isNaN(parsedDate.getTime())) return 'Invalid date';

  const day = String(parsedDate.getDate()).padStart(2, '0');
  const month = String(parsedDate.getMonth() + 1).padStart(2, '0');
  const year = parsedDate.getFullYear();

  const hour = String(parsedDate.getHours()).padStart(2, '0');
  const minute = String(parsedDate.getMinutes()).padStart(2, '0');

  return `${day}/${month}/${year}, ${hour}:${minute}`;
}
