'use client'
import React, { useEffect, useRef, useState } from "react";
import { UserProfileDialogProps, UserProfileForm } from "./type";
import SelectItem from "../selectItem";
import { userSchema } from "./schema";
import { useForm, Controller, Resolver } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { ApolloError, useMutation } from "@apollo/client";
import { CREATE_USER, UPDATE_USER_BY_USER_ID } from "./apoloclient";
import { omit } from "lodash";
import { GET_USERS } from "@/app/dashboard/users/apolo";
import { ROLE_SELECT_OPTION, STATUS_SELECT_OPTION } from "@/constants";
import InputField from "../inputfields";
import { toast } from "react-toastify";
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
  onRefetchUser,
}: UserProfileDialogProps) {

  // GraphQL Mutations For Creating a User
  const [createUser] = useMutation(CREATE_USER, {
  });
  // GraphQL Mutation For Updating a User by Email
  const [updateUserByUserId] = useMutation(UPDATE_USER_BY_USER_ID, {
  });


  // React Hook Form
  const { handleSubmit, setError, formState: { errors, isSubmitting }, control, reset, register, watch } =
    useForm<UserProfileForm>({
      resolver: yupResolver(userSchema(mode)) as Resolver<UserProfileForm>, mode: "onBlur", defaultValues: getDefaultValues(),
    });

  function getDefaultValues() {
    if (mode === 'edit' && defaultValues) {
      return {
        fullname: defaultValues.fullname || '',
        email: defaultValues.email || '',
        roleuser: defaultValues.roleuser || ROLE_SELECT_OPTION[0],
        status: defaultValues.status || STATUS_SELECT_OPTION[0],
        password: '',
        confirmpassword: '',
      };
    }

    return {
      fullname: '',
      email: '',
      password: '',
      confirmpassword: '',
      roleuser: ROLE_SELECT_OPTION[0],
      status: STATUS_SELECT_OPTION[0],
    };
  };

  // Create a reference to the form element
  const formRef = useRef<HTMLFormElement>(null);
  // Watch the values of role fields
  const role = watch('roleuser');
  // Watch the value of the status field
  const status = watch('status');

  console.log('role', role), console.log('status', status);

  /**
   * Triggers the form submission programmatically by invoking the native `requestSubmit` method
   * on the form reference. .
   */
  const handleCustomSubmit = async () => {
    formRef.current?.requestSubmit();
  };

  /**
   * Resets the form with default values when the component mounts or when the mode or defaultValues change.
   * If in edit mode, it populates the form with existing user data.
   */
  useEffect(() => {
    if (mode === 'edit' && defaultValues) {
      reset(
        defaultValues
      );
    } else {
      reset({
        fullname: '',
        email: '',
        password: '',
        confirmpassword: '',
        roleuser: ROLE_SELECT_OPTION[0],
        status: STATUS_SELECT_OPTION[0],
      });
    }
  }, [mode, defaultValues],);

  /**
   * Handles the submission of the user profile form.
   *
   * Depending on the mode ('add' or 'edit'), this function either creates a new user
   * or updates an existing user's information. It omits certain fields from the data before
   * sending the appropriate GraphQL mutation request. After a successful operation, it triggers
   * a refetch of user data, closes the dialog, and resets the form.
   *
   * @param {UserProfileForm} data - The form data containing user profile information.
   * @returns {Promise<void>} A promise that resolves when the submission is complete.
   */

  const onSubmit = async (data: UserProfileForm) => {
    try {
      if (mode === 'add') {
        try {
          const addUserData = omit(data, ['confirmpassword', '__typename', 'createAt', 'lastLogin']);
          await createUser({
            variables: {
              input: {
                user: addUserData
              }
            },
          });
          toast.success("User created successfully.");
        } catch (err) {
          const apolloError = err as ApolloError;
          const gqlError = apolloError?.graphQLErrors?.[0];
          if (gqlError?.message?.includes("users_email_key")) {
            setError("email", {
              type: "server",
              message: "Email already exists",
            });
            return;
          }
          console.error("Unexpected error:", err);
          toast.error("Failed to create user");
        }
      } else if (mode === 'edit') {
        console.log("data", data);
        const fieldsToRemove = ['password', 'confirmpassword', 'lastLogin', 'createAt', 'id', 'userId', '__typename', 'id'];
        const userPatch = omit(data, fieldsToRemove);
        console.log("edited data", userPatch);
        try {
          await updateUserByUserId({
          variables: { input: { userId: defaultValues?.userId, userPatch: userPatch } },
        });
        toast.success("User updated successfully.");
        } catch (err) {
          console.error("Unexpected error:", err);
          toast.error("Failed to update user");
        }
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
          <InputField
            label="Full Name"
            placeholder="Enter your full name"
            type="text"
            register={register('fullname')}
            error={errors.fullname}
          />
          <InputField
            label="Email"
            placeholder="Enter your email"
            type="email"
            register={register('email')}
            error={errors.email}
          />
        </div>
        {mode === 'add' && (
          <div className="flex flex-row gap-4 p-4">
            <div className="w-1/2">
              <InputField
                label="Password"
                placeholder="Enter your password"
                type="password"
                register={register('password')}
                error={errors.password}
              />
            </div>
            <div className="w-1/2">
              <InputField
                label="Confirm Password"
                placeholder="Confirm your password"
                type="password"
                register={register('confirmpassword')}
                error={errors.confirmpassword}
              />
            </div>
          </div>
        )}
        <div className="flex flex-row gap-4 p-4">
          <div className="w-1/2 h-[42px]">
            <Controller
              control={control}
              name="roleuser"
              render={({ field }) => (
                <SelectItem
                  label="Role"
                  value={field.value}
                  onValueChange={field.onChange}
                  selectOption={ROLE_SELECT_OPTION}
                  height="h-[42px]"
                />
              )}
            />
            {errors.roleuser && <p className="text-red-500 text-sm">{errors.roleuser.message}</p>}
          </div>
          <div className="w-1/2">
            <Controller
              control={control}
              name="status"
              render={({ field }) => (
                <SelectItem label="Status" value={field.value} selectOption={STATUS_SELECT_OPTION} onValueChange={field.onChange} height="h-[42px]" />
              )} />
            {errors.status && <p className="text-red-500 text-sm">{errors.status.message}</p>}
          </div>
        </div>
        {mode === 'edit' && defaultValues && (
          <div className="flex flex-row gap-4 p-4 text-sm">
            <div className="flex flex-col w-1/2">
              <label className="font-medium">Last login:</label>
              <FormattedDate dateString={defaultValues?.lastLogin} />
            </div>
            <div className="flex flex-col w-1/2">
              <label className="font-medium">Created at:</label>
              <FormattedDate dateString={defaultValues?.createAt} />
            </div>
          </div>
        )}
        <div className="flex gap-4 p-4 justify-end">
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
            transition-colors duration-200"  onClick={handleCustomSubmit}>{mode === 'edit' ? 'Update' : 'Create'}</button>
        </div>

      </form>
    </>
  );
}

/**
 * Formats a date string in the format "dd/mm/yyyy, HH:MM".
 *
 * When the component mounts, it formats the given dateString and sets the
 * formatted state to the result. If no dateString is given, it leaves the
 * formatted state as an empty string.
 *
 * The component renders a grey rounded box with the formatted date string
 * inside. If the formatted state is empty, it renders "..." instead.
 *
 * @param {{ dateString?: string }} props
 */
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
