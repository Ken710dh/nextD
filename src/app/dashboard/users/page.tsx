"use client";

import { useState } from "react";
import { HEADER_FIELD } from "./constants";
import { USERS } from "./dummyUser";
import Table from "@/components/table";
import CustomCheckbox from "@/components/checkbox";
import { EditModal } from "@/components/editDialog";
import UserProfileDialog from "@/components/userProfileDialog";
import DeleteUserModal from "@/components/deleteUserModal";
import { User } from "./type";
import client from '@/lib/apolo/client'
import AddUserModal from "@/components/addUserModal";
import { useQuery } from "@apollo/client";
import { GET_USERS } from "./apolo";

/**
 * A dashboard page for users.
 *
 * This page will display a table with the information of all users. The user can
 * select multiple users and delete them. The user can also edit the information
 * of a user.
 *
 * @returns A React component that renders the users table.
 */
export default function Users() {
  // State to manage selected users
  const [selectedUsers, setSelectedUsers] = useState<string[]>([]);
  // State to manage the open state of edit
  const [openEdit, setOpenEdit] = useState(false);
  // State to manage the open state of delete
  const [openDelete, setOpenDelete] = useState(false);
  // State to manage the open state of add user
  const [openAddUser, setOpenAddUser] = useState(false);
  //  State to manage the selected user
  const [selectedUser, setSelectedUser] = useState<User | null>(null);


  const {loading, error, data} = useQuery(GET_USERS, {client});
  console.log("fetch", data)
  /**
   * Opens the edit modal by setting the `openEdit` state to true.
   */
  function handleOpenEdit(user: User) {
    setSelectedUser(user);
    setOpenEdit(true)
  }
  function handleOpenAdd() {
    setOpenAddUser(true)
  }

  /**
   * Opens the delete modal by setting the `openDelete` state to true and logs the state of the modal.
   */
  function handleOpenDelete() {
    setOpenDelete(true)
    console.log("Open delete modal", openDelete);
  }

  /**
   * Closes the edit modal by setting the `openEdit` state to false.
   */

  function handleCloseEdit() {
    setOpenEdit(false)
  }
  /**
   * Closes the delete modal by setting the `openDelete` state to false and logs the state of the modal.
   */
  function handleCloseDelete() {
    setOpenDelete(false)
  }
  function handleCloseAdd() {
    setOpenAddUser(false)
  }


  /**
   * Handles the select all checkbox.
   *
   * If the checkbox is checked, it sets the `selectedUsers` state to an array of
   * all user emails. If the checkbox is unchecked, it sets the `selectedUsers`
   * state to an empty array.
   *
   * @param {boolean | 'indeterminate'} checked The state of the checkbox.
   */
  const handleSelectAll = (checked: boolean | 'indeterminate') => {
    if (checked === true) {
      setSelectedUsers(DATA_USERS.map((user: User) => user.email));
    } else {
      setSelectedUsers([]);
    }
  };

  /**
   * Handles the selection of individual users.
   *
   * If the item is already selected, it removes the item from the
   * `selectedUsers` array. If the item is not selected, it adds the item
   * to the `selectedUsers` array.
   *
   * @param {string} item The email of the user that was selected or deselected.
   */
  const handleItemChange = (item: string) => {
    setSelectedUsers((prevSelectedUsers) => {
      if (prevSelectedUsers.includes(item)) {
        return prevSelectedUsers.filter((user) => user !== item);
      } else {
        return [...prevSelectedUsers, item];
      }
    })
  }


if (loading) return <p>Loading...</p>;
if (error) return <p>Error: {error.message}</p>;

  const DATA_USERS = data?.allUsers?.nodes?.map((user: User) => {
    return {
      checkbox: <CustomCheckbox
        checked={selectedUsers.includes(user.email)}
        onCheckedChange={() => handleItemChange(user.email)}
      />,
      name: user.fullname,
      email: user.email,
      role: (
        <div className={` w-[50px] text-center text-[12px] rounded-[8px] ${getRoleClass(user.roleuser)}`}>
          {user.roleuser}
        </div>
      ),
      status: (
        <div className={` w-[50px] text-center text-[12px] rounded-[8px] ${getActiveClass(user.status)}`}>
          {user.status}
        </div>
      ),
      createdAt: formatDateSimple(user.createAt),
      lastLogin: formatDateSimple(user.lastLogin),
      action: (
        <div className="flex gap-1 px-0 align-center">
          <EditModal dataDialog={selectedUser && <UserProfileDialog handleClose={handleCloseEdit} mode="edit" defaultValues={selectedUser} />} open={openEdit} handleOpen={() => handleOpenEdit(user)} />
          <DeleteUserModal onConfirm={handleCloseDelete} open={openDelete} handleOpen={handleOpenDelete} handleClose={handleCloseDelete} />
        </div>
      ),
    };
  });
  return (
    <main className="p-4 flex flex-col gap-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="inline text-xl font-semibold">Hello User</h1>

        <AddUserModal
          dataDialog={<UserProfileDialog handleClose={handleCloseAdd} mode="add" />}
          open={openAddUser}
          handleOpen={handleOpenAdd}
        />
      </div>
        <Table
          header={HEADER_FIELD}
          data={DATA_USERS}
          checked={selectedUsers.length === DATA_USERS.length}
          handleAllItemSelect={handleSelectAll}
        />
    </main>

  );
}
/**
 * Given a role, return a string containing the class names
 * that will give the appropriate background and text color.
 *
 * @param {string} role The role of the user.
 * @returns {string} A string containing the class names.
 */
function getRoleClass(role: string) {
  switch (role) {
    case "student":
      return "bg-blue-100 text-blue-800";
    case "teacher":
      return "bg-green-100 text-green-800";
    case "admin":
      return "bg-purple-100 text-purple-800";
    default:
      return "bg-gray-100 text-gray-800";
  }
}

/**
 * Given a role, return a string containing the class names
 * that will give the appropriate background and text color
 * for the active status.
 *
 * @param {string} role The status of the user.
 * @returns {string} A string containing the class names.
 */
function getActiveClass(role: string) {
  switch (role) {
    case "active":
      return "bg-green-100 text-green-800";
    default:
      return "bg-gray-100 text-gray-800";
  }
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