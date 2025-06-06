"use client";

import { useContext, useEffect, useLayoutEffect, useRef, useState } from "react";
import { HEADER_FIELD } from "./constants";
import Table from "@/components/table";
import CustomCheckbox from "@/components/checkbox";
import { EditModal } from "@/components/editDialog";
import UserProfileDialog from "@/components/userProfileDialog";
import { User, UserFilter } from "./type";
import AddUserModal from "@/components/addUserModal";
import { useMutation, useQuery } from "@apollo/client";
import { DELETE_SELECTED_USER, GET_USERS } from "./apolo";
import DeleteModal from "@/components/deleteModal";
import DeleteUserDialog from "@/components/deleteUserDialog";
import { useScrollContext } from "@/contexts/ScrollContext";
import Sidebar from "@/components/sidebar";
import { ROLE_SELECT_OPTION, STATUS_SELECT_OPTION } from "@/constants";
import SelectItem from "@/components/selectItem";
import { Pagination } from "@/components/pagination";

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
  //  State to manage the selected delete user
  const [selectedDeleteUser, setSelectedDeleteUser] = useState<User | null>(null);

  const [itemsPerPage, setItemsPerPage] = useState(10);

  const items = Array.from({ length: 24 }, (_, i) => i + 1);

  const [itemOffset, setItemOffset] = useState(0);
  const endOffset = itemOffset + itemsPerPage;
  const currentItems = items.slice(itemOffset, endOffset);
  const pageCount = 15; // Total number of pages, can be calculated based on total items and itemsPerPage
  const currentPage = Math.floor(itemOffset / itemsPerPage);

  const handlePageChange = (selectedPage: number) => {
    const newOffset = selectedPage * itemsPerPage;
    setItemOffset(newOffset);
  };



  const [role, setRole] = useState<string | null>(null);

  const [status, setStatus] = useState<string | null>(null);

  const [previousData, setPreviousData] = useState([]);

  const [deleteUserByUserId] = useMutation(DELETE_SELECTED_USER, {
    refetchQueries: [
      GET_USERS,
      'GetUsers',
    ],
  })

  const filter: UserFilter = {};
  if (role) filter.roleuser = { equalTo: role };
  if (status) filter.status = { equalTo: status };

  const variables = Object.keys(filter).length > 0 ? { filter } : {};
  const { data, loading, error, refetch } = useQuery(GET_USERS, {
    variables,
    fetchPolicy: "cache-and-network", nextFetchPolicy: "cache-first",
  });

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

  const handleOnChangeRole = (value: string) => {
    const selectedRole = value || null;
    if (selectedRole !== role) {
      setRole(selectedRole);
    }
  }

  const handleOnChangeStatus = (value: string) => {
    const selectedStatus = value || null;
    if (selectedStatus !== status) {
      setStatus(selectedStatus);
    }
  }
  /**
   * Opens the delete modal by setting the `openDelete` state to true and logs the state of the modal.
   */
  function handleOpenDelete(user: User) {
    setSelectedDeleteUser(user)
    console.log("Selected user to delete:", user);
    setOpenDelete(true)
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

  
  const handleOnChangeItemsPerPage = (value: number) => {
  setItemsPerPage(value);
  setCurrentPage(0); // reset về trang đầu
  };

  const handleResetFilter = () => {
    setRole(null);
    setStatus(null);
    refetch({});
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

  const handleDeleteUser = async () => {
    console.log("Deleting user:", selectedDeleteUser?.userId);
    if (!selectedDeleteUser?.userId) {
      console.warn("No user ID provided for deletion.");
      return;
    }
    try {
      await deleteUserByUserId({
        variables: {
          input: {
            userId: selectedDeleteUser.userId,
          },
        },
      });
      refetch();
      setOpenDelete(false);
      setSelectedDeleteUser(null);
    } catch (error) {
      console.error("Failed to delete user:", error);
    }
  };
  useEffect(() => {
    if (data?.allUsers?.nodes) {
      setPreviousData(data.allUsers.nodes);
    }
  }, [data]);

  if (error) return <p>Error: {error.message}</p>;
  console.log(data?.allUsers?.nodes);
  console.log("Loading state:", loading);

  const users = data?.allUsers?.nodes?.length
    ? data.allUsers.nodes
    : previousData || [];

  const DATA_USERS = users.map((user: User) => {
    return {
      checkbox: <CustomCheckbox
        checked={selectedUsers.includes(user.email)}
        onCheckedChange={() => handleItemChange(user.email)}
      />,
      user_id: user.userId,
      name: user.fullname,
      email: user.email,
      password: user.password,
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
          <EditModal dataDialog={selectedUser &&
            <UserProfileDialog handleClose={handleCloseEdit}
              mode="edit" defaultValues={selectedUser} onRefetchUser={refetch} />}
            open={openEdit} handleOpen={() => handleOpenEdit(user)} />

          <DeleteModal deleteUserDialog={selectedDeleteUser &&
            <DeleteUserDialog handleClose={handleCloseDelete}
              onConfirm={handleDeleteUser}
              userSelectedToDelete={selectedDeleteUser} />}
            open={openDelete} handleOpen={() => handleOpenDelete(user)} />
        </div>
      ),
    };
  });
  return (
    <>
      <main className="p-4 flex flex-col gap-4">
        <div className="flex flex-col gap-4">
          <h1 className="text-xl font-semibold">Hello User</h1>

          <div className="flex justify-between">
            <div className="flex flex-row gap-2">
              <div className="w-[150px]">
                <SelectItem
                  value={role || ""}
                  selectOption={ROLE_SELECT_OPTION}
                  name="role"
                  onValueChange={handleOnChangeRole}
                />
              </div>
              <div className="w-[150px]">
                <SelectItem
                  value={status || ""}
                  selectOption={STATUS_SELECT_OPTION}
                  name="status"

                  onValueChange={handleOnChangeStatus}
                />
              </div>
              <button className="w-[100px] h-[33px] rounded-md border text-gray-700 border-gray-300 bg-white px-3 text-sm shadow-sm hover:border-gray-400 focus:outline-none  focus:border-gray-70 self-end"
                onClick={handleResetFilter}>Reset</button>
            </div>
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
          <div>
            <div className="space-y-4">
              <Pagination
                pageCount={pageCount}
                onPageChange={handlePageChange}
                currentPage={currentPage}
              />
              <SelectItem
                value={String(itemsPerPage)}
                selectOption={ITEMS_PER_PAGE_SELECT_OPTION}
                name="itemsPerPage"
                onValueChange={handleOnChangeItemsPerPage}
              />

            </div>
          </div>
        </div>
      </main>
    </>
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

