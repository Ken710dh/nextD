'use client'
import React, { useEffect, useRef, useState } from "react";
import { UserProfileDialogProps, UserProfileForm } from "./type";
import SelectItem from "../selectItem";
import { userSchema } from "./schema";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useMutation } from "@apollo/client";
import { CREATE_USER, UPDATE_USER_BY_EMAIL } from "./apoloclient";
import { omit } from "lodash";
import { GET_USERS } from "@/app/dashboard/users/apolo";
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
  defaultValues,
  onRefetchUser
}: UserProfileDialogProps) {

  const [createUser] = useMutation(CREATE_USER, {
  });
  const [updateUserByEmail] = useMutation(UPDATE_USER_BY_EMAIL, {
    refetchQueries: [
      GET_USERS,
      'GetUsers',
    ],

  });

  const { handleSubmit, formState: { errors }, control, reset, register, watch } =
    useForm<UserProfileForm>({
      resolver: yupResolver(userSchema), mode: "onBlur", defaultValues: {
        fullname: '',
        email: '',
        roleuser: '',
        status: '',
        password: '',
        confirmpassword: '',
      },
    });
  const ROLE_SELECT_OPTION = ['admin', 'teacher', 'student', 'parent'];
  const STATUS_SELECT_OPTION = ['active', 'inactive'];

  const formRef = useRef<HTMLFormElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);


  useEffect(() => {
  inputRef.current?.focus(); 
}, []);


  const role = watch('roleuser');
  const status = watch('status');

  const handleCustomSubmit = async () => {
    formRef.current?.requestSubmit();
  };

  useEffect(() => {
    if (mode === 'edit' && defaultValues) {
      reset({
        ...defaultValues,
        confirmpassword: defaultValues.password || '',
      });
    } else {
      reset({
        fullname: '',
        email: '',
        roleuser: ROLE_SELECT_OPTION[0],
        status: STATUS_SELECT_OPTION[0],
        password: '',
        confirmpassword: '',
      });
    }
  }, [mode, defaultValues]);



  const onSubmit = async (data: UserProfileForm) => {
    try {
      if (mode === 'add') {
        const addUserData = omit(data, ['confirmpassword', '__typename', 'createAt', 'lastLogin']);
        await createUser({
          variables: {
            input: {
              user: addUserData
            }
          },
        });
      } else if (mode === 'edit') {
        console.log("data", data);
        const fieldsToRemove = ['confirmpassword', 'lastLogin', 'createAt', 'id', 'email', '__typename'];
        const userPatch = omit(data, fieldsToRemove);
        console.log("edited data", userPatch);
        await updateUserByEmail({
          variables: { input: { email: data.email, userPatch } },
        });
      }
      onRefetchUser && onRefetchUser();
    } catch (error) {
      console.log(error);
    }
    console.log('SUBMITTED');
    handleClose();
    reset();
  }


  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid grid-cols-2 gap-4 p-4 text-base">
          <div className="flex flex-col">
            <label htmlFor="fullname">Name</label>
            <input
              {...register('fullname')}
              placeholder="Enter the name here"
              className="p-2 rounded border border-gray-300 focus:outline-none focus:border-gray-500 hover:border-gray-700 transition-colors duration-200"
            />
            {errors.fullname && <small className="text-red-500 text-sm">{errors.fullname.message}</small>}
          </div>

          <div className="flex flex-col">
            <label htmlFor="email">Email</label>
            <input
              {...register('email')}
              placeholder="Enter an email"
              className="p-2 rounded border border-gray-300 focus:outline-none focus:border-gray-500 hover:border-gray-700 transition-colors duration-200"
            />
            {errors.email && <small className="text-red-500 text-sm">{errors.email.message}</small>}
          </div>

          <div className="flex flex-col">
            <label htmlFor="password">Password</label>
            <input
              {...register('password')}
              placeholder="Enter a password"
              className="p-2 rounded border border-gray-300 focus:outline-none focus:border-gray-500 hover:border-gray-700 transition-colors duration-200"
            />
            {errors.password && <small className="text-red-500 text-sm">{errors.password.message}</small>}
          </div>

          <div className="flex flex-col">
            <label htmlFor="confirmpassword">Confirm Password</label>
            <input
              {...register('confirmpassword')}
              placeholder="Confirm password"
              className="p-2 rounded border border-gray-300 focus:outline-none focus:border-gray-500 hover:border-gray-700 transition-colors duration-200"
            />
            {errors.confirmpassword && <small className="text-red-500 text-sm">{errors.confirmpassword.message}</small>}
          </div>
        </div>

        {mode === 'edit' ? (
          role && status ? (
            <div className="flex gap-4 p-4 text-base flex-col">
              <div className="flex flex-row  gap-4">
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
              </div>
              <div className="flex flex-row gap-4 text-sm text-gray-500">
                <div className="flex flex-col w-1/2">
                  <label className="font-medium">Last login:</label>
                  <FormattedDate dateString={defaultValues?.lastLogin} />
                </div>
                <div className="flex flex-col w-1/2">
                  <label className="font-medium">Created at:</label>
                  <FormattedDate dateString={defaultValues?.createAt} />
                </div>
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

      </form>
    </>
  );
}

function FormattedDate({ dateString }: { dateString?: string }) {
  const [formatted, setFormatted] = useState('');
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
  useEffect(() => {
    if (dateString) {
      setFormatted(formatDateSimple(dateString));
    }
  }, [dateString]);

  return (
    <span className="p-2 border border-gray-200 rounded bg-gray-50">
      {formatted || '...'}
    </span>
  );
}
